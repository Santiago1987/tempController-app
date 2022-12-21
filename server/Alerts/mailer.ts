import nodemailer from "nodemailer";
import moment from "moment";
import { config } from "dotenv";
config();
type monitor = {
  date: Date;
  sensorName: string;
  temperature: number;
  type: "inf" | "sup";
}[];

const accountUser = process.env.MAILLER_ACCOUNT_USER;
const accountPass = process.env.MAILJET_ACCOUNT_PASS;

const sendEmail = async (
  list: monitor,
  mailList: (string | undefined)[],
  moduleName: string
) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: accountUser,
        pass: accountPass,
      },
    });

    const ver = await transporter.verify();

    if (!ver) return;
    let text = `Modulo ${moduleName}: `;

    let stringTO = "";
    for (let mail of mailList) {
      if (mail) {
        stringTO += `${mail},`;
      }
    }

    if (stringTO === "") return;

    for (let index in list) {
      let { date, temperature, type, sensorName } = list[index];
      text += `<p> Sensor ${sensorName} ${
        type === "sup" ? "supero" : "descendio"
      } de la temperatura limite: ${temperature} 
        en el dia ${moment(date)
          .add(3, "hours")
          .format("DD/MM/YY h:mm:ss a")}</p>`;
    }

    let mailOptions = {
      from: '"CIDIF ALERT SYSTEM" <stest7584@gmail.com>', // sender address
      to: stringTO, // list of receivers
      subject: "Temperature Alert", // Subject line
      html: `<h1>C.I.D.I.F</h1>${text}`,
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
