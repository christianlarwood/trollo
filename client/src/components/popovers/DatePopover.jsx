import React, { useRef, useEffect, useCallback } from "react";
import Pikaday from "pikaday";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCard } from "../../actions/CardActions";

const DueDatePopover = ({ close }) => {
  const cardId = useParams().id;
  const card = useSelector(state => state.cards).find(card => card._id === cardId);
  const dateInput = useRef(null);
  const calendar = useRef(null);
  const dispatch = useDispatch();
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const newDueDate = {
      cardId,
      card: {
        dueDate: moment(picker.current.getDate(), "M/D/YYYY").toISOString(),
      },
    };
    return newDueDate;
    // console.log(picker.current.getDate(), newDueDate.card.dueDate);
  }, [cardId, dispatch])

  useEffect(() => {
    dispatch(updateCard(cardId, ))
  }, []);

  const removeDueDate = (event) => {
    event.preventDefault();
    const newDueDate = {
      cardId,
      card: {
        dueDate: null,
      },
    };

    const defaultMoment = useCallback(() => {
      if (props.dueDate) {
        return moment(props.dueDate);
      } else {
        const time = moment().add(1, "day");
        time.set({
          hour: 12,
          minute: 0,
          second: 0,
        });
        return time;
      }
    }, [props.dueDate]);

    const defaultDate = useCallback(() => {
      defaultMoment().toDate();
    }, [defaultMoment]);
    useEffect(() => {
      const picker = new Pikaday({
        field: dateInput.current,
        bound: false,
        container: calendar.current,
        firstDay: 1,
        yearRange: 10,
        defaultDate: defaultDate(),
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
            "December",
          ],
          weekdays: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          weekdaysShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        },
        keyboardInput: false,
        toString(date, format) {
          return moment(date).format(format);
        },
      });
      picker.show();
    }, [defaultDate]);



  return (
    <>
      <header>
        <span>Change due date</span>
        <a href="#" className="icon-sm icon-close" onClick={close}></a>
      </header>
      <div className="content">
        <form>
          <div className="datepicker-select">
            <div className="datepicker-select-date">
              <label>
                Date
                <input
                  type="text"
                  placeholder="Enter date"
                  autoFocus
                  ref={dateInput}
                />
              </label>
            </div>
            <div className="datepicker-select-time">
              <label>
                Time
                <input type="text" placeholder="Enter time" value="12:00" readOnly />
              </label>
            </div>
            <div id="calendar-widget" ref={calendar}></div>
          </div>
          <button className="button" type="submit" onClick={handleDateChange}>
            Save
          </button>
          <button
            className="button red-button"
            type="reset"
            onClick={removeDueDate}
          >
            Remove
          </button>
        </form>
      </div>
    </>
  );
};

export default DueDatePopover;
