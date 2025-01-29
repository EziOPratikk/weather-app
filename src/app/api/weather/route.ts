import { NextRequest, NextResponse } from 'next/server';

import { type RawWeatherData } from '@/types/weather';

export async function GET(req: NextRequest) {
  const cityName = req.nextUrl.searchParams.get('cityName');

  if (!cityName) {
    return NextResponse.json({
      message: 'City name is required',
    });
  }

  const openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${process.env.OPEN_WEATHER_API_KEY}`;

  const res = await fetch(openWeatherURL);

  if (!res.ok) {
    return NextResponse.json({
      message: 'Failed to fetch weather data',
    });
  }

  const data = (await res.json()) as RawWeatherData;

  return NextResponse.json(data);
}