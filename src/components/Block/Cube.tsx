import { useBox } from '@react-three/cannon'
import React, { useState } from 'react'
import { Mesh, TextureLoader } from 'three';
import { CubeProps } from './types';

export const Cube = ({position}: CubeProps) => {
    const [hover, setHover] = useState<number | null>(null);
    const dirtTexture = new TextureLoader().load("/textures/dirt.jpg");

    const [ref] = useBox<Mesh>(() => ({
        type: "Static",
        position,
    }))

    return (
        <mesh 
            ref={ref}
            onPointerMove={(e) => {
                e.stopPropagation();
                if (e.faceIndex === undefined) return;
                setHover(Math.floor(e.faceIndex / 2))
            }}
            onPointerOut={(e) => {
                setHover(null);
            }}
        >
            {[...Array(6)].map((_, index) => (
                <meshStandardMaterial 
                    attach="material"
                    map={dirtTexture}
                    key={index}
                    color={hover === index ? "grey" : "white"}
                />
            ))}
            <boxBufferGeometry attach="geometry" args={[1,1,1]} />
        </mesh>
    )
}