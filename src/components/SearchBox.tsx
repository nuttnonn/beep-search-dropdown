import React, { useState, useRef } from 'react';

interface SearchBoxProps {
  handleSearch: (query: string) => void;
  onClick?: () => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ handleSearch, onClick }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    handleSearch(query);
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleChange}
      onClick={handleClick}
      placeholder="Type to begin searching"
      ref={inputRef}
      className="w-72 py-2 px-4 rounded border focus:outline-none focus:ring focus:border-blue-300 relative"
    />
  );
};

export default SearchBox;