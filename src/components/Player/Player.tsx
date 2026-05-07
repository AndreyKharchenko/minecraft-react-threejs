import { useSphere } from '@react-three/cannon'
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react'
import { Mesh, Raycaster, Vector2, Vector3 } from 'three';
import { usePlayerControls } from '../../hooks';
import { PointerLockControls } from '../PointerLockControls';
import { PlayerProps } from './types';

const SPEED = 5;

export const Player = ({onHit}: PlayerProps) => {
    const { camera, scene } = useThree();
    const { moveForward, moveBackward, moveLeft, moveRight, jump } = usePlayerControls();
    const [ref, api] = useSphere<Mesh>(() => ({
        mass: 1,
        type: "Dynamic",
        position: [0, 10, 0],
    }));

    const velocity = useRef<number[]>([0, 0, 0]);
    const position = useRef<Vector3>(new Vector3(0, 0, 0));

    // raycast (луч)
    const raycaster = useRef(new Raycaster());
    const hitRef = useRef<any>(null);

    // physics subscriptions
    useEffect(() => {
        const unsubVel = api.velocity.subscribe((v) => {
            velocity.current = v;
        });

        const unsubPos = api.position.subscribe((v) => {
            position.current = new Vector3(v[0], v[1], v[2]);
        });

        return () => {
            unsubVel();
            unsubPos();
        };
    }, [api]);

    useEffect(() => {
        const onClick = () => {
            const hit = hitRef.current;
            if (!hit) return;
            onHit?.(hit);
        };

        window.addEventListener('click', onClick);
        return () => window.removeEventListener('click', onClick);
    }, [onHit]);

    // useFrame срабатывает на каждый кадр
    // Перерасчет позиции и Находим пересечения
    useFrame(() => {
        camera.position.copy(position.current);

        // raycast (луч) из камеры через центр экрана
        raycaster.current.setFromCamera(new Vector2(0, 0), camera);
        // ищем пересечения
        const hits = raycaster.current.intersectObjects(scene.children, true);
        // обновляем hitRef каждый frame
        hitRef.current = hits[0] ?? null;
        
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

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation);

        api.velocity.set(direction.x, velocity.current[1], direction.z);

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