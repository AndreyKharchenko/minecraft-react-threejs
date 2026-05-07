import { Physics } from '@react-three/cannon';
import { Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Vector3 } from 'three';
import { Camera, CrossHair, Cube, Ground, Player, useCubeStore } from './components';
import './App.css';

function App() {
  const cubes = useCubeStore((state) => state.cubes);
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
          <Player />
          <Cube position={[0, 0.5, -10]} />
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
