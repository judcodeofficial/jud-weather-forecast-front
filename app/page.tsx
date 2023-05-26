'use client'
import { useEffect, useState, Suspense } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import useSWR from 'swr';

import WeatherForecasts from './components/WeatherForecasts';
import Loading from './loading';
import Error from './errors';

const apiBaseUrl = 'http://localhost:8000/api/';
const getCitiesEndpoint = 'GetCitiesList';
const getForecastByCityKeyEndpoint = 'GetForecastByCityKey/';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const [currentLocationName, setCurrentLocationName] = useState([]);
  const [currentCityData, setCurrentCityData] = useState([]);
  const { data, error, isLoading } = useSWR(apiBaseUrl + getCitiesEndpoint, fetcher);

  const handleCitySelection = ({ target }) => {
    fetch(apiBaseUrl + getForecastByCityKeyEndpoint + target.value)
    .then((res) => res.json())
    .then((resp) => {
      if (resp.status == 'ok') {
        setCurrentLocationName(resp.data.locationName)
        setCurrentCityData(resp.data.DailyForecasts);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: resp.message,
        })
      }
    })
  }

  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Something went wrong!',
    })
  }

  if (isLoading) {
    return (<Loading />)
  }

  if (!data.status) {
    return (<Error message={'Error loading data from backend'}/>)
  }

  if (data.status != 'ok') {
    return (<Error message={data.message}/>)
  }

  if (data.status == 'ok' && data.data.Code != null) {
    return (<Error message={data.data.Message}/>)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-24">
      <div className={'mb-5'}>
        <h1 className={'font-oswald text-4xl uppercase'}>Jud Weather APP</h1>
        <h6 className="font-comme text-gray-500 text-center">Please select a city</h6>
      </div>

      <div className={'flex flex-col items-center gap-2'}>
        <select className={'block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-jud-secondary focus:ring-blue-500 focus:border-blue-500 dark:bg-jud-secondary dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-oswald text-xl w-96 text-center'} id="countrySelectionBox" onChange={handleCitySelection}>
          {
            data.data.map((city) => (
              <option key={city.Key} value={city.Key}
              >{city.LocalizedName}</option>
            ))
          }
        </select>
        <label className={'text-gray-600 font-comme'} htmlFor="countrySelectionBox">5-day weather forecasts</label>
      </div>

      <div className={''}>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <WeatherForecasts locationName={currentLocationName} data={currentCityData}/>
        </div>
      </div>

      <div className={'text-center text-gray-500 w-full bg-jud-secondary py-5 font-comme'}>
        Made with some cups of
        <FontAwesomeIcon icon={ faMugHot } className={'mx-2'}/>
        by Julian Cabrera
      </div>
    </main>
  )
}
