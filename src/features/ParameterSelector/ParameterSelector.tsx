import React from 'react'
import styles from '../SortBySelector/SortBySelector.module.scss'

type Props = {
  selectedParameter: string;
  onParameterChange: (parameter: string) => void;
};

const ParameterSelector: React.FC<Props> = ({ selectedParameter, onParameterChange }) => {

  const parameters = [
    { value: 'technology', label: 'Technology' },
    { value: 'science', label: 'Science' },
    { value: 'sports', label: 'Sports' },
    { value: 'business', label: 'Business' },
    { value: 'health', label: 'Health' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'politics', label: 'Politics' },
    { value: 'economics', label: 'Economics' },
    { value: 'q', label: 'All' },
    { value: 'Elon Musk', label: 'Elon Musk' }
  ];

  return (
    <div className={styles.selectWrapper}>
      <label>Topic: </label>
      <select value={selectedParameter} onChange={(e) => onParameterChange(e.target.value)}>
      {
        parameters.map((param) => (
          <option key={param.value} value={param.value}>
            {param.label}
          </option>
        ))
      }
    </select>
    </div>
  )
}

export default ParameterSelector;