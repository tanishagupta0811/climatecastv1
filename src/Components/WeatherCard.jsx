
import React, { useEffect, useState } from 'react'
import { useDate } from '../utils/useDate'
import sun from '../assets/icons/sun.png'
import cloud from '../assets/icons/cloud.png'
import fog from '../assets/icons/fog.png'
import rain from '../assets/icons/rain.png'
import snow from '../assets/icons/snow.png'
import storm from '../assets/icons/storm.png'
import wind from '../assets/icons/windy.png'

const WeatherCard = ({
  temperature,
  windspeed,
  humidity,
  place,
  heatIndex,
  iconString,
  conditions,
}) => {
 
  const [unit, setUnit] = useState('Celsius');
  const [temperatureValue, setTemperatureValue] = useState(temperature);
  const [icon, setIcon] = useState(sun)
  const { time } = useDate()

  
  useEffect(() => {
    if (unit === 'Celsius') {
      setTemperatureValue(temperature);
    } else {
      setTemperatureValue(((temperatureValue * 9) / 5 + 32).toFixed(2)); // Convert Celsius to Fahrenheit
    }
    
  }, [unit, temperature]);

  const toggleUnit = () => {
    setUnit(unit === 'Celsius' ? 'Fahrenheit' : 'Celsius');
  };


  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes('cloud')) {
        setIcon(cloud)
      } else if (iconString.toLowerCase().includes('rain')) {
        setIcon(rain)
      } else if (iconString.toLowerCase().includes('clear')) {
        setIcon(sun)
      } else if (iconString.toLowerCase().includes('thunder')) {
        setIcon(storm)
      } else if (iconString.toLowerCase().includes('fog')) {
        setIcon(fog)
      } else if (iconString.toLowerCase().includes('snow')) {
        setIcon(snow)
      } else if (iconString.toLowerCase().includes('wind')) {
        setIcon(wind)
      }
    }
  }, [iconString])

  return (
    <div className='w-[22rem] min-w-[22rem] h-[40rem] glassCard  p-4'>
      <div className='flex w-full just-center, items-center gap-4 mb-2 mt-12 '>
          {/* <img src={icon} alt="weather_icon" />
          <p className='font-bold text-5xl flex justify-center items-center' >{temperature} &deg;C</p> */}
          <img src={icon} alt="weather_icon" />
      <p className='font-bold text-5xl flex justify-center items-center'>{temperatureValue}&deg;{unit.charAt(0)}</p>
      </div>
      <div className='font-bold flex justify-center items-center'>
      <button onClick={toggleUnit} className='ml-2 focus:outline-none bg-blue-500 text-white px-3 py-1 rounded-md'>Switch</button>
    </div>
      <div className='font-bold text-center text-xl'>
        {place}
      </div>
      <div className='w-full flex justify-between items-center mt-4'>
        <p className='flex-1 text-center p-2'>{new Date().toDateString()}</p>
        <p className='flex-1 text-center p-2'>{time}</p>
      </div>
      <div className='w-full flex justify-between items-center mt-4 gap-4'>
        <p className='flex-1 text-center p-2 font-bold bg-blue-600 shadow rounded-lg'>Wind Speed <p className='font-normal'>{windspeed} km/h</p></p>
        <p className='flex-1 text-center p-2 font-bold rounded-lg bg-green-600'>Humidity <p className='font-normal'>{humidity} gm/m&#179;</p></p>
      </div>
      <div className='w-full p-3 mt-4 flex justify-between items-center'>
        <p className='font-semibold text-lg'>Heat Index</p>
        <p className='text-lg'>{heatIndex ? heatIndex : 'N/A'}</p>
      </div>
      <hr className='bg-slate-600' />
      <div className='w-full p-4 flex justify-center  items-center text-3xl font-semibold'>
        {conditions}
      </div>
    </div>
  )
}

export default WeatherCard