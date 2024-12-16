import React, { useRef, useState } from 'react'

const Convertation = ({rates, value, setValue}) => {

    const [amount, setAmount] = useState(1)

    const baseRates = {}
   
    rates && Object.entries(rates).forEach(([key, value]) => {
        if(key === "USD" || key === "EUR" || key === "RUB" || key==="GBP" || key === "CHF" || key==="JPY"){
            baseRates[key] = value
        }
    });



  return (
    <div className='mx-lg-4 mx-md-0 p-4 border bg-white rounded'>
        <h2>
            Valyuta konvertori
        </h2>
        <div className='d-flex justify-content-between my-4'>
        <input  type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} className='px-1 w-75'/>
        {rates &&
        <select className='p-1' onChange={(e)=>{
            setValue(e.target.value)
        }}>
            {
                Object.keys(baseRates).reverse().map((key, index)=>(
                    <option key={index} value={Math.floor(1 / baseRates[key])}>
                        {key}
                    </option>
                ))
            }
        </select>}
        </div>
        <div className='d-flex justify-content-between py-1 px-2 rounded bg-light'>
            <p className='m-0'>{amount * value}</p>
            <p className='m-0'>UZS</p>
        </div>
    </div>
  )
}

export default Convertation