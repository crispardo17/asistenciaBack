const { httpError, httpSend } = require("#H/httpResponses");
const sequelize = require("#DB/sequelize");
const ReporteNovedad = require("#M/reporteNovedad.model");
const {
  getNovedadesByTipo,
  getCurrentStringDate,
  isFeriado,
  esDia,
  getNumCurrentDay,
  IsEqualValue,
} = require("#H/functions");
const {
  strCodesEstados,
  messages,
  strCodesTiposNovedades,
} = require("#H/utils");
const Estado = require("#M/estado.model");
const Asistencia = require("#M/asistencia.model");
const TipoNovedad = require("#M/tipoNovedad.model");
const { PARAMS_TIPO_GESTIONAR_NOVEDAD_ENPOINT, lays } = require("#H/vars");
const Usuario = require("#M/usuario.model");
const Personal = require("#M/personal.model");
const NovedadReversada = require("#M/novedadReversada.model");
const {
  updateLastAsistenciaResponsable,
  inactivarReporteAsistenciaByUsuarioid,
} = require("#H/customQueries");

/**
 * Este código exporta una función llamada create_novedad que se utiliza para crear una nueva "novedad" en un sistema.
 * Toma varias entradas relacionadas con los datos de "asistencia" y "novedad", y realiza varias operaciones, como verificar el tipo de novedad, crear un registro de asistencia, actualizar el estado de una persona y crear un nuevo registro de novedad.
 *  La función utiliza una transacción para garantizar la coherencia de los datos y controla los errores que se producen durante el proceso.
 * @param {*} req
 * @param {*} res
 */
exports.create_novedad = async (req, res) => {
  const t = await sequelize.transaction();
  const t_updateReports = await sequelize.transaction();
  const { _sub: idUsuarioToken, lay: frontLayout } =
    req.userToken.tokenDecodeduser;
  let novedadEspecial = false;
  try {
    const {
      // asistencia data,
      id_personal,
      fechaAsistencia,
      numDiaAsis,
      observacionReporte,
      // novedad data
      id_tipoNovedad,
      observacionNovedad,
      fechaInicioNovedad,
      fechaFinNovedad,
      adjuntoNovedad,
    } = req.body;

    const getTipoNovedad = await TipoNovedad.findOne({
      where: { idTipoNovedad: id_tipoNovedad },
      raw: true,
    });
    const asistio =
      getTipoNovedad?.strCode === strCodesTiposNovedades.CAPACi_SIN_CONTR ||
      getTipoNovedad?.strCode === strCodesTiposNovedades.DIA_LABORADO ||
      !getTipoNovedad?.strCode === strCodesTiposNovedades.DIA_DESCANSO;

    if (
      getTipoNovedad?.strCode === strCodesTiposNovedades.DIA_DESCANSO &&
      (isFeriado(fechaInicioNovedad) || esDia(["domingo"], fechaInicioNovedad))
    )
      throw new Error("es dia feriado");

    /**obtencion del estado segun asistencia y dia de reporte */
    let codeEstado = null;
    const isSameDayAsistReport = numDiaAsis === getNumCurrentDay();
    if (asistio) {
      codeEstado = isSameDayAsistReport
        ? strCodesEstados.ASIST_Y_REP_DIA
        : strCodesEstados.ASIST_Y_REP_OTRO_DIA;
    } else {
      codeEstado = isSameDayAsistReport
        ? strCodesEstados.NO_ASIST_Y_REP_DIA
        : strCodesEstados.NO_ASIST_Y_REP_OTRO__DIA;
    }

    const estadoAsistencia = await Estado.findOne({
      where: { strCode: codeEstado },
      raw: true,
      attributes: ["idEstado"],
      transaction: t,
    });

    const asistencia = await Asistencia.create(
      {
        asistio,
        activo: true,
        numDiaAsis,
        fechaAsistencia,
        fechaReporte: getCurrentStringDate(),
        observacionReporte: observacionReporte || null,
        id_personal,
        id_usuarioReporto: idUsuarioToken,
        id_estadoAsistencia: estadoAsistencia?.idEstado,
      },
      { transaction: t }
    );

    /**
     * si la novedad es terminacion de contrato desactivamos al personal y
     * su respectivo usuario
     * */
    if (getTipoNovedad.strCode === strCodesTiposNovedades.TERM_CONTR) {
      const personalAntesDeActualizar = await Personal.findOne({
        where: { idPersonal: id_personal },
        transaction: t,
      });

      if (!personalAntesDeActualizar) {
        throw new Error("No se encontró el personal con el ID especificado");
      }

      const inactivarPersonal = await Personal.update(
        { activo: false },
        {
          where: { idPersonal: id_personal },
          transaction: t,
        }
      );

      if (!inactivarPersonal[0])
        throw new Error("No se pudo inactivar el personal");

      const buscarUsuario = await Usuario.findOne({
        where: {
          numDocumento: personalAntesDeActualizar.numDocumento,
        },
        transaction: t,
      });

      if (buscarUsuario)
        await Usuario.update(
          { activo: false },
          {
            where: {
              idUsuario: buscarUsuario.idUsuario,
            },
            transaction: t,
          }
        );
    }

    /**REGISTRAR NOVEDAD */
    //si la novedad es especial la ponemos con estado a espera de aval
    novedadEspecial =
      getTipoNovedad.strCode === strCodesTiposNovedades.SUSPENSION ||
      getTipoNovedad.strCode === strCodesTiposNovedades.DIAS_DE_VACA;

    const estado = await Estado.findOne({
      where: {
        strCode: novedadEspecial
          ? strCodesEstados.ESPERA_AVAL
          : strCodesEstados.ACTIVA,
      },
      attributes: ["idEstado"],
      raw: true,
    });

    const createNovedad = await ReporteNovedad.create(
      {
        id_asistencia: asistencia.idAsistencia,
        id_tipoNovedad,
        observacionNovedad,
        fechaInicioNovedad,
        fechaReporte: getCurrentStringDate(),
        id_estadoNovedad: estado.idEstado,
        fechaFinNovedad,
        adjuntoNovedad,
        id_usuarioReporto: idUsuarioToken,
      },
      { transaction: t }
    );

    await t.commit();
    httpSend(res, createNovedad.toJSON(), "Novedad creada exitosamente");
  } catch (error) {
    await t.rollback();
    httpError(res, error.message, 500);
  } finally {
    /** se actualiza la fecha de toma de asistenia si la peticion proviene de responsable */
    if (frontLayout === lays.RESPONSABLE_PROCESO) {
      await updateLastAsistenciaResponsable(
        {
          idUsuarioResponsable: idUsuarioToken,
          fecha: getCurrentStringDate(),
        },
        t_updateReports
      );
      /** inactivar reporte asistencia de usuario responsable */
      await inactivarReporteAsistenciaByUsuarioid(idUsuarioToken);
    }
  }
};

exports.update_novedad = async (req, res) => {
  const t = await sequelize.transaction();
  let novedadEspecial = false;
  try {
    const { idReporteNovedad } = req.params;
    const {
      id_tipoNovedad,
      observacionNovedad,
      fechaInicioNovedad,
      fechaFinNovedad,
      adjuntoNovedad,
    } = req.body;
    const reporteNovedad = await ReporteNovedad.findByPk(idReporteNovedad, {
      include: [{ model: Asistencia, attributes: ["idAsistencia", "asistio"] }],
    });

    // verificacion columna asistio asistencia relacionada a la novedad segin tipo de novedad
    let estadoNovedadChange = null;
    if (!IsEqualValue(reporteNovedad.id_tipoNovedad, id_tipoNovedad)) {
      const tipoNovedad = await TipoNovedad.findOne({
        transaction: t,
        where: { idTipoNovedad: id_tipoNovedad },
        raw: true,
      });

      //si la novedad es especial, se cambia a estado a espera de aval
      novedadEspecial =
        tipoNovedad.strCode === strCodesTiposNovedades.SUSPENSION ||
        tipoNovedad.strCode === strCodesTiposNovedades.DIAS_DE_VACA;
      if (novedadEspecial) {
        const estado = await Estado.findOne({
          where: { strCode: strCodesEstados.ESPERA_AVAL },
          attributes: ["idEstado"],
          raw: true,
        });
        estadoNovedadChange = estado?.idEstado;
      }

      if (
        tipoNovedad?.strCode === strCodesTiposNovedades.DIA_DESCANSO &&
        (isFeriado(fechaInicioNovedad) ||
          esDia(["domingo"], fechaInicioNovedad))
      )
        throw new Error("Es dia feriado en fecha de inicio de la novedad");

      // cambiar columna asistio en asistencia de reporte en caso que aplique
      const asistio =
        tipoNovedad?.strCode === strCodesTiposNovedades.CAPACi_SIN_CONTR ||
        tipoNovedad?.strCode === strCodesTiposNovedades.DIA_LABORADO ||
        !tipoNovedad?.strCode === strCodesTiposNovedades.DIA_DESCANSO;
      if (
        reporteNovedad.dataValues?.asistencium?.dataValues?.asistio !== asistio
      )
        await Asistencia.update(
          { asistio },
          {
            where: {
              idAsistencia:
                reporteNovedad.dataValues?.asistencium?.dataValues
                  ?.idAsistencia,
            },
            transaction: t,
          }
        );
    }

    // actualizacion novedad
    if (!IsEqualValue(reporteNovedad.observacionNovedad, observacionNovedad))
      reporteNovedad.observacionNovedad = observacionNovedad;
    if (!IsEqualValue(reporteNovedad.fechaInicioNovedad, fechaInicioNovedad))
      reporteNovedad.fechaInicioNovedad = fechaInicioNovedad;
    if (!IsEqualValue(reporteNovedad.fechaFinNovedad, fechaFinNovedad))
      reporteNovedad.fechaFinNovedad = fechaFinNovedad;
    if (!IsEqualValue(reporteNovedad.adjuntoNovedad, adjuntoNovedad))
      reporteNovedad.adjuntoNovedad = adjuntoNovedad;
    if (!IsEqualValue(reporteNovedad.id_tipoNovedad, id_tipoNovedad))
      reporteNovedad.id_tipoNovedad = id_tipoNovedad;
    if (
      estadoNovedadChange &&
      !IsEqualValue(reporteNovedad.id_estadoNoveda, estadoNovedadChange)
    )
      reporteNovedad.id_estadoNoveda = estadoNovedadChange;
    await reporteNovedad.save({ transaction: t });

    // corfirmacion cambios
    await t.commit();
    httpSend(
      res,
      reporteNovedad.toJSON(),
      messages.DATA_EDITADO("Novedad", true)
    );
  } catch (error) {
    await t.rollback();
    httpError(res, error.message, 500);
  }
};

/**
 * Este código exporta una función llamada list_novedades que maneja una solicitud para recuperar una lista de novedades basada en un tipo determinado.
 * Utiliza la función getNovedadesByTipo para recuperar los datos y luego envía la respuesta mediante la función httpSend.
 * Si ocurre un error, envía una respuesta de error HTTP utilizando la función httpError.
 * @param {*} req
 * @param {*} res
 */
exports.list_novedades = async (req, res) => {
  try {
    const {
      params: { tipo },
      query,
      userToken,
    } = req;

    const data = await getNovedadesByTipo(
      tipo,
      query,
      userToken.tokenDecodeduser
    );

    httpSend(res, data);
  } catch (error) {
    httpError(res, error.message, 500);
  }
};

/**
 * Este código exporta una función llamada gestionar_novedad que es una función asincrónica que maneja la gestión de una novedad en función de los parámetros proporcionados.
 * Realiza diferentes acciones en función del valor del parámetro tipo, como actualizar el estado de una novedad, crear una novedad reversada o aprobar una novedad.
 * Utiliza transacciones Sequelize para garantizar la coherencia de los datos y maneja los errores deshaciendo la transacción y enviando una respuesta de error HTTP.
 * @param {*} req
 * @param {*} res
 */
exports.gestionar_novedad = async (req, res) => {
  const t = await sequelize.transaction();
  const { _sub: idUsuarioToken } = req.userToken.tokenDecodeduser;
  try {
    const { tipo } = req.params;
    const { idReporteNovedad } = req.query;
    const {
      id_motivo,
      observacion,
      respuestaNovedad,
      aprobado: aprobacion,
    } = req.body;

    let message = "";
    if (tipo === PARAMS_TIPO_GESTIONAR_NOVEDAD_ENPOINT.CIERRE) {
      if (!observacion) throw new Error("No se proporcionó la observacion");

      const estadoInactiva = await Estado.findOne({
        where: {
          strCode: strCodesEstados.INACTIVA,
        },
        transaction: t,
      });
      await ReporteNovedad.update(
        {
          id_estadoNovedad: estadoInactiva.idEstado,
          observacionCierre: observacion,
          id_usuarioCerro: idUsuarioToken,
        },
        { where: { idReporteNovedad: idReporteNovedad }, transaction: t }
      );
      message = "Novedad cerrada correctamente";
    } else if (tipo === PARAMS_TIPO_GESTIONAR_NOVEDAD_ENPOINT.REVERSAR) {
      if (!observacion) {
        throw new Error("No se proporcionó la observacion");
      }
      //crear el registro en novedad reversada
      await NovedadReversada.create(
        {
          id_reporteNovedad: idReporteNovedad,
          id_motivo,
          observacion,
          id_usuarioReversa: idUsuarioToken,
        },
        { transaction: t }
      );

      const estadoReversada = await Estado.findOne({
        where: {
          strCode: strCodesEstados.REVERSADA,
        },
        transaction: t,
      });
      if (!id_motivo) throw new Error("se debe enviar el motivo de la novedad");
      await ReporteNovedad.update(
        {
          id_estadoNovedad: estadoReversada.idEstado,
          observacionNovedad: observacion,
          id_usuarioReverso: idUsuarioToken,
        },
        { where: { idReporteNovedad: idReporteNovedad }, transaction: t }
      );
      message = "Novedad reversada correctamente";
    } else if (tipo === PARAMS_TIPO_GESTIONAR_NOVEDAD_ENPOINT.APROBACION) {
      if (!aprobacion || !respuestaNovedad)
        throw new Error(
          `se debe enviar el campo ${!aprobacion ? "aprobado" : "respuesta"}`
        );
      const aprobado = aprobacion === "true";
      await ReporteNovedad.update(
        {
          respuestaNovedad: respuestaNovedad,
          aprobado,
          id_usuarioAprobo: idUsuarioToken,
        },
        { where: { idReporteNovedad: idReporteNovedad }, transaction: t }
      );
      message = `Aprobación de novedad exitosa. ${!aprobado ? "(NO aprobada)" : "(aprobada)"}`;
    } else {
      throw new Error("No se proporciono un tipo valido");
    }

    const updatedData = await ReporteNovedad.findByPk(idReporteNovedad, {
      raw: true,
      transaction: t,
    });
    await t.commit();
    httpSend(res, updatedData, message);
  } catch (error) {
    await t.rollback();
    httpError(res, error.message, 500);
  }
};
