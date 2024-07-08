const { httpError, httpSend } = require("#H/httpResponses");
const sequelize = require("#DB/sequelize");
const LiderProceso = require("#M/liderProceso.model");
const { messages, generarStringAleatorio } = require("#H/utils");
const Usuario = require("#M/usuario.model");
const Personal = require("#M/personal.model");
const PerfilUsuario = require("#M/perfilUsuario.model");
const Perfil = require("#M/perfil.model");
const { strCodesPerfil } = require("#H/vars");
const { hashValue, getFirstCaracteres, IsEqualValue } = require("#H/functions");
const { inactivarPrevLideres } = require("#H/customQueries");

/**
 * Este código exporta una función denominada list_lideresProceso que recupera una lista de líderes de un proceso de la base de datos.
 * Incluye el modelo Usuario asociado y excluye ciertos atributos del modelo Usuario.
 * Si se realiza correctamente, envía los datos recuperados como respuesta. Si hay un error, envía una respuesta de error HTTP con el mensaje correspondiente.
 * @param {*} req
 * @param {*} res
 */
exports.list_lideresProceso = async (req, res) => {
  try {
    const data = await LiderProceso.findAll({
      include: [
        {
          model: Usuario,
          attributes: { exclude: ["contrasenna", "token"] },
        },
      ],
    });
    httpSend(res, data);
  } catch (error) {
    httpError(
      res,
      `Error al traer la lista de lideres de proceso ${error?.message}`,
      403
    );
  }
};

exports.create_liderProceso = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id_usuario, id_area, id_empresa, activo } = req.body;

    const createLiderProceso = await LiderProceso.create(
      {
        id_usuario,
        id_area,
        id_empresa,
        activo,
      },
      { transaction: t }
    );
    if (!createLiderProceso) {
      throw new Error("No se pudo crear el lider de proceso");
    }
    const data = await LiderProceso.findOne({
      where: { idLiderProceso: createLiderProceso.idLiderProceso },
      transaction: t,
      raw: true,
    });
    await t.commit();
    httpSend(res, data);
  } catch (error) {
    await t.rollback();
    httpError(res, `Error creacion liderProceso ${error?.message}`, 403);
  }
};

exports.update_liderProceso = async (req, res) => {
  try {
    const { idLiderProceso } = req.params;

    const { id_usuario, id_area, id_empresa, activo } = req.body;

    const updatedLiderProceso = await LiderProceso.update(
      {
        id_usuario,
        id_area,
        id_empresa,
        activo,
      },
      { where: { idLiderProceso } }
    );

    httpSend(
      res,
      updatedLiderProceso,
      `${messages.DATA_EDITADO("liderProceso")}`
    );
  } catch (error) {
    httpError(
      res,
      `Error al actualizar el lider de proceso ${error?.message}`,
      403
    );
  }
};

/**
 * Este código es una implementación de la función asignar_personal_responsable, que se encarga de asignar a una persona como líder responsable en un proceso.
 * La función comprueba primero si la persona ya tiene una cuenta de usuario.
 * De lo contrario, crea una nueva cuenta de usuario y asigna a la persona como líder responsable.
 * Si la persona ya tiene una cuenta de usuario, comprueba si tiene el rol de líder responsable.
 * Si no es así, asigna el rol al usuario. Finalmente, la función actualiza la información personal de la persona asignada y confirma la transacción.
 * @param {*} req
 * @param {*} res
 */

exports.asignar_personal_responsable = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { idPersonal } = req.params;
    // const { idUsuario } = req.userToken; //usuario gestion
    const { id_area, id_empresa, correo } = req.body;

    const buscarPersonal = await Personal.findByPk(idPersonal, {
      raw: true,
      attributes: ["nombre", "apellido", "numDocumento", "idPersonal"],
      transaction: t,
    });

    const existUsuario = await Usuario.findOne({
      where: {
        numDocumento: buscarPersonal.numDocumento,
        id_personalBase: buscarPersonal.idPersonal,
      },
      transaction: t,
    });

    //obtenemos el id_perfil responsable
    const buscarPerfilResponsable = await Perfil.findOne({
      where: { strCode: strCodesPerfil.RESPONSABLE },
      attributes: ["idPerfil"],
      transaction: t,
    });

    //revisar si puede que haya un caso en que inhabiliten la relacion de perfil usuario
    if (existUsuario) {
      const id_usuario = existUsuario.idUsuario;

      //buscar si el usuario ya tiene una relacion en perfilUsuario
      const buscarPerfilUsuario = await PerfilUsuario.findOne({
        attributes: ["idPerfilUsuario"],
        where: {
          id_perfil: buscarPerfilResponsable.idPerfil,
          id_usuario: id_usuario,
        },
        transaction: t,
      });

      if (!buscarPerfilUsuario) {
        await PerfilUsuario.create(
          {
            id_perfil: buscarPerfilResponsable.idPerfil,
            id_usuario: id_usuario,
            activo: true,
          },
          { transaction: t }
        );
      }

      /* una vez nos aseguramos que el usuario tiene el perfil de tipo responsable
      insertamos en liderProceso la relacion del usuario con la empresa y area seleccionada */

      await inactivarPrevLideres(id_area, id_empresa, t);
      //buscamos que no haya un registro existente con estas caracteristicas
      const buscarLiderProceso = await LiderProceso.findOne({
        where: { id_usuario, id_area, id_empresa },
        transaction: t,
      });

      if (!buscarLiderProceso) {
        //actualizamos el nuevo correo y por ultimo asignamos la empresa y area
        const createLiderProceso = await LiderProceso.create(
          {
            id_usuario: id_usuario,
            id_area: id_area,
            id_empresa: id_empresa,
            activo: true,
          },
          { transaction: t }
        );
        if (!createLiderProceso) {
          throw new Error("No se pudo crear el lider de proceso");
        }
      }

      // si el registro en liderProceso esta inactivo lo activamos
      if (buscarLiderProceso?.activo === false) {
        buscarLiderProceso.activo = true;
        await buscarLiderProceso.save({ transaction: t });
      }
      //por ultimo creamos una contraseña temporal y la enviamos al correo electronico en caso que el usuario este inactivo
      if (!existUsuario.activo) {
        const contrasenna = hashValue(generarStringAleatorio());
        existUsuario.contraseña = contrasenna;
        existUsuario.cambiarContrasenna = true;
        existUsuario.activo = true;
      }
      /** si el correo es diferente se actualiza */
      if (!IsEqualValue(existUsuario.correo, correo))
        existUsuario.correo = correo;

      await existUsuario.save({ transaction: t });

      //enviamos el correo con la contraseña temportal
    } else {
      //si no existe el usuario lo creamos
      // extraer el usuario desde el nombre, apellido y documento
      const usuario = `${getFirstCaracteres(buscarPersonal.nombre)}_${getFirstCaracteres(buscarPersonal.apellido)}.${buscarPersonal.numDocumento}`;
      // generar contraseña temporal
      const contrasenna = hashValue(generarStringAleatorio());

      const createUsuario = await Usuario.create(
        {
          numDocumento: buscarPersonal.numDocumento,
          usuario: usuario,
          contrasenna: contrasenna,
          nombre: buscarPersonal.nombre,
          apellido: buscarPersonal.apellido,
          correo: correo,
          activo: true,
          cambiarContrasenna: true,
          id_personalBase: buscarPersonal.idPersonal,
        },
        { transaction: t }
      );

      const createPerfilUsuario = await PerfilUsuario.create(
        {
          id_perfil: buscarPerfilResponsable.idPerfil,
          id_usuario: createUsuario.idUsuario,
          activo: true,
        },
        { transaction: t }
      );
      if (!createPerfilUsuario)
        throw new Error(
          "No se pudo crear el perfilUsuario para el lider de proceso"
        );

      await inactivarPrevLideres(id_area, id_empresa, t);

      // crear nuevo registro de lider proceso
      const createLiderProceso = await LiderProceso.create(
        {
          id_usuario: createUsuario.idUsuario,
          id_area: id_area,
          id_empresa: id_empresa,
          activo: true,
        },
        { transaction: t }
      );
      if (!createLiderProceso) {
        throw new Error("No se pudo crear el lider de proceso");
      }

      //enviar el correo con la contraseña temporal
    }

    const updatedPersonal = await Personal.update(
      { liderProceso: true },
      { where: { idPersonal }, transaction: t }
    );
    if (!updatedPersonal) throw new Error("No se pudo actualizar el personal");

    await t.commit();

    httpSend(
      res,
      buscarPersonal,
      `${messages.CREATE_SUCCESS("liderProceso")} y ${messages.CREATE_SUCCESS("usuario")}`
    );
  } catch (error) {
    console.error(error);
    await t.rollback();
    httpError(
      res,
      `Error al asignar el lider de proceso ${error?.message}`,
      403
    );
  }
};
