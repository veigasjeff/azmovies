import { useState, useEffect } from 'react';
import styles from '@styles/SearchComponent.module.css';

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [adultRes, moviesRes, tvshowRes] = await Promise.all([
          fetch('/adult.json'),
          fetch('/movies.json'),
          fetch('/tvshow.json')
        ]);

        const [adultData, moviesData, tvshowData] = await Promise.all([
          adultRes.json(),
          moviesRes.json(),
          tvshowRes.json()
        ]);

        setResults([...adultData, ...moviesData, ...tvshowData]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredResults = results.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <ul className={styles.dropdownList}>
          {filteredResults.map((item, index) => (
            <li key={index} className={styles.dropdownItem}>
              <a href={item.siteurl}>
                <img src={item.image} alt={item.name} className={styles.thumbnail} />
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;
