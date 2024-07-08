exports.strCodesPerfil = {
  RESPONSABLE: "RESPONSABLE_PROCESO",
  RRHH: "RRHH",
  ADMIN: "ADMIN",
  SUPERADMIN: "SUPERADMIN",
};

exports.lays = {
  RESPONSABLE_PROCESO: "responsable",
  RRHH: "rrhh",
  ADMIN: "admin",
};

exports.PARAMS_TIPOS_NOVEDAD_ENDPOINT = {
  CHECKNOMINA: "checkNomina",
  AVAL: "aval",
  HISTORICO: "historico",
  CREAR: "crear",
  LISTA: "lista",
  REINTEGRAR: "reIntegrar",
  PENDIENTES: "pendientes",
  APROBACION: "aprobacion",
};
exports.PARAMS_TIPO_ASISTENCIA_ENDPOINT = {
  PERSONAL: "personal",
  CONTROL: "control",
  REPORTE: "reporte",
};
exports.PARAMS_TIPO_GESTIONAR_NOVEDAD_ENPOINT = {
  CIERRE: "cierre",
  REVERSAR: "reversar",
  APROBACION: "aprobacion",
};

exports.TIPOS_PARAM_NOTIFICACION = {
  ...this.lays,
};

exports.URL_APIS = {
  /**INFOBIP */
  SEND_MESSAGES: "/sms/2/text/advanced",
  SEND_EMAIL: "/email/3/send",
  SEND_WHATSAPP_TEMPLATE: "/whatsapp/1/message/template",
  SEND_WHATSAPP_TEXT: "/whatsapp/1/message/text",
  GET_TEMPLATES: (sender) => `/whatsapp/2/senders/${sender}/templates`,
  GET_IDENTITY: (sender, userNumber) => {
    if (!sender || !userNumber) {
      throw new Error("invalid params GET_IDENTITY");
    }
    return `/whatsapp/1/${sender}/contacts/${userNumber}/identity`;
  },
};
