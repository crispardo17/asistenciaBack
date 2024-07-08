const { httpError, httpSend } = require("#H/httpResponses");
const Empresa = require("#M/empresa.model");

exports.list = async (req, res) => {
  try {
    const data = await Empresa.findAll({});
    httpSend(res, data);
  } catch (error) {
    httpError(
      res,
      `Error al traer la lista de empresas ${error?.message}`,
      403
    );
  }
};
