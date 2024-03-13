import { useState } from "react";

export const WeatherApp = () => {
  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "1b4461e7684bba3a13f6d0affe56a68b";
  const difKelvin = 273.15;

  const [ciudad, setCiudad] = useState("");
  const [dataClima, setDataClima] = useState(null);

  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ciudad.length > 0) fetchClima();
  };

  const fetchClima = async () => {
    try {
      const responde = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`);
      const data = await responde.json();
      setDataClima(data);
    } catch (error) {
      console.error("Ocurrio un problema");
    }
  };

  return (
    <>
      <div className="container">
        <h1>Aplicacion del Clima</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={ciudad} onChange={handleCambioCiudad} />
          <button type="submit">Buscar</button>
        </form>
        {dataClima && (
          <div>
            <h2>{dataClima.name}</h2>
            <p>Temepratura: {parseInt(dataClima?.main?.temp - difKelvin)}°C</p>
            <p>Condición Metereológica: {dataClima.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}
            />
          </div>
        )}
      </div>
    </>
  );
};
