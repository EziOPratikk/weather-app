'use client';

import { useRef, useState, type ReactNode, Fragment } from 'react';

import Image from 'next/image';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { getRequest } from '@/utils/https';
import CustomSnackbar from './ui/CustomSnackbar';

import { type RawWeatherData } from '@/types/weather';
import { SnackbarType } from '@/types/snackbar';

type WeatherData = {
  icon: string;
  temperature: number;
  location: string;
  humidity: number;
  windSpeed: number;
};

export default function WeatherCard() {
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState<SnackbarType>();
  const [isLoading, setIsLoading] = useState(false);

  const textFieldRef = useRef<HTMLInputElement>(null);

  function displaySnackbar(
    message: string,
    severity: 'success' | 'warning' | 'error' | 'info'
  ) {
    setSnackbarContent({
      message,
      severity,
    });
    setIsSnackbarOpen(true);
    setTimeout(() => {
      setIsSnackbarOpen(false);
    }, 2000);
  }

  async function fetchWeatherData() {
    if (!textFieldRef.current?.value) return;

    setIsLoading(true);

    const cityName = textFieldRef.current.value;

    const url = `http://localhost:3000/api/weather?cityName=${cityName}`;

    try {
      const data = (await getRequest(url)) as RawWeatherData;

      if ('message' in data) {
        setIsLoading(false);
        displaySnackbar(data.message, 'error');
        return;
      }

      setWeatherData({
        location: data.name,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: data.weather[0].icon,
      });

      setIsLoading(false);
    } catch (error) {
      console.log('CATCH BLOCK()');
      setIsLoading(false);
      if (error instanceof Error) {
        displaySnackbar(error.message, 'error');
      } else {
        displaySnackbar(
          'Unexpected error occurred while fetching weather data!',
          'error'
        );
      }
    }
  }

  let weatherReportContent: ReactNode;

  if (weatherData) {
    weatherReportContent = (
      <Fragment>
        <Image
          src={`/images/weather-icons/${weatherData.icon}.png`}
          alt='weather-icon'
          width={150}
          height={150}
        />
        <Box>
          <h1>{weatherData.temperature.toFixed(0)}°C</h1>
          <h2>{weatherData.location}</h2>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Image
              src='/images/humidity.png'
              alt='weather-icon'
              width={40}
              height={40}
            />
            <Box>
              <p>{weatherData.humidity}%</p>
              <span>Humidity</span>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Image
              src='/images/wind-speed.png'
              alt='weather-icon'
              width={40}
              height={40}
            />
            <Box>
              <p>{weatherData.windSpeed} Km/h</p>
              <span>Wind Speed</span>
            </Box>
          </Box>
        </Box>
      </Fragment>
    );
  }

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: weatherData ? 'space-between' : 'center',
        alignItems: 'center',
        height: weatherData ? '35rem' : '5rem',
        width: '25rem',
        padding: '2rem',
        transition: 'height 0.3s ease-in-out',
      }}
    >
      <Box>
        {isLoading ? (
          <span>Checking with the clouds, one sec...☁️</span>
        ) : (
          <TextField
            id='location'
            label='Location'
            variant='standard'
            sx={{ marginRight: '0.5rem' }}
            autoComplete='off'
            inputRef={textFieldRef}
          />
        )}
        <IconButton aria-label='delete' size='large' onClick={fetchWeatherData}>
          <SearchIcon />
        </IconButton>
      </Box>
      {weatherReportContent}
      <CustomSnackbar
        message={snackbarContent?.message}
        severity={snackbarContent?.severity}
        open={isSnackbarOpen}
      />
    </Card>
  );
}
