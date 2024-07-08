const { httpError, httpSend } = require("#H/httpResponses");
const TipoNovedad = require("#M/tipoNovedad.model");

exports.list = async (req, res) => {
  try {
    const data = await TipoNovedad.findAll();
    httpSend(res, data);
  } catch (error) {
    httpError(
      res,
      `Error al traer la lista de tipo novedad ${error?.message}`,
      403
    );
  }
};
