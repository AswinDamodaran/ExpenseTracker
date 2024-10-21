import React from "react";
import styles from "./TransactionCard.module.css";
import { PiPizza, PiGift } from "react-icons/pi";
import { BsSuitcase } from "react-icons/bs";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdOutlineModeEditOutline } from "react-icons/md";

function TransactionCard({ details, handleEdit, handeDelete }) {

  const fomatedDate=new Date(details.date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className={styles.card}>
      <div className={styles.innercard}>
        <div className={styles.icons}>
          {details.category == "food" && <PiPizza size={24} />}
          {details.category == "entertainment" && <PiGift size={24} />}
          {details.category == "travel" && <BsSuitcase size={24} />}
        </div>
        <div className={styles.cardDetails}>
          <h5>{details.title}</h5>
          <p>{fomatedDate}</p>
        </div>
      </div>

      <div className={styles.innercard}>
        <p className={styles.cardPrice}>{`₹${details.price}`}</p>
        <div className={styles.cardButton}>
          <button onClick={handeDelete} className={styles.cardDelete}>
            <IoMdCloseCircleOutline size={24} />
          </button>
          <button onClick={handleEdit} className={styles.cardEdit}>
            <MdOutlineModeEditOutline size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransactionCard;
