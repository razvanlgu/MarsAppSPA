export interface RoverResponse {
    rovers: Rover[]
}

export interface Rover {
    id: number;
    name: string;
    cameras: Camera[];
}

export interface Camera {
    id: number;
    name: string;
}