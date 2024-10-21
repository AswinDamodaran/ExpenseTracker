import React, { useState } from "react";
import Button from "../Button/Button";
import styles from './Addbalance.module.css'

function Addbalance({setIsOpen,setBalance}) {

    const [income,setIncome]=useState(0)
    const handleSubmit=(e)=>{
      e.preventDefault()
      setBalance((prev)=> prev+ parseInt(income))
      setIsOpen(false)
    } 
    
  return (
    <div className={styles.Addbalancewrapper} >
        <h2>Add Balance</h2>
      <form
       onSubmit={handleSubmit}
      >
        <input type="number" placeholder="Income Amount" onChange={(e)=> setIncome(e.target.value)} />
        <Button className={styles.button} type="submit" shadows>
          Add Balance
        </Button>
        <Button className={styles.button} style="secondary" handleClick={()=>setIsOpen(false)} shadows >Cancel</Button>

      </form>
    </div>
  );
}

export default Addbalance;
