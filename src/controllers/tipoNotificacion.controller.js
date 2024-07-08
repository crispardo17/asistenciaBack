const { httpError, httpSend } = require("#H/httpResponses");
const TipoNotificacion = require("#M/tipoNotificacion.model");

exports.list = async (req, res) => {
  try {
    const data = await TipoNotificacion.findAll({});
    httpSend(res, data);
  } catch (error) {
    httpError(
      res,
      `Error al traer la lista de tipo notificacion ${error?.message}`,
      403
    );
  }
};
