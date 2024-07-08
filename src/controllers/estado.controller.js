const { httpError, httpSend } = require("#H/httpResponses");
const Estado = require("#M/estado.model");

exports.list = async (req, res) => {
  try {
    const data = await Estado.findAll({});
    httpSend(res, data);
  } catch (error) {
    httpError(res, `Error al traer la lista de estados ${error?.message}`, 403);
  }
};
