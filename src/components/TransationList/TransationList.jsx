import React, { useEffect, useState } from 'react'
import styles from './TransationList.module.css'
import TransactionCard from '../TransactionCard/TransactionCard'
import Modal from '../modal/Modal'
import AddExpense from '../AddExpense/AddExpense'
import Pagination from '../Pagination/Pagination'

function TransationList({expensList,setExpenseList,title,balance,setBalance}) {

    const [editID,setEditID]=useState(0)
    const [isDisplayEditor,setIsDisplayEditor]=useState(false)
    const [currentTransaction,setCurrentTransaction]=useState([])
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPages,setTotalPages]=useState()
    const maxRec=3

    const handleEdit=(id)=>{
        setEditID(id)
        setIsDisplayEditor(true)

    }
    const handleDelete=(id)=>{
        const item=expensList.find(i=> i.id ==id)
        const price= Number(item.price)
        setBalance(prev => prev+price)

        setExpenseList(prev => (
            prev.filter(item => item.id != id)
        ))
    }

    useEffect(()=>{
        const startIdx=(currentPage -1) * maxRec
        const endIdx=Math.min(currentPage * maxRec,expensList.length)

        setCurrentTransaction([...expensList].slice(startIdx,endIdx))
        setTotalPages(Math.ceil(expensList.length / maxRec))
    },[currentPage,expensList])

    useEffect(()=>{
        if(totalPages<currentPage && currentPage >1){
            setCurrentPage(prev => prev-1)
        }
    },[totalPages])



  return (
    <div className={styles.transactionMain}  >
        {title && (<h2>{title}</h2>)}

        {expensList.length>0 ? <div className={styles.list} >
            <div className={styles.cover} >
                {currentTransaction.map(transaction => (
                    <TransactionCard
                    details={transaction}
                    key={transaction.id}
                    handeDelete={()=> handleDelete(transaction.id)}
                    handleEdit={()=> handleEdit(transaction.id)}
                    />
                ))}
            </div>
            {totalPages>1 && (<Pagination
            updatePage={setCurrentPage}
            currentPage={currentPage}
            totalPages={totalPages}
            />)}
        </div>
        :
(        <div className={styles.emptyExpense} >
    <p>No Transactions!</p>

</div>)
        }
        <Modal isOpen={isDisplayEditor} setIsOpen={setIsDisplayEditor}>
        <AddExpense 
        editId={editID}
        expensList={expensList}
        setExpenseList={setExpenseList}
        setIsOpen={setIsDisplayEditor}
        balance={balance}
        setBalance={setBalance}
         />
         </Modal>
    </div>
  )
}

export default TransationList