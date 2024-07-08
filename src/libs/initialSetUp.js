const sequelize = require("#DB/sequelize");
const { workNotificacionesAsistencia } = require("#H/customQueries");
const Config = require("#SRC/config/index");
const { Dailyworks } = require("./schedule");

/**iniciar conexion a la db
 * @param sequelize database {sqlz}
 * @param serverApp app express
 */
exports.initApp_Db = async ({ sequelize, serverApp }) => {
  try {
    /**conexion */
    await sequelize.authenticate();
    console.log("autenticado a la db");

    const port = Config.portApp;
    const serv = serverApp.listen(port, () =>
      console.log("server run on port", serv.address().port)
    );
  } catch (error) {
    console.log("connection error", error);
  }
};

exports.recurringWorks = async ({ hour, minute }) => {
  const t = await sequelize.transaction();

  try {
    [true, false];
    Dailyworks(hour, minute, async () => {
      const ok = await workNotificacionesAsistencia(t);
      ok ? await t.commit() : await t.rollback();
    });
  } catch (error) {
    await t.rollback();
    console.log("error:: recurringWorks ", error.message);
  }
};
