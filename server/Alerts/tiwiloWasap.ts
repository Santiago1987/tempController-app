import client from "twilio";
import moment from "moment";

type monitor = { date: Date; temperature: number; type: "inf" | "sup" }[];

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const sendwasap = (list: monitor, alertUser: string, chipID: string) => {
  let text = `Modulo ${chipID}: `;
  for (let index in list) {
    let { date, temperature, type } = list[index];
    text += ` Sensor ${+index + 1} ${
      type === "sup" ? "supero" : "descendio"
    } de la temperatura limite: ${temperature} 
          en el dia ${moment(date).format("DD/MM/YY HH:MM")}`;
  }

  //console.log("email enviado ", text);
  client(accountSid, authToken)
    .messages.create({
      body: text,
      from: "whatsapp:+14246221474",
      to: "whatsapp:+5493517722072",
    })
    .then((message) => console.log(message.sid))
    .catch((err) => {
      console.error("Wasap", err);
    });
};

export default sendwasap;
