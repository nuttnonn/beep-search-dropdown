import React from 'react';

interface Currency {
  name: string;
  description: string;
  display: string;
  displayAlt: string;
}

interface SearchResultsProps {
  searchResults: Currency[];
  handleItemClick: (result: string) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>, item: string) => void;
  selectedItems: string[];
  dropdownRef: React.RefObject<HTMLDivElement>;
  description?: string;
  display?: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  searchResults,
  handleItemClick,
  handleCheckboxChange,
  selectedItems,
  dropdownRef,
  description,
  display,
}) => {
  return (
    <div className="z-10 bg-white border rounded shadow-lg mt-2 w-72" ref={dropdownRef}>
      <ul className="py-1">
        {searchResults.map((result, index) => (
          <li
            key={index}
            className="px-3 py-2 cursor-pointer hover:bg-gray-100 flex justify-between items-center text-black"
            onClick={() => handleItemClick(result.name)}
          >
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                {display && <img src={result.display} alt={result.displayAlt}/>}
                <span>{result.name}</span>
              </div>
              {description && <span>{result.description}</span>}
            </div>
            <input
              type="checkbox"
              onChange={(e) => handleCheckboxChange(e, result.name)}
              checked={selectedItems.includes(result.name)}
              className="mr-2"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;