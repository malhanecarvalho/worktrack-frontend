import React from "react";

const Calendar = ({ hours, onDayClick, selectedMonth, setSelectedMonth }) => {
  const renderCalendar = () => {
    const [year, month] = selectedMonth.split("-").map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();

    const monthNames = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const isSunday = new Date(year, month - 1, day).getDay() === 0;

      days.push(
        <div
          key={date}
          onClick={() => onDayClick(date)}
          className={`calendar-day ${isSunday ? "sunday" : "workday"}`}
        >
          <div>{day}</div>
          <div className="hours">
            {hours[date] ? `${hours[date]} hr` : "--"}
          </div>
        </div>
      );
    }

    return (
      <div className="calendar-container">
        <div className="calendar-month-navigation">
          <button className="calendar-button" onClick={() => changeMonth(-1)}>◀️</button>
          <h2 className="calendar-header">
            {monthNames[month - 1]} {year}
          </h2>
          <button className="calendar-button" onClick={() => changeMonth(1)}>▶️</button>
        </div>
        <div className="calendar-grid">
          {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
            <div key={d} className="calendar-day-header">{d}</div>
          ))}
          {days}
        </div>
      </div>
    );
  };

  const changeMonth = (offset) => {
    const [year, month] = selectedMonth.split("-").map(Number);
    const newDate = new Date(year, month - 1 + offset, 1);
    setSelectedMonth(`${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, "0")}`);
  };

  return <>{renderCalendar()}</>;
};

export default Calendar;