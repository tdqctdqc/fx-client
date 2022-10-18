import { useEffect, useRef, useState, useContext } from "react";
import './DateSelector.css';
function DateSelector({minDate, setDates}) {
    const today = getDateYYYYMMDD(new Date());
    const datePicker = useRef();
    const [date, setDate] = useState(today);
    const [numSnapshots, setNumSnapshots] = useState(10);
    const [daysPerInterval, setDaysPerInterval] = useState(1);
    useEffect(() => {
        const dates = [];
        for (let index = 0; index < numSnapshots; index++) {
            let newDate = new Date(date);
            newDate.setDate(newDate.getDate() - index * daysPerInterval);
            let newDateString = getDateYYYYMMDD(newDate);
            if(newDateString < minDate) break;
            dates.unshift(newDateString);
        }
        setDates(dates);
    }, [numSnapshots, daysPerInterval, date, minDate, setDates]);

    function getDateYYYYMMDD(date) {
        return date.toISOString().slice(0, 10);
    }
    
    return (
        <div className='date-selector card'>
            <label>
                End Date: 
                <input type='date' ref={datePicker} min={minDate} max={today} value={date}
                onChange={e => setDate(e.target.value)}></input>
            </label>
            <label> 
                Number of Snapshots:  
                <input type='number' min='1' max='20' value={numSnapshots}
                onChange={e => setNumSnapshots(e.target.value)}/>
            </label>
            <label> 
                Interval:  
                <input type='number' min='1' max='30' value={daysPerInterval}
                onChange={e => setDaysPerInterval(e.target.value)}/>
            </label>
        </div>
    );
}

export default DateSelector;