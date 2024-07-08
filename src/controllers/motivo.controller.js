const { httpSend, httpError } = require("#H/httpResponses");
const { strCodesTipoNotificacion } = require("#H/utils");
const Motivo = require("#M/motivo.model");
const TipoNotificacion = require("#M/tipoNotificacion.model");

exports.list_motivos = async (req, res) => {
  try {
    const { idTipoNotificacion } = await TipoNotificacion.findOne({
      where: { strCode: strCodesTipoNotificacion.NOVEDAD_REVERSADA },
      raw: true,
      attributes: ["idTipoNotificacion"],
    });
    const data = await Motivo.findAll({
      raw: true,
      where: { id_tipoNotificacion: idTipoNotificacion },
    });
    httpSend(res, data);
  } catch (error) {
    httpError(res, `Error al traer la lista de motivos ${error?.message}`, 500);
  }
};
