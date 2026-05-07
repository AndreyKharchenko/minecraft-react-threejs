import { nanoid } from "nanoid";
import { create } from "zustand";
import { CubeState } from "./types";

export const useCubeStore = create<CubeState>((set) => ({
    cubes: [],
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