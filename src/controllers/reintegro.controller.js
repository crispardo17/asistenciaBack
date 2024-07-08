const sequelize = require("#DB/sequelize");
const { httpError, httpSend } = require("#H/httpResponses");
const { strCodesEstados } = require("#H/utils");
const Estado = require("#M/estado.model");
const Personal = require("#M/personal.model");
const Reintegro = require("#M/reintegro.model");

exports.list = async (req, res) => {
  try {
    const data = await Reintegro.findAll({});
    httpSend(res, data);
  } catch (error) {
    httpError(
      res,
      `Error al traer la lista de reitegros ${error?.message}`,
      403
    );
  }
};

/**
 * La función create_reintegro es una función asíncrona que crea un nuevo registro de reintegro en la base de datos.
 * Inicia una transacción, recupera los datos necesarios del cuerpo de la solicitud y otros modelos, crea un nuevo registro de reintegro, actualiza el registro personal correspondiente, confirma la transacción y envía una respuesta de éxito.
 * Si ocurre algún error, revierte la transacción y envía una respuesta de error.
 * @param {*} req
 * @param {*} res
 */
exports.create_reintegro = async (req, res) => {
  const t = await sequelize.transaction();
  const { _sub: idUsuarioToken } = req.userToken.tokenDecodeduser;
  try {
    const { id_personal, id_motivo, observacion } = req.body;

    /**
     * traer el estado reintegro
     */
    const estadoReintegro = await Estado.findOne({
      where: {
        strCode: strCodesEstados.REINTEGRADO,
      },
      attributes: ["idEstado"],
      transaction: t,
    });
    const crearReintegro = await Reintegro.create(
      {
        id_personal,
        id_motivo,
        observacion,
        id_estadoReintegro: estadoReintegro.idEstado,
        id_usuarioReintegra: idUsuarioToken,
      },
      {
        transaction: t,
      }
    );

    if (!crearReintegro)
      throw new Error("No se ha podido realizar el reintegro.");

    const updatePersonal = await Personal.update(
      { activo: true },
      {
        transaction: t,
        where: {
          idPersonal: id_personal,
        },
      }
    );

    if (!updatePersonal) throw new Error("No se pudo activar el personal");
    await t.commit();
    httpSend(res, crearReintegro.toJSON(), "Reintegro creado exitosamente");
  } catch (error) {
    await t.rollback();
    httpError(res, error.message, 500);
  }
};
