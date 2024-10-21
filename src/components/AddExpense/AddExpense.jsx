import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import styles from "./AddExpense.module.css";
import Button from "../Button/Button";

function AddExpense({
  setIsOpen,
  expensList,
  setExpenseList,
  balance,
  setBalance,
  editId,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState({
    title: "",
    category: "",
    price: "",
    date: "",
  });

  const handleChange = (e) => {
    const {name,value}=e.target
    setData((prev)=>({
      ...prev,[name]:value,
    }))
  };

  const handleEdit = (e) => {
    e.preventDefault()

    const updated=expensList.map(item => {
      if(item.id==editId){
        const priceDiff=item.price-Number(data.price)
        if(priceDiff<0 && Math.abs(priceDiff)>balance){
          enqueueSnackbar("Price should not exceed the wallet balance",{variant:"warning"})
          setIsOpen(false)
          return {...item}
        }
        setBalance(prev => prev+ priceDiff)
        return{...data,id: editId}

      }
      else{
        return item
      }
    })
    setExpenseList(updated)
    setIsOpen(false)
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (balance < Number(data.price)) {
      enqueueSnackbar("Price added should be less the wallet balance", {
        variant: "error",
      });
      setIsOpen(false);
      return;
    }
    setBalance((prev) => prev - Number(data.price));
    const lastId = expensList.length > 0 ? expensList[0].id : 0;
    setExpenseList(prev => [{...data,id:  lastId+1},...prev])

    setData({
      title: "",
      category: "",
      price: "",
      date: "",
    })
    setIsOpen(false)

  };

  useEffect(()=>{
    if(editId){
      const expenseData=expensList.find(item=> item.id==editId)
      setData({
        title: expenseData.title,
        category: expenseData.category,
        price: expenseData.price,
        date: expenseData.date,
      })
    }
  },[editId])

  return (
    <div className={styles.wrapper}>
      <h3>{editId ? "Edit Expense" : "Add Expense"}</h3>
      <form onSubmit={editId ? handleEdit : handleAdd}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={data.title}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          value={data.price}
          required
        />
        <br />
        <select
          name="category"
          id="category"
          value={data.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="food">Food</option>
          <option value="entertainment">Entertainment</option>
          <option value="travel">Travel</option>
        </select>
        <input type="date" value={data.date} name="date" onChange={handleChange} required/>
        <br />

        <Button className={styles.button} type="submit" shadows>
          Add Expense
        </Button>
        <Button
          className={styles.button}
          style="secondary"
          handleClick={() => setIsOpen(false)}
          shadows
        >
          Cancel
        </Button>
      </form>
    </div>
  );
}

export default AddExpense;
