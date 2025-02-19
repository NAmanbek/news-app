import React, { useEffect, useState } from "react";
import styles from "./DatePeriodSelector.module.scss";

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
  const [error, setError] = useState("");

  useEffect(() => {
    // Whenever startDate or endDate changes, save to local storage
    localStorage.setItem("startDate", startDate);
    localStorage.setItem("endDate", endDate);
  }, [startDate, endDate]);

  useEffect(() => {
    // Create a fresh "now" and a "30 days ago" date
    const now = new Date(); // e.g. 2025-02-19
    const maxDays = 30;
    // Make a clone of `now` then subtract days
    const fromDate = new Date(now); 
    fromDate.setDate(now.getDate() - maxDays);

    // Format to YYYY-MM-DD
    const formattedNow = now.toISOString().split("T")[0]; 
    const formattedFromDate = fromDate.toISOString().split("T")[0]; 

    // Check bounds:
    if (
      new Date(startDate) < new Date(formattedFromDate) ||
      new Date(endDate) > now
    ) {
      // If out of range, reset to the allowable window [30DaysAgo, today]
      onStartDateChange(formattedFromDate);
      onEndDateChange(formattedNow);
      setError(`Date range adjusted to the last ${maxDays} days due to API limitations.`);
    } else {
      setError("");
    }
  }, [startDate, endDate, onStartDateChange, onEndDateChange]);

  return (
    <div className={styles.container}>
      <div>
        <label>From:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          max={endDate} 
        />
      </div>
      <div>
        <label>To:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          min={startDate} 
          max={new Date().toISOString().split("T")[0]} 
        />
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default DatePeriodSelector;
