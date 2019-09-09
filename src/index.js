import React, { useState } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { utils } from './utils';

const daysOfTheWeek = [
    { day: 'Sunday', abr: 'S' },
    { day: 'Monday', abr: 'M' },
    { day: 'Tuesday', abr: 'T' },
    { day: 'Wednesday', abr: 'W' },
    { day: 'Thursday', abr: 'T' },
    { day: 'Friday', abr: 'F' },
    { day: 'Saturday', abr: 'S' }
];

const GoogleMiniCalendar = () => {
    // Declare state variables
    const [month, setMonth] = useState(moment().month());
    const [year, setYear] = useState(moment().year());

    // Creates an array for the whole month
    const daysOfMonth = utils.getDaysInMonth(month, year);

    // Split array into weeks
    const weeksArray = _.chunk(daysOfMonth, 7);

    const renderMiniCalendarDay = (day) => {
        const { date, outOfMonth } = day;
        return (
            <span
                key={date.valueOf()}
                className={`day ${outOfMonth ? 'outMonth' : ''} ${utils.isToday(date) ? 'today' : ''}`}
                onClick={() => {
                    if (outOfMonth) setMonth(new Date(date).getMonth());
                }}
            >
                {date.getDate()}
            </span>
        );
    };

    const renderMiniCalendarRow = (week, key) => {
        // Function to render each row of the month
        return (
            <div
                className="weekRow"
                key={`week-${key}`}
            >
                {_.map(week, day => renderMiniCalendarDay(day))}
            </div>
        );
    };

    return (
        <div className="miniCalendar">
            <div className="monthHeader">
                <p>{`${moment().month(month).format('MMMM')} ${year}`}</p>
                <div className="monthControls">
                    <img
                        alt="Arrow Up"
                        src="./keyboardArrowUp.svg"
                        style={{ width: 20, height: 20 }}
                        color="#666"
                        className="keyboardKey"
                        onClick={() => {
                            let newMonth = month;
                            newMonth += 1;
                            if (month === 11) {
                                newMonth = 0;
                                setYear(year + 1);
                            }
                            setMonth(newMonth);
                        }}
                    />
                    <img
                        alt="Arrow Down"
                        src="./keyboardArrowDown.svg"
                        style={{ width: 20, height: 20 }}
                        color="#666"
                        className="keyboardKey"
                        onClick={() => {
                            let newMonth = month;
                            newMonth -= 1;
                            if (month === 0) {
                                newMonth = 11;
                                setYear(year - 1);
                            }
                            setMonth(newMonth);
                        }}
                    />
                </div>
            </div>
            <div className="monthContent">
                <div className="weeks">
                    {_.map(daysOfTheWeek, ({ day, abr }) => <span key={day}>{abr}</span>)}
                </div>
                <div className="days">
                    {_.map(weeksArray, (week, key) => renderMiniCalendarRow(week, key))}
                </div>
            </div>
        </div>
    );
};

export default GoogleMiniCalendar;
