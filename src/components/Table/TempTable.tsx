import moment from "moment";
import { FaPrint } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type singleModule = {
  date: Date;
  temperature: number[];
}[];

type props = {
  tableData: { titles: string[]; moduleData: singleModule };
};

const TempTable = ({ tableData }: props) => {
  let { titles, moduleData } = tableData;

  const navigate = useNavigate();

  const handleOnClickPrint = () => {
    navigate("/print/table", { state: tableData });
  };

  return (
    <>
      {moduleData ? (
        <>
          <div className="shadow bg-white rounded mt-1">
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
                    >{`Sensor ${+e + 1}`}</th>
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
                    let time = moment(date).add(3, "hours").format("hh:mm:ss");

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
        </>
      ) : (
        <h2>Loading.....</h2>
      )}
    </>
  );
};

export default TempTable;
