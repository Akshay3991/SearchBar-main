import PropTypes from "prop-types";

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch }) => {

  return (
    // <div className="gcse-search"></div>

    <div className="bg-[whitesmoke] p-5 w-[50%] flex justify-center items-center rounded-lg">
      <input
        className="w-[80%] p-2 rounded-lg"
        type="text"
        value={searchQuery}
        placeholder="Search..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        className="bg-[blue] text-white p-2 rounded-lg"
        onClick={() => handleSearch()}
      >
        Search
      </button>
    </div>
  );
};

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

export default SearchBar;
