import React, { useState, useEffect } from "react";
import Calendar from "../components/Calendar";
import Modal from "../components/Modal";
import WeeklySummary from "./WeeklySummary";

const Main = () => {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });

  const [hours, setHours] = useState(() => {
    const savedHours = localStorage.getItem(`hours-${selectedMonth}`);
    return savedHours ? JSON.parse(savedHours) : {};
  });

  const [totalSalary, setTotalSalary] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedHours = localStorage.getItem(`hours-${selectedMonth}`);
    setHours(savedHours ? JSON.parse(savedHours) : {});
  }, [selectedMonth]);

  useEffect(() => {
    localStorage.setItem(`hours-${selectedMonth}`, JSON.stringify(hours));
    calculateSalary();
  }, [hours, selectedMonth]);

  const calculateSalary = () => {
    const totalHours = Object.values(hours).reduce(
      (sum, h) => sum + Number(h || 0),
      0
    );
    setTotalSalary(totalHours * 9);
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setInputValue(hours[date] || "");
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setHours({ ...hours, [selectedDate]: inputValue });
    setIsModalOpen(false);
  };

  return (
    <main className="content">
      <section className="page">
        <h1 className="page__title">Olá, Fernando!😊</h1>

        <Calendar
          hours={hours}
          onDayClick={handleDayClick}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />

        <h2 className="page__salary">
          💰 Valor a receber: €{totalSalary.toFixed(2)}
        </h2>

        {isModalOpen && (
          <Modal
            selectedDate={selectedDate}
            inputValue={inputValue}
            setInputValue={setInputValue}
            onSave={handleSave}
            onClose={() => setIsModalOpen(false)}
          />
        )}

        <WeeklySummary hours={hours} />
      </section>
    </main>
  );
};

export default Main;
