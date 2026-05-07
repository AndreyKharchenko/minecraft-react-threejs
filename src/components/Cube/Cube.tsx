import { useBox } from '@react-three/cannon'
import { nanoid } from 'nanoid';
import React, { useState } from 'react'
import { Mesh, TextureLoader } from 'three';
import { create } from 'zustand';
import { CubeProps, CubeState } from './types';

export const useCubeStore = create<CubeState>((set) => ({
    cubes: [],
    addCube: (x, y, z) => 
        set((state) => ({
        cubes: [
            ...state.cubes, 
            { id: nanoid(), position: [x, y, z] }
        ],
    })),
}));

export const Cube = ({position}: CubeProps) => {
    const [hover, setHover] = useState<number | null>(null);
    const addCube = useCubeStore((state) => state.addCube);
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
            onClick={
                (e) => {
                    e.stopPropagation();
                    if (e.faceIndex === undefined) return;
                    if (ref.current) {
                        const faceIndex = Math.floor(e.faceIndex / 2);
                        const { x, y, z } = ref.current?.position;

                        switch(faceIndex) {
                            case 4: {
                                addCube(x, y, z + 1)
                                return
                            }
                            case 2: {
                                addCube(x, y + 1, z)
                                return
                            }
                            case 1: {
                                addCube(x - 1, y, z)
                                return
                            }
                            case 5: {
                                addCube(x, y, z - 1)
                                return
                            }
                            case 3: {
                                addCube(x, y - 1, z)
                                return
                            }
                            default: {
                                addCube(x + 1, y, z)
                                return
                            }
                        }
                    }
                }
            }
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