
import { useEffect, useState } from "react";
import coldbg from "./assets/Coldbg.jpg";
import Descriptions from "./components/Descriptions";
import hotbg from "./assets/Hotbg.jpg";
import { getFormattedWeatherData } from "./weatherService";


function App() {
  
  const [city, setCity] = useState("Bangalore");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotbg);

  useEffect(()=>{
    
    const fetchWeatherData = async ()=>{

    
   
    const data = await getFormattedWeatherData(city, units);
  //  console.log(data)
  setWeather(data);
   const threshold = units === 'metric' ? 20 : 60; 
     if(data.temp <=threshold) setBg(coldbg)
     else setBg(hotbg)
    };
    fetchWeatherData();
  },[units, city])

  const handleUnitsClick=(e) => {

    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    // console.log(currentUnit);

    const isCelsius = currentUnit === 'C';
    button.innerText = isCelsius ? '°F' : '°C'
    setUnits(isCelsius ? 'metric' : "imperial");
 
  };

  const enterKeyPressed = (e) =>{
     if(e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
     }
  }



  return (
    <div className="app" style={{backgroundImage: `url(${bg})
    `}}>

      <div className="overlay">
        {
          weather && (
            <div className="container">
          <div className="section section__inputs">
            <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder="Enter city... " />
            <button onClick={(e) => handleUnitsClick(e)}>°F</button>
          </div>

          <div className="section section__temperature">
            <div className="icon">
              <h1>{`${weather.name}, ${weather.country}`}</h1>

              <img src={weather.iconURL}
               alt="weatherIcon"/>           
               <h3>{weather.description}</h3>
                </div>

                <div className="temperature">
                  <h1>{`${weather.temp.toFixed()} °${units === 'metric' ? 'C': 'F' }`}</h1>
                </div>
          </div>

          {/* {button discription} */}

          <Descriptions weather={weather} units={units} />


        </div>

          )
        }
        

      </div>



    
       


    </div>
    
  );
}

export default App;
