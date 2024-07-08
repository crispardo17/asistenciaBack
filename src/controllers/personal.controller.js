const { httpError, httpSend } = require("#H/httpResponses");
const Area = require("#M/area.model");
const Cargo = require("#M/cargo.model");
const Departamento = require("#M/departamento.model");
const Empresa = require("#M/empresa.model");
// const sequelize = require("#DB/sequelize");
const Personal = require("#M/personal.model");
const Usuario = require("#M/usuario.model");

exports.list = async (req, res) => {
  try {
    const { modulo } = req.params;
    const { numDocumento } = req.query;
    const data = await Personal.findAll({
      ...(modulo === "user-create" && {
        where: { numDocumento },
      }),
      include: [{ model: Area }, { model: Empresa }],
    });
    httpSend(
      res,
      data.map((personal) => personal.toJSON()),
      "success"
    );
  } catch (error) {
    httpError(
      res,
      `Error al traer la lista del personal ${error?.message}`,
      403
    );
  }
};

exports.list_personal_supervisor = async (req, res) => {
  try {
    const data = await Personal.findAll({ where: { liderProceso: true } });
    httpSend(res, data);
  } catch (error) {
    httpError(
      res,
      `Error al traer la lista de personal tipo supervisor ${error?.message}`,
      403
    );
  }
};

/**
 * Esta función recupera una lista de empleados según el departamento especificado en los parámetros de solicitud.
 * También incluye información adicional como el área, departamento, empresa y puesto de trabajo de cada empleado.
 * Luego, la función recupera una lista de usuarios y asigna sus direcciones de correo electrónico a los empleados correspondientes.
 * Finalmente envía la respuesta con la lista de empleados incluyendo sus direcciones de correo electrónico.
 * @param {*} req
 * @param {*} res
 */
exports.list_personal_departamento = async (req, res) => {
  const { byDepartamento } = req.params;
  try {
    const personals = await Personal.findAll({
      include: [
        {
          model: Area,
          include: [{ model: Departamento }],
        },
        {
          model: Empresa,
        },
        {
          model: Cargo,
        },
      ],
      where: { "$area.id_departamento$": byDepartamento },
    });

    const usuarios = await Usuario.findAll({
      attributes: ["numDocumento", "correo"],
    });

    // Crear un mapa de usuarios por número de documento
    const usuariosPorDocumento = usuarios.reduce((acc, usuario) => {
      acc[usuario.numDocumento] = usuario;
      return acc;
    }, {});

    // Asignar el correo correspondiente a cada empleado
    const empleadosConCorreo = personals.map((pesonal) => {
      const usuario = usuariosPorDocumento[pesonal.numDocumento];
      return {
        ...pesonal.toJSON(),
        correo: usuario ? usuario.correo : null,
      };
    });

    // Ordenar los empleados por correo electrónico
    empleadosConCorreo.sort((a, b) => {
      if (!a.correo && !b.correo) return 0;
      if (!a.correo) return 1;
      if (!b.correo) return -1;
      return a.correo.localeCompare(b.correo);
    });

    // Enviar la respuesta
    httpSend(res, empleadosConCorreo);
  } catch (error) {
    httpError(
      res,
      `Error al traer la lista de personal por departamento ${error?.message}`,
      403
    );
  }
};
