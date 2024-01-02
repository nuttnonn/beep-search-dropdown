import React, { useEffect, useState } from 'react'
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';

interface Currency {
  name: string;
  description: string;
  display: string;
  displayAlt: string;
}

interface SyncSearchProps {
  data: Currency[];
  onSelectedItemsChange: (items: string[]) => void;
}

const SyncSearch: React.FC<SyncSearchProps> = ({ data, onSelectedItemsChange }) => {
  const [searchResults, setSearchResults] = useState<Currency[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);

  const initialDataResults = data.map((item) => item)

  const handleSearch = (query: string) => {
    if (query) {
      const filteredResults = data.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      if (filteredResults.length !== 0) {
        setSearchResults(filteredResults);
        setShowDropdown(true);
        setIsNotFound(false);
      } else {
        setIsNotFound(true);
      }
    } else {
      setSearchResults(initialDataResults);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, item: string) => {
    const isChecked = e.target.checked;
    setSelectedItems((prevItems) => {
      if (isChecked) {
        return [...prevItems, item];
      } else {
        return prevItems.filter((prevItem) => prevItem !== item);
      }
    });
  };

  useEffect(() => {
    setSearchResults(initialDataResults);
  }, [])

  useEffect(() => {
    onSelectedItemsChange(selectedItems);
  }, [selectedItems, onSelectedItemsChange]);

  return (
    <div className="relative">
      <SearchBox handleSearch={handleSearch} onClick={() => setShowDropdown(!showDropdown)} />
      {showDropdown && (
        <SearchResults
          searchResults={searchResults}
          handleCheckboxChange={handleCheckboxChange}
          notFound={isNotFound}
          className="absolute top-0 translate-y-10"
          selectedItems={selectedItems}
        />
      )}
    </div>
  );
};

export default SyncSearch;
