import React from 'react';
import { format } from 'date-fns';

export default function WeatherInfo({ currentStats, prevStats }) {
  let temperatureDir = '';
  let humidityDir = '';
  let pressureDir = '';

  if (prevStats) {
    if (currentStats.temperature > prevStats.temperature) temperatureDir = '⬆';
    if (currentStats.temperature < prevStats.temperature) temperatureDir = '⬇';
    if (currentStats.humidity > prevStats.humidity) humidityDir = '⬆';
    if (currentStats.humidity < prevStats.humidity) humidityDir = '⬇';
    if (currentStats.pressure > prevStats.pressure) pressureDir = '⬆';
    if (currentStats.pressure < prevStats.pressure) pressureDir = '⬇';
  }

  const date = format(new Date(currentStats.timestamp * 1000), 'MM/dd H:mm')

  return (
    <>
      <h3>Weather on { date }</h3>
      <table>
        <tbody>
        <tr>
          <td>Temperature</td>
          <td>{ currentStats.temperature } C{temperatureDir}</td>
        </tr>
        <tr>
          <td>Humidity</td>
          <td>{ currentStats.humidity }%{humidityDir}</td>
        </tr>
        <tr>
          <td>Pressure</td>
          <td>{ currentStats.pressure } mmHg{pressureDir}</td>
        </tr>
        </tbody>
      </table>
    </>
  );
}
