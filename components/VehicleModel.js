import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stars } from '@react-three/drei';
import { Howl } from 'howler';
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import * as THREE from 'three';

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

const Fireworks = ({ position }) => {
  const ref = useRef();
  const particles = useRef([]);
  const [geometry] = useState(() => new THREE.BufferGeometry());
  const [material] = useState(() => new THREE.PointsMaterial({ size: 0.2, color: 'red' }));

  useEffect(() => {
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions.set([Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1], i * 3);
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  }, [geometry]);

  useFrame(() => {
    particles.current.forEach((particle, i) => {
      particle.position.x += (Math.random() - 0.5) * 0.1;
      particle.position.y += (Math.random() - 0.5) * 0.1;
      particle.position.z += (Math.random() - 0.5) * 0.1;
    });
  });

  return <points ref={ref} geometry={geometry} material={material} position={position} />;
};

const VehicleModel = ({ modelPath, position }) => {
  const { scene } = useGLTF(modelPath);
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
      ref.current.position.x = position.x;
    }
  });

  return <primitive ref={ref} object={scene} scale={0.13} />;
};

const VehicleDisplay = ({ modelPath }) => {
  const [isRainbow, setIsRainbow] = useState(false);
  const [carPosition, setCarPosition] = useState({ x: 0 });
  const [isLudicrousMode, setIsLudicrousMode] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);

  const sounds = {
    honk: new Howl({
      src: [soundPaths.honk],
      onend: () => {
        setCurrentSound(null);
      },
    }),
    ludicrous: new Howl({
      src: [soundPaths.ludicrous],
      onend: () => {
        setCurrentSound(null);
      },
    }),
    iceCream: new Howl({
      src: [soundPaths.iceCream],
      onend: () => {
        setCurrentSound(null);
      },
    }),
  };

  const handleHonk = () => playSound('honk');
  const handleLudicrous = () => {
    playSound('ludicrous');
    setIsLudicrousMode(true);
    setShowFireworks(true);
  };
  const handleIceCream = () => playSound('iceCream');
  const handleRainbow = () => setIsRainbow(!isRainbow);

  const playSound = (sound) => {
    if (currentSound) {
      currentSound.stop();
    }
    sounds[sound].play();
    setCurrentSound(sounds[sound]);
    setTimeout(() => {
      sounds[sound].stop();
      setCurrentSound(null);
    }, 5000); // Stop the sound after 5 seconds
  };

  useEffect(() => {
    if (isLudicrousMode) {
      let start = Date.now();
      const duration = 2000; // duration of the animation in milliseconds
      const distance = 100; // increased distance to move

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
          setShowFireworks(false);
        }
      };

      animate();
    }
  }, [isLudicrousMode]);

  return (
    <div className={isRainbow ? 'rainbow-bg' : ''} style={{ position: 'relative', height: '400px', width: '100%', backgroundColor: 'black' }}>
      <Canvas camera={{ position: [5, 2, 50] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <VehicleModel modelPath={modelPath} position={carPosition} />
          {showFireworks && <Fireworks position={[carPosition.x, 2, 0]} />}
        </Suspense>
        <OrbitControls />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
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
