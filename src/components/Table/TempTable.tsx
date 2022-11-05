import moment from "moment";
type singleModule = {
  dateformat: Date;
  temperature: number[];
}[];

type props = {
  tableData: { titles: string[]; moduleData: singleModule };
};

const TempTable = ({ tableData }: props) => {
  let { titles, moduleData } = tableData;

  return (
    <>
      {moduleData ? (
        <>
          <table>
            <thead>
              <tr>
                <th key={"day"}>Dia</th>
                <th key={"time"}>Hora</th>
                {titles.map((e, index) => (
                  <th key={index}>{`Sensor ${+e + 1}`}</th>
                ))}
              </tr>
            </thead>
          </table>
          <table>
            <tbody>
              {moduleData.map((data, index) => {
                let { dateformat, temperature } = data;
                let day = moment(dateformat).format("DD/MM");
                let time = moment(dateformat).format("HH:MM:ss a");

                return (
                  <tr key={index}>
                    <td>{day}</td>
                    <td>{time}</td>
                    {temperature.map((n) => (
                      <td>{n}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <h2>Loading.....</h2>
      )}
    </>
  );
};

export default TempTable;
