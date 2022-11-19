import moment from "moment";
import { FaPrint } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type singleModule = {
  date: Date;
  temperature: number[];
}[];

type props = {
  tableData: {
    titles: string[];
    moduleData: singleModule;
    sensorTitles: string[];
    modName: string;
  };
};

const TempTable = ({ tableData }: props) => {
  let { titles, moduleData, sensorTitles } = tableData;

  const navigate = useNavigate();

  const handleOnClickPrint = () => {
    navigate("/print/table", { state: tableData });
  };

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
    <>
      {moduleData ? (
        <>
          <>
            <div className="accordion table-mobile" id="accordionExample">
              {titles.map((e, index) => {
                return (
                  <>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id={`heading-${index}`}>
                        <button
                          onClick={(e) =>
                            toggleCollapse(e, `collapse-${index}`)
                          }
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse-${index}`}
                          aria-expanded="true"
                          aria-controls={`collapse-${index}`}
                        >
                          <p>{sensorTitles[index]}</p>
                          <div onClick={handleOnClickPrint}>
                            <FaPrint />
                          </div>
                        </button>
                      </h2>
                      <div
                        id={`collapse-${index}`}
                        className="accordion-collapse show collapse"
                        aria-labelledby={`heading-${index}`}
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th style={{ width: "33.3333%" }}>Día</th>
                                <th style={{ width: "33.3333%" }}>Hora</th>
                                <th style={{ width: "33.3333%" }}>
                                  Temperatura
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {moduleData.map((data, idx) => {
                                let { date, temperature } = data;
                                let day = moment(date).format("DD/MM");
                                let time = moment(date)
                                  .add(3, "hours")
                                  .format("hh:mm:ss");
                                return (
                                  <tr key={idx}>
                                    <td style={{ width: "33.3333" }}>{day}</td>
                                    <td style={{ width: "33.3333" }}>{time}</td>

                                    <td
                                      className="temperature-info"
                                      style={{ width: "33.3333%" }}
                                      key={index}
                                    >
                                      {temperature[index]}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </>
          <>
            <div>
              <div className="bg-white mt-1 table-normal">
                <div className="print" onClick={handleOnClickPrint}>
                  <FaPrint />
                </div>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        key={"day"}
                        style={{ width: "5%", textAlign: "center" }}
                      >
                        Dia
                      </th>
                      <th
                        scope="col"
                        key={"time"}
                        style={{ width: "7%", textAlign: "center" }}
                      >
                        Hora
                      </th>
                      {titles.map((e, index) => (
                        <th
                          scope="col"
                          key={index}
                          style={{ width: "12%", textAlign: "center" }}
                        >
                          {sensorTitles[index]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                </table>
                <div style={{ height: "250px", overflowY: "auto" }}>
                  <table className="table table-striped">
                    <tbody>
                      {moduleData.map((data, index) => {
                        let { date, temperature } = data;

                        let day = moment(date).format("DD/MM");
                        let time = moment(date)
                          .add(3, "hours")
                          .format("hh:mm:ss");

                        return (
                          <tr key={index}>
                            <td style={{ width: "5%", textAlign: "center" }}>
                              {day}
                            </td>
                            <td style={{ width: "7%", textAlign: "center" }}>
                              {time}
                            </td>
                            {temperature.map((n, index) => (
                              <td
                                key={index}
                                style={{ width: "12%", textAlign: "center" }}
                              >
                                {n}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        </>
      ) : (
        <h2>Loading.....</h2>
      )}
    </>
  );
};

export default TempTable;
