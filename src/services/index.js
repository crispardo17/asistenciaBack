const Config = require("#SRC/config/index");
const axios = require("axios");

exports.axiosInfobip = axios.create({
  baseURL: `https://${Config.domainInfobip}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${Buffer.from(
      `${Config.usernameInfobip}:${Config.passwordInfobip}`
    ).toString("base64")}`,
  },
});
