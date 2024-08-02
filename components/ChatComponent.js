import React, { useState, useEffect } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const responses = [
  `UDS is a diagnostic protocol used in ECUs in automotive electronics, specified in ISO 14229-1. It enables communication with vehicle control units for diagnostics and firmware updates.`,
  `Tesla's core values include sustainability, innovation, and improving life quality through technology by developing electric vehicles and renewable energy solutions.`,
  `Elon Musk founded SpaceX in 2002 with the goal of reducing space transportation costs to enable the colonization of Mars.`,
  `Tesla's Odin service handles vehicle maintenance. It communicates with Tesla's main server to manage firmware updates and diagnostics.`,
  `Fact: Tesla cars have advanced self-driving capabilities with Autopilot and Full Self-Driving (FSD) features, using cameras, sensors, and radar.`
];

const HandleQuery = ({ steps }) => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    setResponse(<div>{randomResponse}</div>);
  }, []);

  return <div>{response}</div>;
};

const steps = [
  {
    id: '1',
    message: 'What would you like to see?',
    trigger: 'userInput',
  },
  {
    id: 'userInput',
    user: true,
    trigger: 'handleQuery',
  },
  {
    id: 'handleQuery',
    component: <HandleQuery />,
    asMessage: true,
    trigger: '1',
  },
];

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#00B2FF',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#00B2FF',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};


const ChatComponent = ({ visible, onClose }) => (
    <div style={{
      position: 'fixed',
      bottom: visible ? '20px' : '-100%',
      right: '20px',
      transition: 'bottom 0.3s',
      zIndex: 1000,
      width: '350px',
    }}>
      <ThemeProvider theme={theme}>
        <div style={{ position: 'relative', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px', overflow: 'hidden' }}>
          <button
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'red',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              cursor: 'pointer',
              zIndex: 1001,
            }}
            onClick={onClose}
          >
            X
          </button>
          <ChatBot steps={steps} />
        </div>
      </ThemeProvider>
    </div>
  );
  
  export default ChatComponent;