import { nanoid } from "nanoid";
import { create } from "zustand";
import { CubeState } from "./types";

export const useCubeStore = create<CubeState>((set) => ({
    cubes: [{id: nanoid(), position: [0, 0.5, -10]}],
    addCube: (x, y, z) => 
        set((state) => ({
        cubes: [
            ...state.cubes, 
            { id: nanoid(), position: [x, y, z] }
        ],
    })),
    removeCube: (id) =>
        set((state) => ({
            cubes: state.cubes.filter((c) => c.id !== id),
        })),
}));