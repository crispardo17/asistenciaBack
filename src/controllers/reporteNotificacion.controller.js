const sequelize = require("#DB/sequelize");
const { workNotificacionesAsistencia } = require("#H/customQueries");
const { getNotificacionesByTipo } = require("#H/functions");
const { httpError, httpSend } = require("#H/httpResponses");
const ReporteNotificacion = require("#M/reporteNotificacion.model");

exports.prueba = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const data = await workNotificacionesAsistencia(t);
    data && (await t.commit());
    httpSend(res, data);
  } catch (error) {
    await t.rollback();
    httpError(
      res,
      `Error al traer la lista de reitegros ${error?.message}`,
      403
    );
  }
};

exports.list = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { tipo } = req.params;
    const { _sub: idUsuarioRequest } = req.userToken.tokenDecodeduser;
    const data = await getNotificacionesByTipo(tipo, idUsuarioRequest, t);
    httpSend(res, data);
  } catch (error) {
    httpError(
      res,
      `Error al traer la lista de reitegros ${error?.message}`,
      403
    );
  }
};

exports.show_reporteNotificacion = async (req, res) => {
  //   const { _sub: idUsuarioToken } = req.userToken.tokenDecodeduser;
  try {
    httpSend(res, {}, "Reintegro creado exitosamente");
  } catch (error) {
    httpError(res, error.message, 500);
  }
};

exports.patch_leido_reporteNotificacion = async (req, res) => {
  try {
    const { idReporteNotificacion } = req.params;
    // eslint-disable-next-line no-unused-vars
    const [_, affectedRows] = await ReporteNotificacion.update(
      {
        leido: true,
      },
      { where: { idReporteNotificacion, leido: false } }
    );
    httpSend(
      res,
      affectedRows.map((el) => el.toJSON())
    );
  } catch (error) {
    httpError(res, error.message, 500);
  }
};
