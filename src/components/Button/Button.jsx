import React, { Children } from 'react'
import styles from './Button.module.css'
import { enqueueSnackbar } from 'notistack'

function Button({children,type,handleClick,shadows,style='primary'}) {

   
  return (
<button 
onClick={handleClick}
// type={type}
className={`${styles.buttons} ${styles[style]} ${shadows && styles.shadow }`}
 >
  {children}
</button>
  )
}

export default Button