const sequelize = require("#DB/sequelize");
const { getCurrentStringDate, getCurrentDate } = require("#H/functions");
const { httpError, httpSend } = require("#H/httpResponses");
const CheckNomina = require("#M/checkNomina.model");

exports.list = async (req, res) => {
  try {
    const data = await CheckNomina.findAll({});
    httpSend(res, data);
  } catch (error) {
    httpError(
      res,
      `Error al traer la lista de checknomina ${error?.message}`,
      403
    );
  }
};

/**
 * Este código exporta una función denominada create_check_nomina que se usa para crear nuevos registros en la tabla CheckNomina.
 * Recibe un objeto de solicitud (req) y un objeto de respuesta (res) como entradas.
 * La función inicia una transacción de base de datos mediante Sequelize y recupera el identificador de usuario del objeto de solicitud.
 * A continuación, recorre en iteración una matriz de datos recibidos en el cuerpo de la solicitud y crea un nuevo registro en la tabla CheckNomina para cada elemento de la matriz.
 * Una vez creados todos los registros, la transacción se comunica
 * @param {*} req
 * @param {*} res
 */
exports.create_check_nomina = async (req, res) => {
  const t = await sequelize.transaction();
  const { _sub: idUsuarioToken } = req.userToken.tokenDecodeduser;
  try {
    //se va a obtener un array de datos los cuales hay que iterar e ir guardando en checknomina
    const { dataArray } = req.body;
    const cantidad = dataArray.length;

    for (let i = 0; i < cantidad; i++) {
      await CheckNomina.create(
        {
          id_reporteNovedad: dataArray[i],
          fechaReporte: getCurrentDate(),
          id_usuarioCheck: idUsuarioToken,
        },
        {
          transaction: t,
        }
      );
    }
    await t.commit();
    httpSend(
      res,
      undefined,
      `${cantidad}` > 1
        ? "Registros insertados"
        : "Registro Insertado" + "en checkNomina satisfactoriamente"
    );
  } catch (error) {
    await t.rollback();
    httpError(res, error.message, 500);
  }
};
