const { httpError, httpSend } = require("#H/httpResponses");
const CentroCosto = require("#M/centroCosto.model");

exports.list = async (req, res) => {
  try {
    const data = await CentroCosto.findAll({});
    httpSend(res, data);
  } catch (error) {
    httpError(
      res,
      `Error al traer la lista de centro costos ${error?.message}`,
      403
    );
  }
};
