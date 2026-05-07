import { Physics } from '@react-three/cannon';
import { Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Intersection, Vector3 } from 'three';
import React from "react";
import { Camera, CrossHair, Ground, Cube, Player } from './components';
import './App.css';
import { useCubeStore } from './store';

function App() {
  const cubes = useCubeStore((state) => state.cubes);
  const addCube = useCubeStore((state) => state.addCube);
  const onHit = (hit: Intersection) => {
    const obj = hit.object;
    const normal = hit.face?.normal;

    if (!normal) return;

    // координата блока, на который нажали
    const x = obj.position.x;
    const y = obj.position.y;
    const z = obj.position.z;

    addCube(
      x + normal.x,
      y + normal.y,
      z + normal.z
    );
  }
  return (
    <div className="game">
      <Canvas shadows gl={{ alpha: false }}>
        <Camera />
        <Sky sunPosition={new Vector3(100, 10, 100)} />
        {/* Рассеянное освещение */}
        <ambientLight intensity={0.3} />
        {/* Точечное освещение */}
        <pointLight 
          castShadow
          intensity={0.8}
          position={[100, 100, 100]}
        />
        <Physics gravity={[0, -30, 0]}>
          <Ground />
          <Player onHit={onHit} />
          {
            cubes.map((cube) => (<Cube key={cube.id} position={cube.position} />))
          }
        </Physics>
      </Canvas>

      <CrossHair />
    </div>
  );
}

export default App;
