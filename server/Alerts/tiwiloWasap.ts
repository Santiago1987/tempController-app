import client from "twilio";
import moment from "moment";

type monitor = {
  date: Date;
  sensorName: string;
  temperature: number;
  type: "inf" | "sup";
}[];

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const sendwasap = (
  list: monitor,
  telList: (string | undefined)[],
  moduleName: string
) => {
  let text = `Modulo ${moduleName}: `;
  for (let index in list) {
    let { date, temperature, type, sensorName } = list[index];
    text += ` Sensor ${sensorName} ${
      type === "sup" ? "supero" : "descendio"
    } de la temperatura limite: ${temperature} 
          en el dia ${moment(date).format("DD/MM/YY HH:MM")}`;
  }

  for (let cel of telList) {
    if (cel) {
      let receiver = `whatsapp:+${cel}`;

      client(accountSid, authToken)
        .messages.create({
          body: text,
          from: "whatsapp:+14155238886",
          to: receiver,
        })
        .then((message) => console.log(message.sid))
        .catch((err) => {
          console.error("Wasap", err);
        });
    }
  }
};

export default sendwasap;
