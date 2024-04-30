import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const StateContext = createContext();

// eslint-disable-next-line react/prop-types
export const StateContextProvider = ({ children }) => {
  const [weather, setweather] = useState([]);
  const [values, setValues] = useState([]);
  const [place, setPlace] = useState("Allahabad");
  const [location, setLocation] = useState("");

  const fetchWeather = async () => {
    const options = {
      method: "GET",
      url: "https://visual-crossing-weather.p.rapidapi.com/forecast",
      params: {
        aggregateHours: "24",
        location: place,
        contentType: "json",
        unitGroup: "metric",
        shortColumnNames: 0,
      },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPIDKEY,
        "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      const thisData = Object.values(response.data.locations)[0];
      setLocation(thisData.address);
      setValues(thisData.values);
      setweather(thisData.values[0]);
    } catch (e) {
      console.error(e);
      // if error on api
      alert("This place does not exist");
      setPlace("Allahabad");
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [place]);

  useEffect(() => {
    console.log("Values:", values);
  }, [values]);

  return (
    <StateContext.Provider
      value={{
        weather,
        setPlace,
        values,
        location,
        place,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
