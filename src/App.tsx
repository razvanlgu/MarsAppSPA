import React, {Dispatch, SetStateAction, useContext, useState} from 'react';
import logo from './nasa-logo.png';
import './App.css';

const MyContext = React.createContext({
    data: 0,
    setData: (data: number) => {data = 0}
});


function App() {
    const nasaArticle: ArticleWithPhotoData = {
        title: "NASA",
        paragraph1: "The National Aeronautics and Space Administration (NASA; /ˈnæsə/) is an independent agency of the United States Federal Government responsible for the civilian space program, as well as aeronautics and space research.",
        paragraph2: "NASA was established in 1958, succeeding the National Advisory Committee for Aeronautics (NACA). The new agency was to have a distinctly civilian orientation, encouraging peaceful applications in space science.[8][9][10] Since its establishment, most US space exploration efforts have been led by NASA, including the Apollo Moon landing missions, the Skylab space station, and later the Space Shuttle. NASA is supporting the International Space Station and is overseeing the development of the Orion spacecraft, the Space Launch System, and Commercial Crew vehicles. The agency is also responsible for the Launch Services Program, which provides oversight of launch operations and countdown management for uncrewed NASA launches.",
        imgSrc: "./nasa-logo.png"
    }
    const ls = localStorage;
    ls.setItem("count", "0");

    const [data, setData] = useState(0);

  return (
      <MyContext.Provider value={{data, setData}}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
            <body>
                <ButtonCounter/>
                <ArticleWithPhoto title={nasaArticle.title} paragraph1={nasaArticle.paragraph1} paragraph2={nasaArticle.paragraph2} imgSrc={nasaArticle.imgSrc}/>
            </body>
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


const ButtonCounter: React.FC = () => {
    // const clickCountString = localStorage.getItem("count")
    // let clickCount: number;
    // if (clickCountString == null) {
    //     clickCount = 0;
    // } else {
    //     clickCount = parseInt(clickCountString)
    // }
    // const [noClicks, setNoClicks] = useState(clickCount);

    const context = useContext(MyContext);

    return (
        <div>
            <button onClick={() => context.setData(context.data + 1)}> Click me!!! </button>
            <p> The button was clicked {context.data} times! </p>
        </div>
    );
}

export default App;
