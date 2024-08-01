import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const VehicleModel = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.y += 0.01; 
  });

  return <primitive ref={ref} object={scene} scale={0.1} />;
};

const VehicleDisplay = ({ modelPath }) => {
  return (
    <Canvas style={{ height: '400px', width: '100%' }} camera={{ position: [5, 2, 50] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <VehicleModel modelPath={modelPath} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

export default VehicleDisplay;
