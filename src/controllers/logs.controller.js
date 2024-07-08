// const { httpError, httpSend } = require("#H/httpResponses");
// const LogsGestion = require("#M/logModel/log_reporteNovedad.model");

// exports.get_log_novedades = async (req, res) => {
//   try {
//     const data = await LiderProceso.findAll({
//       include: [
//         {
//           model: Usuario,
//           attributes: { exclude: ["contrasenna", "token"] },
//         },
//       ],
//     });
//     httpSend(res, data);
//   } catch (error) {
//     console.log("error get_logs_solicitudes_gestion::", error.message);
//     httpError(res, error.message);
//   }
// };
