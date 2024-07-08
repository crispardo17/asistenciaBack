const { httpError, httpSend } = require("#H/httpResponses");
const TipoEstado = require("#M/tipoEstado.model");

exports.list = async (req, res) => {
  try {
    const data = await TipoEstado.findAll({});
    httpSend(res, data);
  } catch (error) {
    httpError(
      res,
      `Error al traer la lista de tipo estado ${error?.message}`,
      403
    );
  }
};
