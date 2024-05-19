import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchProps {
  onSearchTextChange: (text: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearchTextChange }) => {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setSearchText(text);
    onSearchTextChange(text);
  };

  return (
    <div className="relative flex items-center">
      <span className="absolute left-3 text-gray-500 text-sm">
        <FaSearch />
      </span>
      <input
        type="text"
        placeholder="Buscar tarefas..."
        value={searchText}
        onChange={handleInputChange}
        className="pl-10 border rounded-md px-4 py-2 w-full transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-500 text-sm"
        autoFocus
      />
    </div>
  );
};

export default Search;
