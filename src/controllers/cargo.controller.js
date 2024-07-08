const { httpError, httpSend } = require("#H/httpResponses");
const Cargo = require("#M/cargo.model");

exports.list = async (req, res) => {
  try {
    const data = await Cargo.findAll({});
    httpSend(res, data);
  } catch (error) {
    httpError(res, `Error al traer la lista de cargos ${error?.message}`, 403);
  }
};
