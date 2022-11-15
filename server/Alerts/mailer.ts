import nodemailer from "nodemailer";
import moment from "moment";

type monitor = { date: Date; temperature: number; type: "inf" | "sup" }[];

const accountUser = process.env.MAILJET_ACCOUNT_API;
const accountPass = process.env.MAILJET_ACCOUNT_PASS;

const sendEmail = async (list: monitor, alertUser: string, chipID: string) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "in-v3.mailjet.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        username: accountUser,
        password: accountPass,
      },
    });

    const ver = await transporter.verify();
    console.log("ver ", ver);

    let text = `Modulo ${chipID}: `;

    for (let index in list) {
      let { date, temperature, type } = list[index];
      text += ` Sensor ${index} ${
        type === "sup" ? "supero" : "descendio"
      } de la temperatura limite: ${temperature} 
        en el dia ${moment(date).format("DD/MM/YY HH:MM")}`;
    }

    let mailOptions = {
      from: '"CIDIF ALERT SYSTEM" <testmails@mailinator.com>', // sender address
      to: alertUser, // list of receivers
      subject: "Temperature Alert", // Subject line
      text: text, // plain text body
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("email", error);
        return;
      }
      console.log("email enviado ", nodemailer.getTestMessageUrl(info), info);
    });
  } catch (err) {
    console.error("Mail error: ", err);
  }
};

export default sendEmail;
