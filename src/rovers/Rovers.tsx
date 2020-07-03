import React, {CSSProperties, useEffect, useState} from 'react';
import Select, {ActionMeta, ValueType} from 'react-select';
import axios, {AxiosResponse} from "axios";
import {Camera, Rover, RoverResponse} from "../models/rover";
import {Photo, PhotoResponse} from "../models/photo";

const x: CSSProperties = {paddingLeft: 50, paddingRight: 50, width: "auto"};
const y: CSSProperties = {display: "inline-flex", width: "auto"}
const z: CSSProperties = {width: 500};

interface PageData {
    rovers: string[];
    cameras: string[];
    selectedRover: string;
    selectedCamera: string;
    camerasLoading: boolean;
    photosUrls: string[];
}

const initialState: PageData = {
    rovers: [],
    cameras: [],
    selectedRover: "",
    selectedCamera: "",
    camerasLoading: false,
    photosUrls: [],
}

async function getRovers() {
    return await axios.get("http://localhost:8000/rovers");
}

async function getPhotos(rover: string, camera: string) {
    return await axios.get(`http://localhost:8000/rovers/${rover}/photos/${camera}`)
}

export const RoversPage: React.FC = () => {
    const [state, setState] = useState<PageData>(initialState);


    useEffect(() => {
        getRovers().then(
            (response: AxiosResponse<RoverResponse>) => {
                console.log(response.data)
                const roversArray: Rover[] = response.data.rovers;
                setState({...state,
                rovers: roversArray.map((rover: Rover) => rover.name)})
            }
        );
    },[])

    function updateCameras(rover: string) {
        getRovers().then(
            (response: AxiosResponse<RoverResponse>) => {
                const roversArray: Rover[] = response.data.rovers;
                const filteredroversArray = roversArray.filter((r: Rover) => r.name === rover);
                const camerasArray = filteredroversArray[0].cameras.map((camera: Camera) => camera.name);
                setState({...state,
                    selectedRover: rover,
                    selectedCamera: "",
                    cameras: camerasArray})
                console.log(camerasArray)
            }
        );
    }

    function createOptions(list: string[]) {
        return list.map((rover: string) => {
            return {value: rover, label: rover}
        })
    }

    function handleSelectRover(newValue: ValueType<any>, actionMeta: ActionMeta<any>) {
            console.log(newValue)
            if (actionMeta.action === 'select-option') {
                // console.log("OPTION SELECTED")
                setState({...state,
                    cameras: [],
                    selectedCamera: "",
                    camerasLoading: true,
                    selectedRover: newValue.value})
                updateCameras(newValue.value)
            } else if (actionMeta.action === 'clear') {
                // console.log("REMOVED VALUE")
                setState({...state,
                    selectedRover: "",
                    cameras: [],
                    selectedCamera: ""})
            }
    }

    function handleSelectCamera(newValue: ValueType<any>, actionMeta: ActionMeta<any>) {
        console.log(newValue)
        if (actionMeta.action === 'select-option') {
            setState({...state,
                selectedCamera: newValue.value})
        } else if (actionMeta.action === 'clear') {
            setState({...state,
                selectedCamera: ""})
        }
    }

    function placeHolderCamera() {
        if (state.selectedRover.length > 0) {
            return "Select camera" + state.selectedRover
        } else {
            return "Select a rover first" + state.selectedRover
        }
    }

    function createValueCamera() {
        if (state.selectedCamera.length > 0) {
            return {value: state.selectedCamera, label: state.selectedCamera}
        } else {
            return null;
        }
    }
    
    function handleSubmitPhotoButton() {
        getPhotos(state.selectedRover, state.selectedCamera).then(
            (respone: AxiosResponse<PhotoResponse>) => {
                const photosArray = respone.data.photos;
                const photosUrlsArray = photosArray.map((photo: Photo) => photo.img_src)
                console.log(photosArray);
                setState({...state,
                    photosUrls: photosUrlsArray})
            }
        )
    }

    function computePhotos() {
        const photos: JSX.Element[] = [];
        for (let i = 0; i < 5 && i < state.photosUrls.length; i++) {
            const imgUrl = state.photosUrls[i];
            photos.push(<img src={imgUrl} height={150}/>);
        }
        if (photos.length > 0) {
            return photos;
        } else if (state.selectedCamera.length > 0 && state.selectedRover.length > 0) {
            return <h1> There are no photos :( </h1>;
        }
        return photos;
    }

    return (
        <div style={x}>
            <p>{state.rovers}</p>
            <div style={y}>
                <div style={z}>
                    <Select
                        label="Single select"
                        isClearable
                        isSearchable={false}
                        options={createOptions(state.rovers)}
                        onChange={handleSelectRover}
                        isLoading={state.rovers.length === 0}
                        placeholder="Select rover"
                    />
                </div>
                <div style={z}>
                    <Select
                        label="Single select"
                        isClearable
                        isSearchable={false}
                        options={createOptions(state.cameras)}
                        onChange={handleSelectCamera}
                        isLoading={state.camerasLoading}
                        placeholder={placeHolderCamera()}
                        value={createValueCamera()}
                    />
                </div>
            </div>
            <div>
                <button
                    disabled={state.selectedRover.length === 0 || state.selectedCamera.length === 0}
                    onClick={handleSubmitPhotoButton}
                >
                    SUBMIT
                </button>
            </div>
            <div style={{paddingTop: 50}}>
                {computePhotos()}
            </div>
        </div>
    );
}
