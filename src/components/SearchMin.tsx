import assets from "../assets/assets";
import styles from './SearchMin.module.scss';

interface SearchMinProps {
  className?: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (value: string) => void; 
}

const SearchMin: React.FC<SearchMinProps> = ({ className, searchQuery, onSearchChange, onSearchSubmit }) => {

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchSubmit(searchQuery); // Trigger search on Enter
    }
  };

  return (
    <div className={`${styles.searchHidCont} ${className || ''}`}>
      <input
        className={styles.inputHeader}
        type="search"
        placeholder='Search news...'
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button
        className={styles.iconButton} aria-label="Search"
        onClick={() => onSearchSubmit(searchQuery)}
      >
        <img src={assets.search_icon} className={styles.iconImage} />
      </button>
    </div>
  );
};

export default SearchMin;