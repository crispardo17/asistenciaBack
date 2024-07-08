const sequelize = require("#DB/sequelize");
const {
  updateLastAsistenciaResponsable,
  inactivarReporteAsistenciaByUsuarioid,
} = require("#H/customQueries");
const { getAsistenciasByTipo, getCurrentStringDate } = require("#H/functions");
const { httpSend, httpError } = require("#H/httpResponses");
const { messages, strCodesEstados, getFechaDiasAntes } = require("#H/utils");
const { lays } = require("#H/vars");
const Asistencia = require("#M/asistencia.model");
const Estado = require("#M/estado.model");

exports.create_asistencia = async (req, res) => {
  const t = await sequelize.transaction();
  const t_updateReports = await sequelize.transaction();
  const { idUsuario: idUsuarioToken, tokenDecodeduser } = req.userToken;
  const { lay: frontLayout } = tokenDecodeduser;
  try {
    const {
      asistio,
      numDiaAsis,
      fechaAsistencia,
      observacionReporte,
      id_personal,
      activo,
    } = req.body;

    const estadoActivo = await Estado.findOne({
      where: { strCode: strCodesEstados.ACTIVA },
      raw: true,
      attributes: ["idEstado"],
      transaction: t,
    });

    const create = await Asistencia.create(
      {
        asistio,
        numDiaAsis,
        fechaAsistencia,
        fechaReporte: getCurrentStringDate(),
        observacionReporte,
        id_personal,
        id_usuarioReporto: idUsuarioToken,
        id_estadoAsistencia: estadoActivo.idEstado,
        activo,
      },
      { transaction: t }
    );

    await t.commit();
    httpSend(res, create?.dataValues, messages.CREATE_SUCCESS("Asistencia"));
  } catch (error) {
    await t.rollback();
    console.log({ error });
    httpError(res, `error creando asistencia`, 500);
  } finally {
    /** actualizar fecha de toma de asistenia si la peticion proviene de responsable */
    if (frontLayout === lays.RESPONSABLE_PROCESO) {
      await updateLastAsistenciaResponsable(
        {
          idUsuarioResponsable: idUsuarioToken,
          fecha: getCurrentStringDate(),
        },
        t_updateReports
      );
      /** inactivar reporte asistencia de usuario responsable */
      inactivarReporteAsistenciaByUsuarioid(idUsuarioToken);
    }
  }
};

exports.show_asistencia = async (req, res) => {
  try {
    const { idAsistencia } = req.params;
    const asistencia = await Asistencia.findByPk(idAsistencia, { raw: true });
    httpSend(res, asistencia, "success");
  } catch (error) {
    httpError(res, `show asistencia error: ${error?.message}`, 500);
  }
};
exports.update_asistencia = async (req, res) => {
  try {
    const { idUsuario } = req.userToken;
    const { idAsistencia } = req.params;
    const {
      asistio,
      numDiaAsis,
      fechaAsistencia,
      fechaReporte,
      observacionReporte,
      id_personal,
      id_estadoAsistencia,
    } = req.body;

    const create = await Asistencia.update(
      {
        asistio,
        numDiaAsis,
        fechaAsistencia,
        fechaReporte,
        observacionReporte,
        id_personal,
        id_usuarioReporto: idUsuario,
        id_estadoAsistencia,
      },
      { where: { idAsistencia } }
    );
    httpSend(res, create?.dataValues, messages.DATA_EDITADO("Asistencia"));
  } catch (error) {
    httpError(res, `asist update error: ${error?.message}`, 500);
  }
};

exports.list_asistencias = async (req, res) => {
  try {
    const currentFecha = getCurrentStringDate();
    // fechas personal
    const yearMonthDay = currentFecha.split("T")[0];
    const fechas = getFechaDiasAntes(yearMonthDay, 2);
    // fechas control
    const list = await getAsistenciasByTipo(req, {
      fechas: {
        personal: fechas,
        control: currentFecha,
      },
    });
    httpSend(res, list);
  } catch (error) {
    httpError(res, `list asistencias error ${error?.message}`, 500);
  }
};
