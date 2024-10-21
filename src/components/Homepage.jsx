import { SnackbarProvider } from "notistack";
import React, { useEffect, useState } from "react";
import styles from "./Homepage.module.css";
import Cards from "./cards/Cards";
import Piechart from "../components/piechart/Piechart";
import Modal from "./modal/Modal";
import Addbalance from "./Addbalance/Addbalance";
import AddExpense from "./AddExpense/AddExpense";
import TransationList from "./TransationList/TransationList";
import BarGraph from './BarGraph/BarGraph'

function Homepage() {
  const [balance, setBalance] = useState(0);

  const [expense, setExpense] = useState(0);
  const [expensList, setExpenseList] = useState([]);
  const [isOpenBalance, setIsOpenBalance] = useState(false);
  const [isOpenexpense, setIsOpenexpense] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [categorySpent, setCategorySpent] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });
  const [categoryCount, setCategoryCount] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });



  useEffect(() => {
    const localBal = localStorage.getItem("balance");

    if (localBal) {
      setBalance(Number(localBal));
    } else {
      setBalance(5000);
      localStorage.setItem("balance", 5000);
    }

    const items = JSON.parse(localStorage.getItem("expense"));
    setExpenseList(items || []);
    setIsMounted(true);
  }, []);




  // expense to local
  useEffect(() => {
    if (expensList.length > 0 || isMounted) {
      localStorage.setItem("expense", JSON.stringify(expensList));
    }

    if (expensList.length > 0) {
      setExpense(expensList.reduce((acc, curr) => acc + Number(curr.price), 0));
    } else {
      setExpense(0);
    }
    let foodSpend = 0,
      entertainmentspends = 0,
      travelspends = 0;
    let foodCount = 0,
      EntertainmentCount = 0,
      travelCount = 0;

    expensList.forEach((item) => {
      if (item.category == "food") {
        foodSpend += Number(item.price);
        foodCount++;
      } else if (item.category == "entertainment") {
        entertainmentspends += Number(item.price);
        EntertainmentCount++;
      }
      else{
        travelspends+= Number(item.price);
        travelCount++
      }
    });

    setCategorySpent({
      food: foodSpend,
      entertainment: entertainmentspends,
      travel: travelspends,
    })
    setCategoryCount({
      food: foodCount,
      entertainment: EntertainmentCount,
      travel: travelCount,
    })

  }, [expensList]);

  useEffect(() => {
    if(isMounted){
      localStorage.setItem("balance", balance.toString());
    }
  }, [balance]);



  return (
    <div className={styles.main}>
      <h1>Expense Tracker</h1>
      <div className={styles.header}>
        <Cards
          cardText="Wallet Balance: "
          cardAmount={balance}
          buttonText="+ Add Income"
          buttonColor="success"
          handleClick={() => {
            setIsOpenBalance(true);
          }}
        />
        <Cards
          cardText="Expenses: "
          cardAmount={expense}
          buttonText="+ Add Expense"
          buttonColor="failure"
          textcolor
          handleClick={() => {
            setIsOpenexpense(true);
          }}
        />
        <Piechart
          data={[
            { name: "Food", value: categorySpent.food },
            { name: "Entertainment", value: categorySpent.entertainment },
            { name: "Travel", value: categorySpent.travel },
          ]}
        />
      </div>
      <div className={styles.bottomwrapper}>
        <TransationList
          expensList={expensList}
          setExpenseList={setExpenseList}
          title="Recent Transactions"
          balance={balance}
          setBalance={setBalance}
        />
        <BarGraph
          data={
            [
              {name:"Food",value: categoryCount.food},
              {name:"Entertainment",value: categoryCount.entertainment},
              {name:"Travel",value: categoryCount.travel}
            ]
          }
        />
      </div>

      <Modal isOpen={isOpenexpense} setIsOpen={setIsOpenexpense}>
        <AddExpense
          setIsOpen={setIsOpenexpense}
          expensList={expensList}
          setExpenseList={setExpenseList}
          setBalance={setBalance}
          balance={balance}
        />
      </Modal>

      <Modal isOpen={isOpenBalance} setIsOpen={setIsOpenBalance}>
        <Addbalance setIsOpen={setIsOpenBalance} setBalance={setBalance} />
      </Modal>
    </div>
  );
}

export default Homepage;
