import { useState } from 'react';
import TextField from '@mui/material/TextField';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    {<h1>searchValue</h1>}
    setQuery(searchValue);
    onSearch(searchValue);
  };

  return (
    <div>
      <TextField
        label="Search Items"
        value={query}
        onChange={handleSearch}
        aria-label="Search Input"
      />
      {/* Display the search input value */}
      
    </div>
  );
};

export default SearchBar;
