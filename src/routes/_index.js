const express = require("express");
const { indexRoutes } = require("./_barrel");

const routerApi = (app) => {
  const router = express.Router();
  app.use("/api/v1", router);

  //publicas
  router.use("/auth", indexRoutes.authRouter);
  //Privadas
  router.use("/adjunto-novedad", indexRoutes.adjuntoNovedadRouter);
  router.use("/area", indexRoutes.areaRouter);
  router.use("/asistencia", indexRoutes.asistenciaRouter);
  router.use("/cargo", indexRoutes.cargoRouter);
  router.use("/centroCosto", indexRoutes.centroCostoRouter);
  router.use("/checkNomina", indexRoutes.checkNominaRouter);
  router.use("/departamento", indexRoutes.departamentoRouter);
  router.use("/empresa", indexRoutes.empresaRouter);
  router.use("/estado", indexRoutes.estadoRouter);
  router.use("/liderProceso", indexRoutes.liderProcesoRouter);
  router.use("/motivo", indexRoutes.motivoRouter);
  router.use("/novedad", indexRoutes.novedadRouter);
  router.use("/personal", indexRoutes.personalRouter);
  router.use("/reintegro", indexRoutes.reintegroRouter);
  router.use("/reporte-notificacion", indexRoutes.reporteNotificacionRouter);
  router.use("/tipoDocumento", indexRoutes.tipoDocumentoRouter);
  router.use("/tipoEstado", indexRoutes.tipoEstadoRouter);
  router.use("/tipoNotificacion", indexRoutes.tipoNotificacionRouter);
  router.use("/tipoNovedad", indexRoutes.tipoNovedadRouter);
  router.use("/usuario", indexRoutes.usuarioRouter);
  router.use("/perfil", indexRoutes.perfilRouter);
};
module.exports = routerApi;
