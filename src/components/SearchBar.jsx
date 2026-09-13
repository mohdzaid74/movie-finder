import { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    onSearch(searchTerm);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;