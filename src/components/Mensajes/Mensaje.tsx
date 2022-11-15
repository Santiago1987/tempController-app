import { useEffect, useState } from "react";
import { messageType } from "../../typeEnum";

type props = {
  tipo: messageType;
  message: string;
};

const Mensaje = ({ tipo, message }: props) => {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setHidden(false);
    setTimeout(() => {
      setHidden(true);
    }, 5000);
  }, []);

  return (
    <div
      className={`alert ${tipo}`}
      role="alert"
      hidden={hidden}
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
