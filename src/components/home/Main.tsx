/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";

interface Stock {
    stock: {
        x: number,
        y: number
    }[]
    symbol: string;
}


const Main = () => {

    const [stockName, setStockName] = useState('BTC')

    const [stockHistory, setStockHistory] = useState(1)

    const stockList = ['BTC', 'LTC', 'BNB', 'ETH', 'DOGE']

    const [stock, setStock] = useState<Stock>({ stock: [{ x: 0, y: 0 }], symbol: '' })

    const get1DayStock = async () => {

        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}histominute?fsym=${stockName}&tsym=USD&limit=1399`)

            const formatData = data.Data.Data.map((item: any) => ({
                x: item.time * 1000,
                y: [item.open, item.high, item.low, item.close]
            }))

            console.log(formatData);

            const stockData: Stock = {
                stock: formatData,
                symbol: stockName
            }

            setStock(stockData)

        } catch (error) {

            console.error(error);

        }
    }

    const get7DayStock = async () => {

        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}histohour?fsym=${stockName}&tsym=USD&limit=167`)

        const formatData = data.Data.Data.map((item: any) => ({
            x: item.time * 1000,
            y: [item.open, item.high, item.low, item.close]
        }))

        const stockData: Stock = {
            stock: formatData,
            symbol: stockName
        }

        setStock(stockData)

    }

    const get30DayStock = async () => {

        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}histohour?fsym=${stockName}&tsym=USD&limit=719`)

        const formatData = data.Data.Data.map((item: any) => ({
            x: item.time * 1000,
            y: [item.open, item.high, item.low, item.close]
        }))

        const stockData: Stock = {
            stock: formatData,
            symbol: stockName
        }

        setStock(stockData)

    }

    const get1YearStock = async () => {

        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}histoday?fsym=${stockName}&tsym=USD&limit=364`)

        const formatData = data.Data.Data.map((item: any) => ({
            x: item.time * 1000,
            y: [item.open, item.high, item.low, item.close]
        }))

        const stockData: Stock = {
            stock: formatData,
            symbol: stockName
        }

        setStock(stockData)

    }

    useEffect(() => {

        if (stockHistory === 1) {

            get1DayStock()

        } else if (stockHistory === 7) {

            get7DayStock()

        } else if (stockHistory === 30) {

            get30DayStock()

        } else if (stockHistory === 365) {

            get1YearStock()
        }


    }, [stockName, stockHistory])

    const lastY = stock?.stock[stock.stock.length - 1].y;

    const firstY = stock?.stock[0].y;

    const color = firstY! - lastY! > 0 ? '#26C281' : '#ed3419'

    return (
        <main className=' bg-[url(/bg.svg)] w-screen h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-5 sm:px-10 md:px-16b lg:px-24 xl:px-36 2xl:px-44'>
            <div className='flex items-center justify-between w-full gap-20'>
                <div className='flex flex-col text-white gap-6'>
                    <h1 className='text-3xl sm:text-4xl lg:text-5xl'>Stocky an Trading App</h1>
                    <h2 className='text-slate-200 leading-7'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, atque reiciendis sed error a dolor voluptate eaque perferendis exercitationem recusandae cum fugiat quas. Labore saepe, cupiditate placeat fugiat deserunt officia?</h2>
                    <button className='bg-slate-950 shadow border border-yellow-200 shadow-yellow-200 py-2.5 w-1/4 rounded-3xl text-white'>Get Started</button>
                </div>
                <div className='flex flex-col items-center gap-5'>
                    <div className='w-[45rem] bg-slate-800 shadow-2xl shadow-yellow-300 rounded-3xl'>
                        {stock?.symbol && stock.symbol.length > 0 ? <Chart options={{
                            xaxis: {
                                type: 'datetime',
                                labels: {
                                    datetimeUTC: false,
                                    style: {
                                        colors: '#FFF'
                                    }
                                }
                            },
                            yaxis: {
                                labels: {
                                    style: {
                                        colors: '#FFF'
                                    }
                                },
                            },
                            tooltip: {
                                x: {
                                    format: 'MMM dd HH:mm'
                                }
                            },
                            chart: {
                                id: stock.symbol,
                                animations: {
                                    speed: 1000
                                },
                            },
                            plotOptions: {
                                candlestick: {
                                    colors: {
                                        upward: '#26C281',
                                        downward: '#ed3419'
                                    }
                                }
                            },
                            title: {
                                text: stock?.symbol,
                                align: 'center',
                                style: {
                                    fontSize: '20px',
                                    color: '#FFF'
                                }
                            },
                            colors: [color],
                        }
                        }
                            series={[
                                {
                                    data: stock.stock,
                                    name: stock.symbol
                                }
                            ]}
                            type='candlestick'
                        /> :
                            <div className='w-[45rem] flex items-center justify-center h-[29rem] animate-pulse bg-slate-950 shadow-2xl shadow-yellow-300 rounded-3xl'>
                                <div className='text-white flex items-center gap-3'>
                                    <div className='bg-none border-2 w-6 h-6 relative rounded-full animate-spin flex items-center justify-center'>
                                        <div className='absolute bg-slate-950 top-0 w-4 h-4'></div>
                                    </div>
                                    Processing...
                                </div>
                            </div>
                        }
                    </div>
                    <ul className='flex items-center gap-10'>
                        {stockList.map(item => (
                            <li key={item}
                                onClick={() => {
                                    setStock({ stock: [{ x: 0, y: 0 }], symbol: '' })
                                    setStockName(item)
                                }}
                                title={`${item} Price`}
                                className={`px-6 py-2 cursor-pointer rounded-3xl ${stockName === item ? 'bg-slate-950 shadow border border-yellow-200 shadow-yellow-200 text-white' : 'bg-white text-slate-950'}`}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                    <ul className='flex items-center gap-10'>
                        <li onClick={() => setStockHistory(1)} className={`px-5 cursor-pointer rounded-md py-1.5 ${stockHistory === 1 ? 'bg-yellow-300 text-white' : 'border bg-transparent text-white'}`}>1DAY</li>
                        <li onClick={() => setStockHistory(7)} className={`px-5 cursor-pointer rounded-md py-1.5 ${stockHistory === 7 ? 'bg-yellow-300 text-white' : 'border bg-transparent text-white'}`}>7DAYS</li>
                        <li onClick={() => setStockHistory(30)} className={`px-5 cursor-pointer rounded-md py-1.5 ${stockHistory === 30 ? 'bg-yellow-300 text-white' : 'border bg-transparent text-white'}`}>30DAYS</li>
                        <li onClick={() => setStockHistory(365)} className={`px-5 cursor-pointer rounded-md py-1.5 ${stockHistory === 365 ? 'bg-yellow-300 text-white' : 'border bg-transparent text-white'}`}>1YEAR</li>
                    </ul>
                </div>
            </div>
        </main>
    )
}

export default Main