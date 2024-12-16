import { Chart } from 'chart.js'
import React, { useState } from 'react'

const FilterForm = ({ transactions, value }) => {

  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [filteredTransactions, setFilteredTransactions] = useState()


  const filter = () => {
    const filteredtransactions = transactions.filter((i) => {
      return Date.parse(startDate) < i.date && Date.parse(endDate) > i.date
    })
    setFilteredTransactions(filteredtransactions)
  }

  const totalIncome = filteredTransactions && filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  // Xarajatlarni hisoblash
  const totalExpense = filteredTransactions && filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);



  return (
    <div className='p-4 row'>
      <h4 className='my-4 text-center'>
        Tranzaksiyalarni vaqt bo'yicha filterlash
      </h4>
    <div className='col-md-6'>
      <label className='my-5 d-flex justify-content-between'>
        Boshlanish sanasini tanlang
        <input type="date" onChange={(e) => setStartDate(e.target.value)} />
      </label>
      <label className='my-5 d-flex justify-content-between'>
        Yakunlanish sanasini tanlang
        <input type="date" onChange={(e) => setEndDate(e.target.value)} />
      </label>

      <button onClick={filter}
        className='my-2 btn btn-primary'>
        Filterlash
      </button>

    
    </div>
    { filteredTransactions ?
      <div className='py-5 col-md-6 px-4'>
      <h6>Daromad: {totalIncome} so'm - ${(totalIncome * 1 / value).toFixed(2)}</h6>
      <h6>Xarajat: {totalExpense} so'm - ${(totalExpense * 1 / value).toFixed(2)}</h6>
      <h6>Balans: {totalIncome - totalExpense} so'm - ${((totalIncome - totalExpense) * 1 / value).toFixed(2)}</h6>
      {
        filteredTransactions.map((t)=>(
          t.category === "oziq-ovqat" ?
          <p className='m-0'>Oziq-ovqat : {t.amount} so'm - {new Date(t.date).toLocaleDateString()}</p> :
          t.category === "transport" ?
          <p className='m-0'>Transport : {t.amount} so'm - {new Date(t.date).toLocaleDateString()}</p> :
          t.category === "xo'jalik" ?
          <p className='m-0'>xo'jalik : {t.amount} so'm - {new Date(t.date).toLocaleDateString()}</p> :
          t.category === "kommunal hizmatlar" ?
          <p className='m-0'>Kommunal-hizmatlar : {t.amount} so'm - {new Date(t.date).toLocaleDateString()}</p> :
          t.category === "ta'lim" ?
          <p className='m-0'>Ta'lim  : {t.amount} so'm - {new Date(t.date).toLocaleDateString()}</p> :
          t.category === "uy-joy ijarasi" ?
          <p className='m-0'>Uy-joy ijarasi : {t.amount} so'm - {new Date(t.date).toLocaleDateString()}</p> :
          t.category === "sog'liqni saqlash" ?
          <p className='m-0'>Sog'liqni saqlash : {t.amount} so'm - {new Date(t.date).toLocaleDateString()}</p> :
          t.category === "ko'ngilochar" ?
          <p>Ko'ngilochar : {t.amount} so'm - {new Date(t.date).toLocaleDateString()}</p> :
          t.category === "ish haqi" ?
          <p className='m-0'>Ish haqi : {t.amount} so'm - {new Date(t.date).toLocaleDateString()}</p> :
          t.category === "boshqa" ?
          <p className='m-0'>Boshqa : {t.amount} so'm - {new Date(t.date).toLocaleDateString()}</p> :
          <></>
        ))
      }
      </div> :
      <div className='py-5'>
        </div>}
    </div>
  )
}

export default FilterForm