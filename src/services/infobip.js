const { URL_APIS } = require("#H/vars");
const Config = require("#SRC/config/index");
const { axiosInfobip } = require("./index");

exports.sendMail = async ({
  to,
  text,
  subject = "Asunto",
  html = undefined,
}) => {
  try {
    const resp = await axiosInfobip.post(
      URL_APIS.SEND_EMAIL,
      {
        to,
        text,
        html,
        from: Config.mailFromInfobip,
        subject,
      },
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return {
      data: resp.data?.messages?.map((el) => el.status || null),
      state: resp?.status,
    };
  } catch (error) {
    console.log("error send Email", error.message);
    return false;
  }
};
