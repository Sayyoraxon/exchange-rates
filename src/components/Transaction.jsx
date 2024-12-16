import React, { useState } from 'react'
import TransactionForm from './ui/TransactionForm'
import { Chart } from 'chart.js'

const Transaction = ({value}) => {

  const [transactions, setTransactions] = useState(localStorage.getItem('transactions') ? JSON.parse(localStorage.getItem('transactions')) : [])


  return (
    <div>
      <TransactionForm transactions={transactions} setTransactions={setTransactions} value={value}/>
      
    </div>
  )
}

export default Transaction