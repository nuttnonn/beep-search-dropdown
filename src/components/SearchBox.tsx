import React, { useState } from 'react';

interface SearchBoxProps {
  handleSearch: (query: string) => void;
  onClick?: () => void;
  loading?: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({ handleSearch, onClick, loading }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

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
    <div className="relative z-10">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        onClick={handleClick}
        placeholder="Type to begin searching"
        className="w-72 py-2 px-4 rounded border bg-white text-black shadow-md focus:outline-none focus:ring focus:border-blue-300"
      />
      {loading &&
        <i className="relative h-5 w-5 inline-block animate-spin bg-amber-400" />
      }
    </div>
  );
};

export default SearchBox;