const Contact = () => {
  const toggleCollapse = (e: any, id: string) => {
    var el = document.getElementById(id);
    if (el?.classList.contains("show")) {
      el?.classList.remove("show");
      e.target.classList.remove("collapsed");
    } else {
      e.target.classList.add("collapsed");
      el?.classList.add("show");
    }
  };
  return (
    <div className="container">
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              onClick={(e) => toggleCollapse(e, `collapse-headingOne`)}
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse-headingOne"
              aria-expanded="true"
              aria-controls="collapse-headingOne"
            >
              ¿Cómo creo mi clave?
            </button>
          </h2>
          <div
            id="collapse-headingOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              La clave del administrador sera proporcionada por{" "}
              <span style={{ fontWeight: "bold" }}>C.I.D.I.F.</span>. EL usuario
              administrador depues podra cambiarla si así lo desea en la
              correspondiente seccion de usuario. La contaseña debera ser mayor
              a 8 caracteres.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              onClick={(e) => toggleCollapse(e, `collapse-headingTwo`)}
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse-headingTwo"
              aria-expanded="false"
              aria-controls="collapse-headingTwo"
            >
              Como creo nuevos usuarios?
            </button>
          </h2>
          <div
            id="collapse-headingTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              La creacion de nuevos usuarios solo podrá ser hecha por el usuario
              administador. En la seccion usuarios, el usuario administrador
              podra agregar y modificar los nuevos usuarios o los ya existentes.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              onClick={(e) => toggleCollapse(e, `collapse-headingThree`)}
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse-headingThree"
              aria-expanded="false"
              aria-controls="collapse-headingThree"
            >
              Como agrego un nuevo modulo?
            </button>
          </h2>
          <div
            id="collapse-headingThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              Para agregar un nuevo modulo primero debera contactarse con{" "}
              <span style={{ fontWeight: "bold" }}>C.I.D.I.F.</span> para
              adquirir un nuevo equipo. Una vez que cuente con el debera ir a la
              seccion de modulos y agregar el numero de MAC proporcionado junto
              con el equipo. Es importante que ingrese correctamente este campo
              porque servira depues parea identificar las lecturas de los
              sensores. En nuestros servidores el MAC del equipo ya estará
              asociado a su usuario administrador.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button
              onClick={(e) => toggleCollapse(e, `collapse-headingFour`)}
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse-headingFour"
              aria-expanded="false"
              aria-controls="collapse-headingFour"
            >
              Como configuro los sensores?
            </button>
          </h2>
          <div
            id="collapse-headingFour"
            className="accordion-collapse collapse"
            aria-labelledby="headingFour"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              En la seccion de los sensores usted podra configurar cada sensor
              asociado a cada modulo. Esta seccion solo estara disponible para
              el usuario administrador. Cada modulo cuenta con hasta 6 sensores
              que usted podra asignarle un nombre, desactiva o activar segun lo
              prefiera.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFive">
            <button
              onClick={(e) => toggleCollapse(e, `collapse-headingFive`)}
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse-headingFive"
              aria-expanded="false"
              aria-controls="collapse-headingFive"
            >
              Seccion de configuracion.
            </button>
          </h2>
          <div
            id="collapse-headingFive"
            className="accordion-collapse collapse"
            aria-labelledby="headingFive"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <p>
                Esta seccion esta solo disponible para el usuario administrador.
              </p>
              <p>
                <strong>Fecha:</strong> usted podra configurar cuantas horas
                quiere que muestre el grafico por defecto. La fecha "hasta" sera
                tomada por defecto como la actual y luego se podra especificar
                las cantidad de horas que quiera restarle.
              </p>
              <p>
                <strong>Temperaturas limites:</strong> estos campos hacen
                referencia a la temperatura maxima y minima que se deberan
                controlar, si la temperatura sensada superan estos limites se
                emitira un por los medios que haya seleccionado. Ademas en al
                ingresar las temeraturas limites usted podra ver en el grafico
                marcado por una zona o linea (segun su seleccion) el rango
                limite de las temperaturas.
              </p>
              <p>
                <strong>Rango de temperaturas:</strong> El rango de temperaturas
                hace referencia al limite superior e inferior del eje de las
                termperaturas (y). Es solo un limite visual. En caso de no
                especificar ningun valor el grafico se acomodara
                automaticamente.
              </p>
              <p>
                <strong>Alertas: </strong> existen dos medios por los cuales se
                notificara de que un sensor haya superado un limite, whatsapp y
                emai. Se podra seleccionar porque medio quiere recibir las
                alertas y los usuarios a los cuales seran enviadas. Los usuarios
                deberan contar con un numero de celular y telefono segun
                corresponda. Las alertas seran enviadas una vez cada 24hs por
                cada sensor.
              </p>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingSix">
            <button
              onClick={(e) => toggleCollapse(e, `collapse-headingSix`)}
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse-headingSix"
              aria-expanded="false"
              aria-controls="collapse-headingSix"
            >
              Tienes alguna duda o quieres comunicarte con nosotros?
            </button>
          </h2>
          <div
            id="collapse-headingSix"
            className="accordion-collapse collapse"
            aria-labelledby="headingSix"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              En caso de que quiera contactarse con nostros lo podra hacer al
              travez del correo electronico
              <strong>administracion@cidif.com.ar</strong>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingSeven">
            <button
              onClick={(e) => toggleCollapse(e, `collapse-headingSeven`)}
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse-headingSeven"
              aria-expanded="false"
              aria-controls="collapse-headingSeven"
            >
              Qué medios de pago aceptan?
            </button>
          </h2>
          <div
            id="collapse-headingSeven"
            className="accordion-collapse collapse"
            aria-labelledby="headingSeven"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              Los medios de pago aceptados son por tranferecia bancaria,
              efectivo o cryptomonedas (USDT o ETHER). En caso de ETHEREUM se
              tomara la contizacion en le momento del pago.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
