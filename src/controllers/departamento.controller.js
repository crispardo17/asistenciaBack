const { httpError, httpSend } = require("#H/httpResponses");
// const sequelize = require("#DB/sequelize");
const Departamento = require("#M/departamento.model");

exports.list = async (req, res) => {
  try {
    const data = await Departamento.findAll({});
    httpSend(res, data);
  } catch (error) {
    httpError(
      res,
      `Error al traer la lista de departamentos ${error?.message}`,
      403
    );
  }
};
