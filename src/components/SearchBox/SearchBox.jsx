import style from "./SearchBox.module.css";

const SearchBox = ({ value, onSearch }) => {
  return (
    <div className={style.search}>
      <p>Find contacts by name</p>
      <input
        className={style.input}
        type="text"
        value={value}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
