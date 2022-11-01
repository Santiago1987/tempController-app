import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type props = {
  frDate: string;
  toDate: string;
  handleOnChangeFrDate: (date: string) => void;
  handleOnChangeToDate: (date: string) => void;
};

const DateSelection = ({
  frDate,
  toDate,
  handleOnChangeFrDate,
  handleOnChangeToDate,
}: props) => {
  return (
    <>
      <div>
        <div>
          <label>Desde</label>
          <DatePicker
            selected={new Date(frDate)}
            onChange={handleOnChangeFrDate}
            dateFormat="dd/MM/yyyy HH:mm"
            timeIntervals={10}
            maxDate={new Date(toDate)}
            startDate={new Date(frDate)}
            showTimeSelect
          />
        </div>
        <div>
          <label>Hasta</label>
          <DatePicker
            selected={new Date(toDate)}
            onChange={handleOnChangeToDate}
            dateFormat="dd/MM/yyyy HH:mm"
            timeIntervals={10}
            minDate={new Date(frDate)}
            enDate={new Date(toDate)}
            showTimeSelect
          />
        </div>
      </div>
    </>
  );
};

export default DateSelection;