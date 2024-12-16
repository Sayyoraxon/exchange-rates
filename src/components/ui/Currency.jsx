import React, { useEffect, useState } from 'react'
import axios from "axios";

const Currency = () => {
  const API_KEY = '671302fea11e3a07a01b742d';
  const BASE_URL = 'https://v6.exchangerate-api.com/v6';

  const [rates, setRates] = useState({});
  const [openAll, setOpenAll] = useState(false)

  useEffect(() => {

    axios
      .get(`${BASE_URL}/${API_KEY}/latest/UZS`)
      .then((response) => setRates(response.data.conversion_rates))
      .catch((error) => console.error(error));
  }, [])

  const arrRates = rates && Object.keys(rates)




  return (
    <div className='col-md-8'>

      <div className='row p-3 border-bottom border-primary'>
        <p className='col m-0 fw-bold'>
          Valyutaning nomi
        </p>
        <p className='col m-0 fw-bold'>
          Valyuta kursi
        </p>
      </div>

    {arrRates.reverse().map((key, index) => (
       (key==="USD" || key==="EUR" || key==="RUB" || key==="GBP" || key==="CHF" || key==="JPY" ) &&
      <div key={index} className={`row p-3 border-bottom hover-box`}>
        <p className='col m-0'> 
          {key}
        </p>
        <p className='col m-0'>
          {Math.floor(1 / rates[key])}
        </p>
      </div>     
      ))}

      {!openAll && <button onClick={()=>setOpenAll(!openAll)}
      className='my-4 btn btn-primary'>
         Barcha kurslar
      </button>}

      {openAll && arrRates.reverse().map((key, index) => (
       index!==0 && (key!=="USD" || key!=="EUR" || key!=="RUB" || key!=="GBP" || key!=="CHF" || key!=="JPY" ) &&
      <div key={index} className={`row p-3 border-bottom hover-box`}>
        <p className='col-sm-6 m-0'> 
          {key}
        </p>
        <p className='col-sm-6 m-0'>
          {Math.floor(1 / rates[key])}
        </p>
      </div>      
      ))}
     
    </div>
  )
}

export default Currency