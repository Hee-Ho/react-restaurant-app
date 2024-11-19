import React, { useState } from 'react';
import "./checkout.css"

const DialogueBox = ({ onSubmit, onClose }) => {
  const [selectedOption, setSelectedOption] = useState('0');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(selectedOption);
    // Close the dialogue box
    onClose()
  };

  return (
    <>
    <div className="modal-overlay" ></div>
    <div className="dialogue-box">
      <h2>Choose A Pickup Time</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="radio"
            value='0'
            checked={selectedOption === '0'}
            onChange={handleOptionChange}
          />
          Immediate Pickup
        </label>
        <label>
          <input
            type="radio"
            value='1'
            checked={selectedOption === '1'}
            onChange={handleOptionChange}
          />
          Pickup Later
        </label>
        <div>
            <button onClick={handleSubmit}>Submit Order</button>
        </div>
        <div className='cancel'>
            <button onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default DialogueBox;
