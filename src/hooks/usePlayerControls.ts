import { useEffect, useState } from "react";

const KEYS = {
    KeyW: "moveForward",
    KeyS: "moveBackward",
    KeyA: "moveLeft",
    KeyD: "moveRight",
    Space: "jump"
} as const;

type KeyCode = keyof typeof KEYS;

function moveFieldByKey(key: string) {
    if (key in KEYS) {
        return KEYS[key as KeyCode];
    }

    return null;
}

export const usePlayerControls = () => {
    const [movement, setMovement] = useState({
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        jump: false,
    });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const field = moveFieldByKey(e.code);
            if (field) {
                setMovement(state => ({
                    ...state,
                    [field]: true,
                }));
            }
        }

        const handleKeyUp = (e: KeyboardEvent) => {
            const field = moveFieldByKey(e.code);
            if (field) {
                setMovement(state => ({
                    ...state,
                    [field]: false,
                }));
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    return movement;
}