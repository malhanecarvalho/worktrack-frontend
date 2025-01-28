import React, { useEffect } from "react";
import emailjs from "@emailjs/browser";

const Calendar = ({ hours, onDayClick }) => {
  const renderCalendar = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthNames = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      const isSunday = new Date(year, month, day).getDay() === 0;

      days.push(
        <div
          key={date}
          onClick={() => onDayClick(date)}
          className={`calendar-day ${isSunday ? "sunday" : "workday"}`}
        >
          <div>{day}</div>
          <div className="hours">
            {hours[date] ? `${hours[date]} hrs` : "---"}
          </div>
        </div>
      );
    }

    return (
      <div className="calendar-container">
        <h2 className="calendar-header">
          {monthNames[month]} {year}
        </h2>
        <div className="calendar-grid">
          {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
            <div key={d} className="calendar-day-header">
              {d}
            </div>
          ))}
          {days}
        </div>
      </div>
    );
  };

  const getWeeklySummary = () => {
    const today = new Date();
    const lastSunday = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    const lastWeek = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(lastSunday);
      date.setDate(lastSunday.getDate() + i);
      const formattedDate = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      lastWeek.push({
        date: formattedDate,
        hours: hours[formattedDate] || 0,
      });
    }

    return lastWeek;
  };

  const sendWeeklySummary = () => {
    const summary = getWeeklySummary();
    const formattedSummary = summary
      .map(({ date, hours }) => `${date}: ${hours} horas`)
      .join("\n");

    const templateParams = {
      to_name: "CJS",
      message: formattedSummary,
      from_name: "Sebastião Fernando",
    };

    emailjs
      .send(
        "service_3ndrwzp",
        "template_ks6gyjq",
        templateParams,
        "vzHQwwv7kQkTWPgA0"
      )
      .then(
        (response) => {
          alert("Resumo semanal enviado com sucesso!");
        },
        (error) => {
          console.error("Erro ao enviar o e-mail: ", error);
          alert("Falha ao enviar o resumo semanal.");
        }
      );
  };

  useEffect(() => {
    const today = new Date();
    if (today.getDay() === 0) {
      sendWeeklySummary();
    }
  }, [hours]);

  return <>{renderCalendar()}</>;
};

export default Calendar;
