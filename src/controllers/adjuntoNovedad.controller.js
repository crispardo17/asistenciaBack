const { extname } = require("path");
const { httpError, httpSend } = require("#H/httpResponses");
const { MB_FACTOR, messages } = require("#H/utils");
const { getRootDirName, getCurrentStringDate } = require("#H/functions");
const fs = require("fs");

const sequelize = require("#DB/sequelize");
const AdjuntoNovedad = require("#M/adjuntoNovedad.model");
const ReporteNovedad = require("#M/reporteNovedad.model");
const path = require("path");

/**
 * Este código exporta una función denominada create_adjunto_novedad que es una función asincrónica que controla la creación de datos adjuntos para una novedad de informe.
 * Utiliza el ORM Sequelize para interactuar con la base de datos y el módulo fs para manipular archivos.
 * La función recibe un objeto de solicitud (req) y un objeto de respuesta (res) como entradas.
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.create_adjunto_novedad = async (req, res) => {
  const transaction = await sequelize.transaction();
  const { _sub: idUsuarioToken } = req.userToken.tokenDecodeduser;
  try {
    const { activo, id_reporteNovedad } = req.body;
    if (!req.file) return httpError(res, "Debe proporcionar un archivo...");
    const {
      originalname: nombreOriginal,
      filename: nombreFile,
      path,
      size,
      destination,
      mimetype,
    } = req.file;
    const peso = (size / MB_FACTOR).toFixed(3);
    const fechaCargue = getCurrentStringDate();

    const create = await AdjuntoNovedad.create(
      {
        id_reporteNovedad,
        ubicacionAdjuntoNovedad: path,
        nombreFile,
        mimetype,
        nombreOriginal,
        peso,
        extension: extname(nombreOriginal),
        fechaCargue: fechaCargue,
        id_usuarioCarga: idUsuarioToken,
        activo,
      },
      { transaction }
    );

    const newName = `id_${
      create[AdjuntoNovedad.primaryKeyAttribute]
    }_idReporteNovedad_${id_reporteNovedad}`;
    const newPath = `${destination}/${newName}${extname(nombreOriginal)}`;

    fs.renameSync(create.ubicacionAdjuntoNovedad, newPath);

    create.ubicacionAdjuntoNovedad = newPath;
    create.nombreFile = newName;
    await create.save({ transaction });

    const updateNovedad = await ReporteNovedad.update(
      {
        adjuntoNovedad: true,
      },
      {
        where: { idReporteNovedad: id_reporteNovedad },
        transaction: transaction,
      }
    );

    if (!updateNovedad) {
      throw new Error("No se pudo actualizar la novedad");
    }

    await transaction.commit();
    httpSend(res, create?.dataValues, messages.CREATE_SUCCESS("archivo"));
  } catch (error) {
    await transaction.rollback();
    httpError(res, `${messages.ERR_SAVE("archivo")} ${error.message}`);
  }
};

/**
 * Este código exporta una función denominada get_adjunto_novedad que recupera un archivo adjunto asociado a un identificador determinado.
 * Utiliza el método findByPk para buscar el archivo en el modelo AdjuntoNovedad, incluido el modelo ReporteNovedad asociado.
 * Si se encuentra el archivo, lo envía al cliente mediante el método sendFile. Si se produce un error, envía una respuesta de error HTTP.
 * @param {*} req
 * @param {*} res
 */
exports.get_adjunto_novedad = async (req, res) => {
  try {
    const { idAdjuntoNovedad } = req.params;
    const file = await AdjuntoNovedad.findByPk(idAdjuntoNovedad, { raw: true });
    if (!file) return httpError(res, "Archivo no encontrado", 404);

    const filePath = path.resolve(
      __dirname,
      `../../${file.ubicacionAdjuntoNovedad}`
    );
    res.sendFile(
      filePath,
      {
        headers: {
          "Content-Type": file.mimetype,
          "Content-Disposition": `attachment; filename="${file.nombreFile}"`,
        },
      },
      (err) =>
        err && httpError(res, `Error al enviar el archivo: ${err.message}`, 500)
    );
  } catch (error) {
    httpError(res, `${messages.ERR_GET("archivo")} ${error.message}`);
  }
};

/**
 * Este código exporta una función denominada list_adjuntos_novedad que recupera una lista de datos adjuntos relacionados con una novedad.
 * A continuación, envía la lista de archivos adjuntos como respuesta al cliente.
 * @param {*} req
 * @param {*} res
 */
exports.list_adjuntos_novedad = async (req, res) => {
  try {
    const { idReporteNovedad } = req.query;
    const archivos = await AdjuntoNovedad.findAll({
      where: idReporteNovedad
        ? { id_reporteNovedad: idReporteNovedad }
        : undefined,
      include: [{ model: ReporteNovedad, required: true }],
    });

    const filesResponse = archivos.map(({ dataValues }) => {
      return {
        ...dataValues,
        root: getRootDirName(`../../${dataValues?.path}`),
      };
    });

    httpSend(res, filesResponse);
  } catch (error) {
    httpError(res, `${messages.ERR_GET("archivos")} ${error.message}`);
  }
};
