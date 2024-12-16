import React, { useRef, useState } from "react";
import Chart from "./Chart";
import FilterForm from "./FilterForm";

function TransactionForm({ transactions, setTransactions, value }) {

  const [amount, setAmount] = useState()
  const [category, setCategory] = useState("oziq-ovqat")
  const [date, setDate] = useState()
  const [note, setNote] = useState()
  const [type, setType] = useState()





  const handleSubmit = (e) => {
    e.preventDefault()
    setTransactions([...transactions, { amount: amount, category: category, date: Date.parse(date), note: note, type: type }])
    localStorage.setItem('transactions', JSON.stringify([...transactions, { amount: amount, category: category, date: Date.parse(date), note: note, type: type }]))
    setAmount("")
    setCategory("")
    setDate("")
    setNote("")
    setType("")
  };

  const totalIncome = transactions && transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  // Xarajatlarni hisoblash
  const totalExpense = transactions && transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);



  return (
    <>
      <div className="row mx-4">
        <div className="p-4 border rounded bg-white col-md-6">
          <h3 className="px-4 my-4 text-center">
            Moliyaviy tranzaksiyalarni kiritish
          </h3>
          <form onSubmit={handleSubmit} className="d-flex flex-column p-4">
            <input className="my-2 bg-light border py-1 px-2 rounded"
              type="number"
              name="amount"
              placeholder="Miqdor"
              onChange={(e) => { setAmount(e.target.value) }}
              value={amount}
              required
            />
            <select className="my-4 bg-light border py-1 px-2 rounded"
              onChange={(e) => { setCategory(e.target.value) }}
              value={category}
              required>
              <option value="oziq-ovqat">oziq-ovqat</option>
              <option value="transport">transport</option>
              <option value="xo'jalik">xo'jalik</option>
              <option value="kommunal hizmatlar">kommunal hizmatlar</option>
              <option value="ta'lim">ta'lim</option>
              <option value="uy-joy ijarasi">uy-joy ijarasi</option>
              <option value="sog'liqni saqlash">sog'liqni saqlash</option>
              <option value="ko'ngilochar">ko'ngilochar</option>
              <option value="ish haqi">ish haqi</option>
              <option value="boshqa">boshqa</option>
            </select>
            <input className="bg-light border py-1 px-2 rounded"
              type="date"
              name="date"
              onChange={(e) => { setDate(e.target.value) }}
              value={date}
              required
            />
            <textarea className="my-4 bg-light border py-1 px-2 rounded"
              name="note"
              placeholder="Izoh"
              onChange={(e) => { setNote(e.target.value) }}
              value={note}
            ></textarea>
            <select name="type" className="bg-light border py-1 px-2 rounded"
              onChange={(e) => { setType(e.target.value) }}
              value={type}>
              <option value="income">Daromad</option>
              <option value="expense">Xarajat</option>
            </select>
            <button type="submit" className="my-5 btn btn-primary">Qo‘shish</button>
          </form>
          {transactions &&
          <div className="px-4">
            <h6>Daromad: {totalIncome} so'm - ${(totalIncome * 1 / value).toFixed(2)}</h6>
          <h6>Xarajat: {totalExpense} so'm - ${(totalExpense * 1 / value).toFixed(2)}</h6>
          <h6>Balans: {totalIncome - totalExpense} so'm - ${((totalIncome - totalExpense) * 1 / value).toFixed(2)}</h6>
          </div>}
        </div>
        <div className="col-md-6">
          {transactions.length !== 0 && <Chart transactions={transactions} />}

        </div>
      </div>
      <FilterForm transactions={transactions} value={value} />
    </>
  );
}

export default TransactionForm;
