import { useSphere } from '@react-three/cannon'
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react'
import { Mesh, Vector3 } from 'three';
import { usePlayerControls } from '../../hooks';
import { PointerLockControls } from '../PointerLockControls';

const SPEED = 5;

export const Player = () => {
    const { camera } = useThree();
    const { moveForward, moveBackward, moveLeft, moveRight, jump } = usePlayerControls();
    const [ref, api] = useSphere<Mesh>(() => ({
        mass: 1,
        type: "Dynamic",
        position: [0, 10, 0],
    }));

    const velocity = useRef<number[]>([0, 0, 0]);
    const pos = useRef<Vector3>(new Vector3(0, 0, 0));

    // Как это работает ?
    useEffect(() => {
        api.velocity.subscribe((v) => {
            velocity.current = v;
        });
    }, [api.velocity]);

    useEffect(() => {
        api.position.subscribe((v) => {
            pos.current = new Vector3(v[0], v[1], v[2])
        });
    }, [api.position]);

    // Перерасчет позиции
    // useFrame срабатывает на каждый кадр
    useFrame(() => {
        if (pos.current) {
            camera.position.copy(pos.current);
        }

        // Понять, почему не работает
        /* if (ref.current) {
            camera.position.copy(ref.current.position);
        } */
        
        
        // Направление движения
        const direction = new Vector3();

        const frontVector = new Vector3(
            0, 
            0, 
            Number(moveBackward) - Number(moveForward)
        );
        const sideVector = new Vector3(
            Number(moveLeft) - Number(moveRight),
            0,
            0
        );

        // Как это работает ?
        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation);

        api.velocity.set(direction.x, velocity.current[1], direction.z);

        // Как это работает ?
        if (jump && Math.abs(Number(velocity.current[1].toFixed(2))) < 0.05) {
            api.velocity.set(velocity.current[0], 10, velocity.current[2]);
        }
    })

    return (
        <>
            <PointerLockControls />
            <mesh ref={ref} />
        </>
    )
}