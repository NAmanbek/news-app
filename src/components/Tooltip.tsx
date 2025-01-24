import React from "react"; 
import styles from './Tooltip.module.scss'

type TooltipProps = {
  text: string; 
  children: React.ReactNode;
};

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className={styles.tooltipContainer}>
      {children}
      <div className={styles.tooltipText}>{text}</div>
    </div>
  );
};

export default Tooltip;
