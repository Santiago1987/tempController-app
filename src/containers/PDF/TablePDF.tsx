import { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { useNavigate, useLocation } from "react-router-dom";
import useUser from "../hooks/User/useUser";
import moment from "moment";
import { MapSensorList } from "../../../types";

type data = {
  titles: string[];
  moduleData: MapSensorList[];
};

type LocationState = {
  state: data;
};

const TablePDF = () => {
  const [data, setData] = useState<data | undefined>(undefined);

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
    tile: {
      flexDirection: "row",
      marginHorizontal: "auto",
    },
    dateTitle: {
      width: "7%",
      textAlign: "center",
      fontSize: "12px",
      padding: "1px",
      fontWeight: "bold",
      border: "1px solid black",
    },
    date: {
      width: "7%",
      textAlign: "center",
      fontSize: "10px",
      padding: "1px",
      border: "1px solid black",
    },
    timeTitle: {
      width: "10%",
      textAlign: "center",
      fontSize: "12px",
      padding: "1px",
      fontWeight: "bold",
      border: "1px solid black",
    },
    time: {
      width: "10%",
      textAlign: "center",
      fontSize: "10px",
      padding: "1px",
      border: "1px solid black",
    },
    sensorTitle: {
      width: "12%",
      textAlign: "center",
      fontSize: "12px",
      padding: "1px",
      fontWeight: "bold",
      border: "1px solid black",
    },
    sensor: {
      width: "12%",
      textAlign: "center",
      fontSize: "10px",
      padding: "1px",
      border: "1px solid black",
    },
  });

  return (
    <>
      {!data ? (
        <p className="h3">Loading...</p>
      ) : (
        <PDFViewer style={{ width: "100%", height: "90vh" }}>
          <Document>
            <Page size="A4">
              <View>
                <Text>Temperaturas Registradas</Text>
              </View>
              <View style={styles.tile}>
                <>
                  <Text key={"dia"} style={styles.dateTitle}>
                    Dia
                  </Text>
                  <Text key={"hora"} style={styles.timeTitle}>
                    Hora
                  </Text>
                  {data.titles.map((e) => (
                    <Text key={e} style={styles.sensorTitle}>{`Sensor ${
                      +e + 1
                    }`}</Text>
                  ))}
                </>
              </View>
              {data.moduleData.map((data, index) => {
                let { date, temperature } = data;
                console.log("date", date);
                let day = moment(date).add(3, "hours").format("DD/MM");
                let time = moment(date).add(3, "hours").format("HH:mm:ss");
                return (
                  <View key={index} style={styles.tile}>
                    <>
                      <Text style={styles.date}>{day}</Text>
                      <Text style={styles.time}>{time}</Text>
                      {temperature.map((temp, index) => (
                        <Text key={index} style={styles.sensor}>
                          {temp}
                        </Text>
                      ))}
                    </>
                  </View>
                );
              })}
            </Page>
          </Document>
        </PDFViewer>
      )}
    </>
  );
};

export default TablePDF;
