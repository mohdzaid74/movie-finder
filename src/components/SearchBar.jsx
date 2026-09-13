import { useState } from "react";

function SearchBar({ onSearch, loading }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (!searchTerm.trim() || loading) return;
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
        disabled={loading}
      />

      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
}

export default SearchBar;