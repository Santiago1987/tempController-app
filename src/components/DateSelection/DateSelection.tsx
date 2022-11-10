import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type props = {
  frDate: Date | undefined;
  toDate: Date | undefined;
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
      <div className="col-3 shadow rounded bg-white mt-1 d-flex flex-column">
        <p className="h4 fw-bold mt-2">Rango de fechas</p>
        <div className="d-flex align-items-center my-2">
          <label htmlFor="frDate" className="w-25 fw-bold">
            Desde:
          </label>
          <DatePicker
            id="frDate"
            selected={frDate ? frDate : new Date()}
            onChange={handleOnChangeFrDate}
            dateFormat="dd/MM/yyyy HH:mm"
            timeIntervals={10}
            maxDate={toDate ? toDate : new Date()}
            startDate={frDate ? frDate : new Date()}
            showTimeSelect
            className=""
          />
        </div>
        <div className="d-flex align-items-center my-2">
          <label htmlFor="toDate" className="w-25 fw-bold">
            Hasta:
          </label>
          <DatePicker
            id="toDate"
            selected={toDate ? toDate : new Date()}
            onChange={handleOnChangeToDate}
            dateFormat="dd/MM/yyyy HH:mm"
            timeIntervals={10}
            minDate={frDate ? frDate : new Date()}
            enDate={toDate ? toDate : new Date()}
            showTimeSelect
            className=""
          />
        </div>
      </div>
    </>
  );
};

export default DateSelection;
