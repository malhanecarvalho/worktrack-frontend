import React, { useState, useEffect } from "react";
import Calendar from "../components/Calendar";
import Modal from "../components/Modal";

const Main = () => {
  const [hours, setHours] = useState(() => {
    const savedHours = localStorage.getItem("hours");
    return savedHours ? JSON.parse(savedHours) : {};
  });
  const [totalSalary, setTotalSalary] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("hours", JSON.stringify(hours));
    calculateSalary();
  }, [hours]);

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setInputValue(hours[date] || "");
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setHours({ ...hours, [selectedDate]: inputValue });
    setIsModalOpen(false);
  };

  const calculateSalary = () => {
    const totalHours = Object.values(hours).reduce(
      (sum, h) => sum + Number(h || 0),
      0
    );
    setTotalSalary(totalHours * 9);
  };

  return (
    <main className="content">
      <section className="page">
        <h1 className="page__title">Olá, Fernando!😊</h1>
        <Calendar hours={hours} onDayClick={handleDayClick} />
        <h2 className="page__salary">
          Valor a receber: €{totalSalary.toFixed(2)}
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
      </section>
    </main>
  );
};

export default Main;
