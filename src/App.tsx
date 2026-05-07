import { Physics } from '@react-three/cannon';
import { Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Vector3 } from 'three';
import React from "react";
import { Camera, CrossHair, Ground } from './components';
import './App.css';
import { useCubeStore } from './store';

function App() {
  const cubes = useCubeStore((state) => state.cubes);
  const addCube = useCubeStore((state) => state.addCube);
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
          {/* <Player 
            onHit={(hit) => {
              const obj = hit.object;
              const point = hit.point;
              const normal = hit.face?.normal;

              if (!normal) return;

              // координата блока, на который нажали
              const x = Math.round(point.x);
              const y = Math.round(point.y);
              const z = Math.round(point.z);
              console.log("onHit", {x, y, z});

              addCube(
                x + normal.x,
                y + normal.y,
                z + normal.z
              );
            }}
          />
          <Cube position={[0, 0.5, -10]} />
          {
            cubes.map((cube) => (<Cube key={cube.id} position={cube.position} />))
          } */}
        </Physics>
      </Canvas>

      <CrossHair />
    </div>
  );
}

export default App;
