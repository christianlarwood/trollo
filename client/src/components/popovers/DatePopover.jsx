import React, { useRef, useEffect } from 'react';
import Pikaday from "pikaday";
import moment from "moment";
import useInput from "../../hooks/useInput";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const DueDatePopover = ({ close }) => {
  const cardId = useParams().id;
  const card = useSelector(state => state.cards).find(({_id}) => cardId === _id);
  const dueDate = useInput(card.dueDate);

  const setDueDate = (newDate) => {
    console.log(newDate);
    dueDate.current = newDate;
  }

  let picker;
  useEffect(() => {
      picker = new Pikaday({
        field: document.querySelector(".datepicker-select-date input"),
        bound: false,
        container: document.getElementById("calendar-widget"),
        firstDay: 1,
        yearRange: 10,
        defaultDate: moment()
          .add(1, "day")
          .toDate(),
        setDefaultDate: true,
        format: "M/D/YYYY",
        i18n: {
          previousMonth: "Prev",
          nextMonth: "Next",
          months: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          ],
          weekdays: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          weekdaysShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
        },
        toString(date, format) {
          return moment(date).format(format);
        }
      });
      picker.show();
  }, [picker]);

    return (
      <>
        <header>
          <span>Change due date</span>
          <a href="#" className="icon-sm icon-close"></a>
        </header>
        <div className="content">
          <form>
            <div className="datepicker-select">
              <div className="datepicker-select-date">
                <label>
                  Date
                  <input type="text" placeholder="Enter date" autoFocus {...dueDate.bind}/>
                </label>
              </div>
              <div className="datepicker-select-time">
                <label>
                  Time
                  <input
                    type="text"
                    placeholder="Enter time"
                    value="12:00 PM"
                  />
                </label>
              </div>
              <div id="calendar-widget"></div>
            </div>
            <button className="button" type="submit" >
              Save
            </button>
            <button className="button red-button" type="reset">
              Remove
            </button>
          </form>
        </div>
      </>
    );
  }

export default DueDatePopover;


// componentDidMount() {
  //   this.picker = new Pikaday({
  //     field: document.querySelector(".datepicker-select-date input"),
  //     bound: false,
  //     container: document.getElementById("calendar-widget"),
  //     firstDay: 1,
  //     yearRange: 10,
  //     defaultDate: moment()
  //       .add(1, "day")
  //       .toDate(),
  //     setDefaultDate: true,
  //     format: "M/D/YYYY",
  //     i18n: {
  //       previousMonth: "Prev",
  //       nextMonth: "Next",
  //       months: [
  //         "January",
  //         "February",
  //         "March",
  //         "April",
  //         "May",
  //         "June",
  //         "July",
  //         "August",
  //         "September",
  //         "October",
  //         "November",
  //         "December"
  //       ],
  //       weekdays: [
  //         "Sunday",
  //         "Monday",
  //         "Tuesday",
  //         "Wednesday",
  //         "Thursday",
  //         "Friday",
  //         "Saturday"
  //       ],
  //       weekdaysShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
  //     },
  //     toString(date, format) {
  //       return moment(date).format(format);
  //     }
  //   });
  //   this.picker.show();
  // }