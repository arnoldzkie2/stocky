/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import Image from 'next/image';
interface Stock {
  stock: {
    x: number,
    y: number
  }[]
  symbol: string;
}

const App = () => {

  const get1DayStock = async () => {

    try {

      const res = await fetch('https://min-api.cryptocompare.com/data/v2/histominute?fsym=BTC&tsym=GBP&limit=1439')

      const data = await res.json()

      const formatData = data.Data.Data.map((item: any) => ({
        x: item.time * 1000,
        y: item.close
      }))

      const stockData: Stock = {
        stock: formatData,
        symbol: 'BTC'
      }
      return stockData

    } catch (error) {

      console.error(error);

    }
  }

  const fetchAllCoins = async () => {

    try {

      const res = await fetch('https://min-api.cryptocompare.com/data/all/coinlist')

      const data = await res.json()

      const dataArray = Object.values(data.Data);

      setAllcoins(dataArray)

    } catch (error) {

      console.error(error);

    }
  }

  const [allCoins, setAllcoins] = useState<any>([])

  const [stock, setStock] = useState<Stock>({ stock: [{ x: 0, y: 0 }], symbol: '' })
  
  const [searchQuery, setSearchQuery] = useState('btc')

  const filterCoins = allCoins.filter((item: any) => item.Symbol.toUpperCase().includes(searchQuery.toUpperCase()))

  useEffect(() => {
    get1DayStock()
    fetchAllCoins()
  }, [])

  const lastY = stock.stock[stock.stock.length - 1].y;

  const firstY = stock.stock[0].y;

  const color = lastY - firstY > 0 ? '#26C281' : '#ed3419'

  return (
    <div className='w-[50rem] flex flex-col gap-20'>
      {stock.symbol && stock.stock.length > 0 && <Chart options={{
        xaxis: {
          type: 'datetime',
          labels: {
            datetimeUTC: false
          }
        },
        tooltip: {
          x: {
            format: 'MMM HH:mm'
          }
        },
        chart: {
          id: stock.symbol,
          animations: {
            speed: 1000
          }
        },
        title: {
          text: stock?.symbol,
          align: 'center'
        },
        colors: [color],
      }}
        series={[
          {
            data: stock.stock,
            name: stock.symbol
          }
        ]}
        type='area'
      />}
      <div>
      <input type="text" placeholder='Search Coins' value={searchQuery} onChange={(e: any) => setSearchQuery(e.target.value)} />
        <ul>
          {filterCoins && filterCoins.length > 0 && filterCoins.map((item: any) => (
            <li key={item.Id} className='flex items-center gap-3'>
              <img src={`https://www.cryptocompare.com/${item.ImageUrl}`} alt={item.CoinName} width={30} height={30} loading='lazy' />
                <div>
                {item.FullName}
                </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App