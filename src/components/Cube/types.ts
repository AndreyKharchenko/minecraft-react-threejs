export interface CubeProps {
    position: [number, number, number];
}

export interface CubeData {
  id: string;
  position: [number, number, number];
}

export interface CubeState {
  cubes: CubeData[];
  addCube: (x: number, y: number, z: number) => void;
}