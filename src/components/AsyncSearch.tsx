import React, { useState, useEffect } from 'react';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';

interface Currency {
  name: string;
  description: string;
  display: string;
  displayAlt: string;
}

interface AsyncSearchProps {
  data: Currency[];
  onSelectedItemsChange: (items: string[]) => void;
}

const AsyncSearch: React.FC<AsyncSearchProps> = ({ data, onSelectedItemsChange }) => {
  const [searchResults, setSearchResults] = useState<Currency[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    isLoading && console.log('loading...')
    console.log('handle search!')

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
    }

    setIsLoading(false);
  };

  let typingTimer: ReturnType<typeof setTimeout>;

  const debounceSearch = (query: string) => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      handleSearch(query);
    }, 300);
  };

  const handleInputChange = (query: string) => {
    if (!showDropdown) {
      setShowDropdown(true);
    }
    debounceSearch(query);
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
    onSelectedItemsChange(selectedItems);
  }, [selectedItems, onSelectedItemsChange]);

  return (
    <div className="relative">
      <SearchBox handleSearch={handleInputChange} onClick={() => setShowDropdown(!showDropdown)} loading={isLoading} />
      {showDropdown && (
        <SearchResults
          searchResults={searchResults}
          handleCheckboxChange={handleCheckboxChange}
          className="absolute top-0 translate-y-10"
          selectedItems={selectedItems}
          notFound={isNotFound}
          display
          description
        />
      )}
    </div>
  );
};

export default AsyncSearch;