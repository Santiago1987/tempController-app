import { useNavigate } from "react-router-dom";
const FooterBar = () => {
  const navigate = useNavigate();

  return (
    <div className="footer-container">
      <small>
        <a className="btn-link" onClick={() => navigate("./terms")}>
          Terminos y condiciones
        </a>
      </small>
      <small>
        <a className="btn-link" onClick={() => navigate("./contact")}>
          Preguntas frecuentes
        </a>
      </small>
    </div>
  );
};

export default FooterBar;
