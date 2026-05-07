import { usePlane } from '@react-three/cannon';
import React from 'react'
import { Mesh, RepeatWrapping, TextureLoader } from 'three';

export const Ground = () => {
  const [ref] = usePlane<Mesh>(() => ({
    rotation: [-Math.PI / 2, 0, 0]
  })) 
  const grassTexture = new TextureLoader().load("/textures/grass.jpg");
  grassTexture.wrapS = RepeatWrapping;
  grassTexture.wrapT = RepeatWrapping;
  grassTexture.repeat.set(240, 240);

  return (
    <mesh ref={ref} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        <meshStandardMaterial map={grassTexture} attach="material" />
    </mesh>
  )
}