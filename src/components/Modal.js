import React from "react";

const Calendar = ({
  selectedDate,
  inputValue,
  setInputValue,
  onSave,
  onClose,
}) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-header">Registrar horas - {selectedDate}</h3>
        <input
          type="text"
          className="modal-input"
          placeholder="Horas"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="modal-footer">
          <button className="modal-button save" onClick={onSave}>
            Salvar
          </button>
          <button className="modal-button cancel" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
