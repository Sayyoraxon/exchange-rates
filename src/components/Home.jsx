import React, { useEffect, useState } from 'react'
import Currency from './ui/Currency'
import Convertation from './ui/Convertation'
import axios from 'axios';
import Transaction from './Transaction';

const Home = () => {

  const API_KEY = '671302fea11e3a07a01b742d';
  const BASE_URL = 'https://v6.exchangerate-api.com/v6';

  const [rates, setRates] = useState({});
  const [value, setValue] = useState()

  useEffect(() => {

    axios
      .get(`${BASE_URL}/${API_KEY}/latest/UZS`)
      .then((response) => {
        setRates(response.data.conversion_rates)
        setValue(Math.floor(1 / response.data.conversion_rates.USD))
      })
      .catch((error) => console.error(error));


  }, [])


  return (
    <div className='pt-5'>
        <h1 className='text-center'>
            Valyutalar kursi
        </h1>
        <div className='mt-5 row px-4'>
           <Currency/> 
           <div className='col-md-4 my-4'>
              <Convertation rates={rates} value={value} setValue={setValue}/>
           </div>
        </div>
        <Transaction value={value} />
    </div>
  )
}

export default Home