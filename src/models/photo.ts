export interface PhotoResponse {
    photos: Photo[]
}

export interface Photo {
    id: number;
    sol: string;
    camera: object;
    img_src: string;
}