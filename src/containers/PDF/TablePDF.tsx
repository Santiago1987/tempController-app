/*import { useEffect, useState } from "react";
//import { Page, Text, View, Document, StyleSheet } from "react-pdf";
import { useNavigate, useLocation } from "react-router-dom";
import useUser from "../hooks/User/useUser";
import moment from "moment";

type singleModule = {
  dateformat: Date;
  temperature: number[];
}[];

type data = {
  titles: string[];
  moduleData: singleModule;
};

type LocationState = {
  state: data;
};*/

const TablePDF = () => {
  /*const [data, setData] = useState<data | undefined>(undefined);

  const { isLogged } = useUser();

  const navigate = useNavigate();
  const location = useLocation() as LocationState;

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
      return;
    }

    if (!(location.state && location.state.titles)) {
      navigate("/home", { state: { error: true, msg: "missing parameters" } });
    }

    setData(location.state);
  }, []);

  const styles = StyleSheet.create({
    tableContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      backgroundColor: "#E4E4E4",
    },
    tile: {
      flexDirection: "row",
      fontWeight: "bold",
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    date: {
      width: "5%",
      textAlign: "center",
    },
    time: {
      width: "7%",
      textAlign: "center",
    },
    sensor: { width: "12%", textAlign: "center" },
  });

  return (
    <>
      {!data ? (
        <p className="h3">Loading...</p>
      ) : (
        <Document>
          <Page size="A4" style={styles.tableContainer}>
            <View style={styles.tile}>
              <Text style={styles.date}>Dia</Text>
              <Text style={styles.time}>Hora</Text>
              {data.titles.map((e) => {
                <Text style={styles.sensor}>{`Sensor ${+e + 1}`}</Text>;
              })}
            </View>
            {data.moduleData.map((data) => {
              let { dateformat, temperature } = data;
              let day = moment(dateformat).format("DD/MM");
              let time = moment(dateformat).format("HH:MM:ss");
              return (
                <View style={styles.tile}>
                  <Text style={styles.date}>{day}</Text>
                  <Text style={styles.time}>{time}</Text>
                  {temperature.map((e, index) => {
                    <Text style={styles.sensor}>{`Sensor ${+e + 1}`}</Text>;
                  })}
                </View>
              );
            })}
          </Page>
        </Document>
      )}
    </>
  );*/
};

export default TablePDF;
