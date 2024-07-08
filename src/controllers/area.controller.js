const { httpError, httpSend } = require("#H/httpResponses");
// const sequelize = require("#DB/sequelize");
const Area = require("#M/area.model");
const CentroCosto = require("#M/centroCosto.model");
const Departamento = require("#M/departamento.model");
const Empresa = require("#M/empresa.model");
const LiderProceso = require("#M/liderProceso.model");
const Usuario = require("#M/usuario.model");

exports.list = async (req, res) => {
  try {
    const data = await Area.findAll({});
    httpSend(res, data);
  } catch (error) {
    httpError(res, `Error al traer la lista de areas ${error?.message}`, 403);
  }
};

/**
 * Este código exporta una función denominada list_asignacion que recupera una lista de áreas en función de los parámetros de consulta proporcionados.
 * La función incluye varios modelos y sus asociaciones para obtener datos adicionales.
 * Si se proporciona un id_departamento en la consulta, agrega una cláusula where para filtrar las áreas por el departamento especificado. A continuación, la función envía los datos recuperados como respuesta mediante la función httpSend.
 * Si se produce un error, envía una respuesta de error HTTP con el mensaje de error correspondiente
 * @param {*} req
 * @param {*} res
 */
exports.list_asignacion = async (req, res) => {
  const { id_departamento } = req.query;
  try {
    const data = await Area.findAll({
      ...(id_departamento !== "-1" && {
        where: { id_departamento: id_departamento },
      }),
      include: [
        {
          model: Departamento,
        },
        {
          model: CentroCosto,
          include: [{ model: Empresa }],
        },
        {
          required: false,
          model: LiderProceso,
          where: { activo: true },
          include: [
            {
              model: Usuario,
              attributes: { exclude: ["contrasenna", "token"] },
            },
          ],
        },
      ],
      order: [
        ["idArea", "DESC"],
        [LiderProceso, "createdAt", "DESC"],
      ],
    });
    httpSend(res, data);
  } catch (error) {
    httpError(res, `Error al traer la lista de areas ${error?.message}`, 403);
  }
};
