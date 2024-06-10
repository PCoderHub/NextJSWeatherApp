'use client';
import { Forecast, Weather } from "@/typings";
import { FormEvent, useEffect, useState } from "react";

function Form() {

  const [location, setLocation] = useState<string>('');
  const [weatherData, setWeatherData] = useState<Weather|null>(null);
  const [forecast, setForecast] = useState<Forecast|null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api?location=${location}`)
      const details = await response.json();
      console.log(details);
      setWeatherData(details.data);
      setForecast(details.forecast);
      setIsLoading(false);
    } catch(error) {
      console.log(error);
    }
  }

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();
    fetchWeatherData();
    setIsLoading(true);
    setLocation('');
  }

  return (
      <div className="flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit} className="rounded-lg shadow-md w-full max-w-md p-6 bg-[#faf7f7]">
          <p className="text-center p-2">Planning to go somewhere?<br/>Find their current weather conditions for a pleasant trip...</p>
          <div className="px-8">
            <label>Location</label>
            <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} className="mx-4 border" />
            <button type="submit" className="border bg-[#4256d6] text-[#ffffff] px-2 hover:bg-black">Enter</button>
          </div>
        </form>
        {isLoading ? <div className="flex justify-center items-center mt-6 p-6 bg-white rounded-lg shadow-md w-full max-w-md">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-blue-500"></span>
      </div> : <div className="mt-6 bg-[#faf7f7] p-6 rounded-lg shadow-md w-full max-w-md text-center">
          <h2 className="font-bold p-5">Current Weather Details</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Region
                </th>
              </tr>
            </thead>
            <tbody>
              {weatherData != undefined && 
              <tr className="bg-white">
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">{weatherData?.location.country}</td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">{weatherData?.location.name}</td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">{weatherData?.location.region}</td>
              </tr>}
            </tbody>
            </table>
          <h2 className="font-bold p-5">5 day forecast</h2>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Weather Condition
                </th>
              </tr>
            </thead>
            <tbody>
            {(forecast?.forecastday.length !== 0) && forecast?.forecastday.map((item) => {
              return (
              <tr key={forecast.forecastday.indexOf(item)} className="bg-white">
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">{item?.date}</td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">{item.hour[0].condition.text}</td>
              </tr>
              );
            })}
            </tbody>
            </table>
          </div>
        </div>}
      </div>
  )
}

export default Form;
