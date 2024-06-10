import { NextRequest, NextResponse } from "next/server";

export async function GET(request: any) {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');

    let url1 = '';
    let url2 = '';

    if(location) {
        url1 = `http://api.weatherapi.com/v1/current.json?key=c67be3fab9964b43bac221240240206&q=${location}&aqi=no`;
        url2 = `http://api.weatherapi.com/v1/marine.json?key=c67be3fab9964b43bac221240240206&q=${location}&days=5`;
    }

    const resp1 = await fetch(url1);
    const data = await resp1.json();
    const resp2 = await fetch(url2);
    const forecast = await resp2.json();
    return NextResponse.json({
        data, 
        forecast: forecast.forecast,
    });
}