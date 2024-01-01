import React, { useState, useEffect, useRef } from 'react';
import { createPopper } from '@popperjs/core';
import SearchBox from './components/SearchBox.tsx';
import SearchResults from './components/SearchResults.tsx';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const mockData: { currency: { name: string; description: string; display: string; displayAlt: string }[] } = {
    currency: [
      { name: 'euro', description: 'eur', display: 'eur-image-path', displayAlt: 'eur-image' },
      { name: 'us dollar', description: 'usd', display: 'usd-image-path', displayAlt: 'usd-image' },
      { name: 'canadian dollar', description: 'cad', display: 'cad-image-path', displayAlt: 'cad-image' },
      { name: 'swiss franc', description: 'chf', display: 'chf-image-path', displayAlt: 'chf-image' },
      { name: 'japanese yen', description: 'jpy', display: 'jpy-image-path', displayAlt: 'jpy-image' },
      { name: 'thai bath', description: 'thb', display: 'thb-image-path', displayAlt: 'thb-image' },
    ],
  };

  const handleSearch = (query: string) => {
    if (query) {
      setSearchTerm(query);
      const filteredResults = mockData.currency.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      console.log(filteredResults)
      setSearchResults(filteredResults);
      setShowDropdown(true);
    } else {
      setSearchResults(mockData.currency);
    }
  };

  const handleItemClick = (result: string) => {
    setSearchTerm(result);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, item: string) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedItems((prevItems) => [...prevItems, item]);
      console.log(selectedItems)
    } else {
      setSelectedItems((prevItems) => prevItems.filter((prevItem) => prevItem !== item));
      console.log(selectedItems)
    }
  };

  useEffect(() => {
    if (searchTerm === '') {
      setShowDropdown(false);
      setSearchResults(mockData.currency);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (showDropdown && inputRef.current && dropdownRef.current) {
      createPopper(inputRef.current, dropdownRef.current, {
        placement: 'top',
      });
    }
  }, [showDropdown]);

  return (
    <div className="w-screen min-h-screen flex flex-col justify-start items-center">
      <SearchBox handleSearch={handleSearch} onClick={() => setShowDropdown(!showDropdown)} />
      {showDropdown && (
        <SearchResults
          searchResults={searchResults}
          handleItemClick={handleItemClick}
          handleCheckboxChange={handleCheckboxChange}
          selectedItems={selectedItems}
          dropdownRef={dropdownRef}
        />
      )}
    </div>
  );
};

export default App;