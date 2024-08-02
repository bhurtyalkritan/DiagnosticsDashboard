import React, { useState, useEffect } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import cosineSimilarity from 'compute-cosine-similarity';

const responses = [
  `UDS is a diagnostic protocol used in ECUs in automotive electronics, specified in ISO 14229-1. It enables communication with vehicle control units for diagnostics and firmware updates.`,
  `Tesla's core values include sustainability, innovation, and improving life quality through technology by developing electric vehicles and renewable energy solutions.`,
  `Elon Musk founded SpaceX in 2002 with the goal of reducing space transportation costs to enable the colonization of Mars.`,
  `Tesla's Odin service handles vehicle maintenance. It communicates with Tesla's main server to manage firmware updates and diagnostics.`,
  `Fact: Tesla cars have advanced self-driving capabilities with Autopilot and Full Self-Driving (FSD) features, using cameras, sensors, and radar.`,
  `Tesla is committed to accelerating the world's transition to sustainable energy with electric cars, solar energy, and integrated renewable energy solutions.`,
  `The Autopilot feature in Tesla cars uses a combination of cameras, radar, ultrasonic sensors, and powerful onboard software to provide advanced driver assistance.`,
  `Tesla's Gigafactories are designed to significantly reduce battery cell costs and produce batteries at large scale to support vehicle production and energy storage products.`,
  `SpaceX's Falcon Heavy is the most powerful operational rocket in the world by a factor of two, capable of lifting nearly 64 metric tons into orbit.`,
  `Tesla's Model S, Model 3, Model X, and Model Y are the key vehicles in its lineup, offering varying degrees of range, performance, and features.`,
  `Tesla's Full Self-Driving (FSD) package aims to provide true autonomous driving capabilities through continuous software updates and neural network improvements.`,
  `Elon Musk also leads Neuralink, a company focused on developing brain-machine interface technology to help humans interact with computers and AI.`,
  `Tesla's energy products include solar panels, solar roofs, and the Powerwall, a home battery system that stores energy for backup power and self-consumption.`,
  `SpaceX aims to make space travel more affordable and accessible with its reusable rocket technology, significantly reducing the cost of launching satellites and cargo.`,
];

const vectorizeText = (text, allWords) => {
  const textWords = text.toLowerCase().split(' ');
  return allWords.map((word) => (textWords.includes(word) ? 1 : 0));
};

const HandleQuery = ({ steps, triggerNextStep }) => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (response) return; // Ensure response is generated only once

    const userInput = steps.userInput.value.toLowerCase();
    const allWords = Array.from(new Set([...userInput.split(' '), ...responses.join(' ').toLowerCase().split(' ')]));

    const userVector = vectorizeText(userInput, allWords);
    let bestResponse = responses[0];
    let maxSimilarity = -1;

    responses.forEach((resp) => {
      const responseVector = vectorizeText(resp, allWords);
      const similarity = cosineSimilarity(userVector, responseVector);
      if (similarity > maxSimilarity) {
        maxSimilarity = similarity;
        bestResponse = resp;
      }
    });

    setResponse(bestResponse);
    triggerNextStep();
  }, [response, steps, triggerNextStep]);

  return response ? <div>{response}</div> : null;
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
    waitAction: true,
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
