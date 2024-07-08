const { RecurrenceRule, scheduleJob } = require("node-schedule");

/**
 *  La función recurrencias es una función JavaScript que utiliza la biblioteca
 * node-schedule para programar trabajos recurrentes a una hora y minuto específicos.
 * Toma la hora y el minuto como entradas y una función de devolución de llamada opcional.
 * @param {number} hr - La hora en la que se ejecutará el trabajo recurrente.
 * @param {number} min - El minuto en el que se ejecutará el trabajo recurrente.
 * @param {Function} callback - La función de devolución de llamada que se ejecutará cuando se ejecute el trabajo recurrente.
 * @returns {Object} - Devuelve un objeto que representa el trabajo recurrente.
 * */
exports.Dailyworks = (hr, min, callback = () => {}) => {
  try {
    const rule = new RecurrenceRule();
    rule.hour = hr;
    rule.minute = min;

    return scheduleJob(rule, callback);
  } catch (error) {
    console.log("error:: Dailyworks", error.message);
  }
};
