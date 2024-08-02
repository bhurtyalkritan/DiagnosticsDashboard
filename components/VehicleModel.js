import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Howl } from 'howler';
import { Button } from '@mui/material';
import { styled } from '@mui/system';


const soundPaths = {
  honk: '/carhorn.mp3',
  ludicrous: '/ludicrous.mp3',
  iceCream: '/icecream.mp3',
};

const HonkButton = styled(Button)({
  position: 'absolute',
  top: '10px',
  right: '10px',
  zIndex: 1000,
});

const EasterEggButton = styled(Button)({
  position: 'absolute',
  top: '60px',
  right: '10px',
  zIndex: 1000,
});

const VehicleModel = ({ modelPath, position }) => {
  const { scene } = useGLTF(modelPath);
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
      ref.current.position.x = position.x;
    }
  });

  return <primitive ref={ref} object={scene} scale={0.1} />;
};

const VehicleDisplay = ({ modelPath }) => {
  const [isRainbow, setIsRainbow] = useState(false);
  const [carPosition, setCarPosition] = useState({ x: 0 });
  const [isLudicrousMode, setIsLudicrousMode] = useState(false);

  const sounds = {
    honk: new Howl({ src: [soundPaths.honk] }),
    ludicrous: new Howl({ src: [soundPaths.ludicrous] }),
    iceCream: new Howl({ src: [soundPaths.iceCream] }),
  };

  const handleHonk = () => sounds.honk.play();
  const handleLudicrous = () => {
    sounds.ludicrous.play();
    setIsLudicrousMode(true);
  };
  const handleIceCream = () => sounds.iceCream.play();
  const handleRainbow = () => setIsRainbow(!isRainbow);

  useEffect(() => {
    if (isLudicrousMode) {
      let start = Date.now();
      const duration = 2000; // duration of the animation in milliseconds
      const distance = 40; // distance to move

      const animate = () => {
        const timeElapsed = Date.now() - start;
        const progress = timeElapsed / duration;
        const newPosition = distance * (progress < 0.5 ? progress * 2 : (1 - progress) * 2);

        setCarPosition({ x: progress < 0.5 ? -newPosition : newPosition });

        if (timeElapsed < duration) {
          requestAnimationFrame(animate);
        } else {
          setIsLudicrousMode(false);
          setCarPosition({ x: 0 });
        }
      };

      animate();
    }
  }, [isLudicrousMode]);

  return (
    <div style={{ position: 'relative', height: '400px', width: '100%' }}>
      <Canvas camera={{ position: [5, 2, 50] }} className={isRainbow ? 'rainbow-bg' : ''}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <VehicleModel modelPath={modelPath} position={carPosition} />
        </Suspense>
        <OrbitControls />
      </Canvas>
      <HonkButton variant="contained" color="primary" onClick={handleHonk}>
        Honk
      </HonkButton>
      <EasterEggButton variant="contained" color="secondary" style={{ top: '60px' }} onClick={handleLudicrous}>
        Ludicrous Mode
      </EasterEggButton>
      <EasterEggButton variant="contained" color="secondary" style={{ top: '110px' }} onClick={handleIceCream}>
        Ice Cream
      </EasterEggButton>
      <EasterEggButton variant="contained" color="secondary" style={{ top: '160px' }} onClick={handleRainbow}>
        Rainbow
      </EasterEggButton>
      <style>
        {`
          .rainbow-bg {
            animation: rainbow 5s infinite;
          }

          @keyframes rainbow {
            0% { background-color: red; }
            16% { background-color: orange; }
            32% { background-color: yellow; }
            48% { background-color: green; }
            64% { background-color: blue; }
            80% { background-color: indigo; }
            100% { background-color: violet; }
          }
        `}
      </style>
    </div>
  );
};

export default VehicleDisplay;
