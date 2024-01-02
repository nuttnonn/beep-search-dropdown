import React from 'react';

interface Currency {
  name: string;
  description: string;
  display: string;
  displayAlt: string;
}

interface SearchResultsProps {
  searchResults: Currency[];
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>, item: string) => void;
  description?: boolean;
  display?: boolean;
  className?: string;
  notFound: boolean;
  selectedItems: string[];
}

const SearchResults: React.FC<SearchResultsProps> = ({
  searchResults,
  handleCheckboxChange,
  description,
  display,
  className,
  notFound,
  selectedItems,
}) => {
  const handleItemClick = (name: string) => {
    const checkbox = document.getElementById(`checkbox_${name}`) as HTMLInputElement | null;
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
      handleCheckboxChange({ target: checkbox } as React.ChangeEvent<HTMLInputElement>, name);
    }
  };

  return (
    <div className={`z-10 bg-white border rounded shadow-lg mt-2 w-72 ${className}`}>
      <ul className="py-1">
        {!notFound ? (
          searchResults.map((result, index) => (
            <li
              key={index}
              className="px-3 py-2 cursor-pointer hover:bg-blue-100 flex justify-between items-center text-black even:bg-gray-100"
              onClick={() => handleItemClick(result.name)}
            >
              <div className="flex flex-col gap-1">
                <div className="flex gap-4">
                  {display && <img src={result.display} alt={result.displayAlt} />}
                  <span>{result.name}</span>
                </div>
                {description && <span>Country: {result.description}</span>}
              </div>
              <input
                id={`checkbox_${result.name}`}
                type="checkbox"
                onChange={(e) => handleCheckboxChange(e, result.name)}
                checked={selectedItems.includes(result.name)}
                onClick={(e) => e.stopPropagation()}
              />
            </li>
          ))
        ) : (
          <li className="px-3 py-2 text-black">No results were found</li>
        )}
      </ul>
    </div>
  );
};

export default SearchResults;