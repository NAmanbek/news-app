import React from "react";
import styles from './SortBySelector.module.scss'

type Props = {
  selectedSortBy: string;
  onSortByChange: (sortBy: string) => void;
};

const SortBySelector: React.FC<Props> = ({ selectedSortBy, onSortByChange }) => {
  const sortOptions = [
    { value: 'relevancy', label: 'Relevancy' },
    { value: 'popularity', label: 'Popularity' },
    { value: 'publishedAt', label: 'Published At' },
  ];

  return (
    <div className={styles.selectWrapper}>
      <label>Sort by: </label>
      <select value={selectedSortBy} onChange={(e) => onSortByChange(e.target.value)}>
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortBySelector;