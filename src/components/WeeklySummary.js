import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const WeeklySummary = ({ hours }) => {
  const [weeklyHours, setWeeklyHours] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    generateWeeklySummary();
  }, [hours]);

  const generateWeeklySummary = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Segunda-feira
    
    const summary = [];
    let totalHours = 0; // Inicializa como número
    for (let i = 0; i < 6; i++) { // Segunda a Sábado
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
      const isoDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      
      const workedHours = Number(hours[isoDate]) || 0; // Converte para número
      totalHours += workedHours; // Soma corretamente
      
      summary.push({ date: formattedDate, hours: workedHours });
    }
    summary.push({ date: "Total Horas da Semana", hours: totalHours }); // Adiciona o total corretamente
    
    setWeeklyHours(summary);  
  };

  const formattedSummary = weeklyHours.map(({ date, hours }) => `${date}: ${hours} horas`).join("\n");
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedSummary);
    alert("Resumo copiado para a área de transferência!");
  };

  const sendByEmail = () => {
    const formattedSummary = weeklyHours
      .map(({ date, hours }) => `${date}: ${hours} horas`)
      .join("\n");
  
    const templateParams = {
      to_name: "Empresa",
      message: formattedSummary, // Certifique-se de que o template do EmailJS usa {{message}}
      from_name: "Sebastião Fernando",
    };
  
    emailjs.send("service_3ndrwzp", "template_ks6gyjq", templateParams, "vzHQwwv7kQkTWPgA0")
      .then(() => alert("Resumo enviado com sucesso!"))
      .catch(error => alert("Erro ao enviar o e-mail: " + error.text));
  };
  

  return (
    <div className="weekly-summary-container">
      <button onClick={() => setIsVisible(!isVisible)}>📅 Mostrar resumo semanal</button>
      {isVisible && (
        <div className="weekly-summary">
          <h2>Resumo Semanal</h2>
          <ul>
            {weeklyHours.map(({ date, hours }) => (
              <li key={date}>{date}: {hours} horas</li>
            ))}
          </ul>
          <button onClick={copyToClipboard}>📋 Copiar</button>
          <button onClick={sendByEmail}>📧 Enviar por E-mail</button>
        </div>
      )}
    </div>
  );
};

export default WeeklySummary;
