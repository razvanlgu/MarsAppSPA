import React, {Dispatch, SetStateAction, useContext, useState} from 'react';
import './App.css';

interface MyContextData {
    data: number;
    setData: (data: number) => void;
}

const MyContext = React.createContext<MyContextData>({} as MyContextData);

function App() {
    const nasaArticle: ArticleWithPhotoData = {
        title: "NASA",
        paragraph1: "The National Aeronautics and Space Administration (NASA; /ˈnæsə/) is an independent agency of the United States Federal Government responsible for the civilian space program, as well as aeronautics and space research.",
        paragraph2: "NASA was established in 1958, succeeding the National Advisory Committee for Aeronautics (NACA). The new agency was to have a distinctly civilian orientation, encouraging peaceful applications in space science.[8][9][10] Since its establishment, most US space exploration efforts have been led by NASA, including the Apollo Moon landing missions, the Skylab space station, and later the Space Shuttle. NASA is supporting the International Space Station and is overseeing the development of the Orion spacecraft, the Space Launch System, and Commercial Crew vehicles. The agency is also responsible for the Launch Services Program, which provides oversight of launch operations and countdown management for uncrewed NASA launches.",
        imgSrc: "./nasa-logo.png"
    }

    const [data, setData] = useState(0);

  return (
      <MyContext.Provider value={{data, setData}}>
        <div className="App">
            <ButtonCounter/>
            <TextAndNumber text="Here is how many times you pressed the button."/>
            <ArticleWithPhoto {...nasaArticle}/>
        </div>
      </MyContext.Provider>
  );
}

interface ArticleWithPhotoData {
    title: string
    paragraph1: string
    paragraph2: string
    imgSrc: string
}

const ArticleWithPhoto: React.FC<ArticleWithPhotoData> = (props) => {
    return (
      <div>
          <h1>{props.title}</h1>
          <p>{props.paragraph1}</p>
          <p>{props.paragraph2}</p>
          <img src={props.imgSrc}/>
      </div>
    );
}


interface Text {
    text: string;
}

const TextAndNumber: React.FC<Text> = (props) => {
    return (
        <div>
            <MyTextBox text={props.text}/>
            <MyNumber/>
        </div>
    );
}

const ButtonCounter: React.FC = () => {
    const context = useContext(MyContext);

    return (
        <div>
            <button onClick={() => context.setData(context.data + 1)}> Click me!!! </button>
        </div>
    );
}

const MyTextBox: React.FC<Text> = (props) => {
    return (
        <p>{props.text}</p>
    );
}

const MyNumber: React.FC = () => {
    const context = useContext(MyContext);

    return (
      <div>{context.data}</div>
    );
}

export default App;
