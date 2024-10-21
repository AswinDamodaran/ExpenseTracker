import React from "react";
import style from "./Cards.module.css";
import Button from '../Button/Button'

function Cards({cardText, cardAmount, buttonText, cardColor,buttonColor,textcolor,handleClick}) {
  return (
    <div className={style.cardwrapper}>
      <h2 className={style.cardtitle}>
        {cardText}
        <span className={ textcolor ? style.failure : style.success}>
        ₹{cardAmount}
        </span>
      </h2>
      <Button handleClick={handleClick} style={buttonColor} >{buttonText}</Button>
    </div>
  );
}

export default Cards;
