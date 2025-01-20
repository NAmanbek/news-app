import React from "react";
import styles from './DatePeriodSelector.module.scss'

type Props = {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
};

const DatePeriodSelector: React.FC<Props> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <div className={styles.container}>
      <label> Start Date: </label>
      <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
        />
      <label> End Date: </label>
      <input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
        />
    </div>
  );
};

export default DatePeriodSelector;