import { messageType } from "../../typeEnum";

type props = {
  tipo: messageType;
  message: string;
};

const Mensaje = ({ tipo, message }: props) => {
  return (
    <div
      className={`alert ${tipo}`}
      role="alert"
      style={{
        width: "80%",
        position: "absolute",
        textAlign: "center",
        top: "10px",
        left: "10%",
      }}
    >
      {message}
    </div>
  );
};

export default Mensaje;
