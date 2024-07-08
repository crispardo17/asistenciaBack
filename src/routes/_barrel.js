const adjuntoNovedadRouter = require("./adjuntoNovedad.routes");
const areaRouter = require("./area.routes");
const asistenciaRouter = require("./asistencia.routes");
const authRouter = require("./auth.routes.js");
const cargoRouter = require("./cargo.routes");
const centroCostoRouter = require("./centroCosto.routes");
const checkNominaRouter = require("./checkNomina.routes");
const departamentoRouter = require("./departamento.routes");
const empresaRouter = require("./empresa.routes");
const estadoRouter = require("./estado.routes");
const liderProcesoRouter = require("./liderProceso.routes");
const motivoRouter = require("./motivo.routes");
const novedadRouter = require("./novedad.routes");
const personalRouter = require("./personal.routes");
const reintegroRouter = require("./reintegro.routes");
const reporteNotificacionRouter = require("./reporteNotificacion.routes");
const tipoDocumentoRouter = require("./tipoDocumento.routes");
const tipoEstadoRouter = require("./tipoEstado.routes");
const tipoNotificacionRouter = require("./tipoNotificacion.routes");
const tipoNovedadRouter = require("./tipoNovedad.routes");
const usuarioRouter = require("./usuario.routes");
const perfilRouter = require("./perfil.routes");

exports.indexRoutes = {
  adjuntoNovedadRouter,
  areaRouter,
  asistenciaRouter,
  authRouter,
  cargoRouter,
  centroCostoRouter,
  checkNominaRouter,
  departamentoRouter,
  empresaRouter,
  estadoRouter,
  liderProcesoRouter,
  motivoRouter,
  novedadRouter,
  personalRouter,
  reintegroRouter,
  reporteNotificacionRouter,
  tipoDocumentoRouter,
  tipoEstadoRouter,
  tipoNotificacionRouter,
  tipoNovedadRouter,
  usuarioRouter,
  perfilRouter,
};
