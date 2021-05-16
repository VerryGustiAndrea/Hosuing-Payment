const nodemailer = require("nodemailer");
// const service = require("../../config/gmail");
const template = require("./template/templatePointInfo");

module.exports = {
  sendMail: (
    req,
    res,
    email,
    name,
    payment_date,
    pointGet,
    total_price,
    totalPoint
  ) => {
    //Send Email Welcome
    let transporter = nodemailer.createTransport({
      //gmail using node env
      service: "gmail",
      auth: {
        user: "akunverrydummy@gmail.com",
        pass: "nakushita1",
      },

      // host: "mail.redrubygroup.com",
      // port: 465,
      // secure: true,
      // auth: {
      //   user: service.email,
      //   pass: service.password,
      // },
    });
    let mailOptions = {
      from: service.email,
      to: email,
      subject: "Housing Payment Info",
      html: template.point(
        name,
        payment_date,
        pointGet,
        total_price,
        totalPoint
      ),
    };
    transporter
      .sendMail(mailOptions)
      .then(() => {
        console.log("email sent");
      })
      .catch((err) => {
        res.status(500).json({
          message: err,
          status: false,
          code: 500,
          data: null,
        });
      });
  },
};
