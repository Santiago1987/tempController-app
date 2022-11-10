import { useEffect, useState } from "react";
import {
  FaThermometerEmpty,
  FaThermometerQuarter,
  FaThermometerHalf,
  FaThermometerThreeQuarters,
  FaThermometerFull,
} from "react-icons/fa";

const Loading = () => {
  const icon = [
    <FaThermometerEmpty />,
    <FaThermometerQuarter />,
    <FaThermometerHalf />,
    <FaThermometerThreeQuarters />,
    <FaThermometerFull />,
  ];

  const [currentIco, setCurrentIco] = useState(<FaThermometerEmpty />);

  const loop = () => {
    setTimeout(() => {
      setCurrentIco(icon[0]);
    }, 500);
    setTimeout(() => {
      setCurrentIco(icon[1]);
    }, 1000);
    setTimeout(() => {
      setCurrentIco(icon[2]);
    }, 1500);
    setTimeout(() => {
      setCurrentIco(icon[3]);
    }, 2000);
    setTimeout(() => {
      setCurrentIco(icon[4]);
    }, 2500);
  };

  useEffect(() => {
    let id: undefined | NodeJS.Timer = undefined;
    loop();
    id = setInterval(() => {
      loop();
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return <div className="loading">{currentIco}</div>;
};

export default Loading;
