import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

type props = {
  frDate: Date | undefined;
  toDate: Date | undefined;
  isCollapseFr: boolean;
  isCollapseTo: boolean;
  handleOnClickCollapse: () => void;
  handleOnChangeFrDate: (date: string) => void;
  handleOnChangeToDate: (date: string) => void;
  handleOnClickCollapseTo: () => void;
};

const DateSelection = ({
  frDate,
  toDate,
  isCollapseFr,
  isCollapseTo,
  handleOnClickCollapse,
  handleOnChangeFrDate,
  handleOnChangeToDate,
  handleOnClickCollapseTo,
}: props) => {
  return (
    <>
      <div className="col-lg-12 mt-1 d-flex flex-column">
        <p className="h5 mt-2">Rango de fechas</p>

        <div className="d-flex flex-column align-items-center border my-2">
          <div
            className="d-flex justify-content-between w-100 action-btn-container"
            onClick={handleOnClickCollapse}
          >
            <label htmlFor="frDate" className="w-25">
              Desde
            </label>
            <span className="action-btn">
              {isCollapseFr ? <FaChevronDown /> : <FaChevronUp />}
            </span>
          </div>
          <div className={isCollapseFr ? `collapse` : ""}>
            <DatePicker
              id="frDate"
              selected={frDate ? frDate : moment().toDate()}
              onChange={handleOnChangeFrDate}
              dateFormat="dd/MM/yyyy HH:mm"
              timeIntervals={10}
              maxDate={toDate ? toDate : moment().toDate()}
              startDate={frDate ? frDate : moment().toDate()}
              showTimeSelect
              className=""
              inline
            />
          </div>
        </div>
        <div className="d-flex flex-column align-items-center border my-2">
          <div className="d-flex flex-column align-items-center w-100">
            <div
              className="d-flex justify-content-between w-100 action-btn-container"
              onClick={handleOnClickCollapseTo}
            >
              <label htmlFor="toDate" className="w-25">
                Hasta
              </label>
              <span className="action-btn">
                {isCollapseFr ? <FaChevronDown /> : <FaChevronUp />}
              </span>
            </div>
            <div className={isCollapseTo ? `collapse` : ""}>
              <DatePicker
                id="toDate"
                selected={toDate ? toDate : moment().toDate()}
                onChange={handleOnChangeToDate}
                dateFormat="dd/MM/yyyy HH:mm"
                timeIntervals={10}
                minDate={frDate ? frDate : moment().toDate()}
                enDate={toDate ? toDate : moment().toDate()}
                showTimeSelect
                className=""
                inline
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DateSelection;
