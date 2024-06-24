import React, { useState } from 'react';
import './index.css';

function App() {
  const [name, setName] = useState('');
  const [XYZ_services, setXYZ_services] = useState('');
  const [message, setMessage] = useState('');

  const sendEmail = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, XYZ_services }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage('Email sent successfully!');
        console.log('Success:', result);
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.message}`);
        console.error('Error:', error);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">
          Send an Email Template using Postmark!
        </h2>
        <div>
          <label className="label">XYZ_services</label>
          <input
            type="text"
            value={XYZ_services}
            onChange={(e) => setXYZ_services(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label className="label">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
        </div>
        <button
          onClick={sendEmail}
          className="button"
        >
          Send Email
        </button>
        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
}

export default App;
