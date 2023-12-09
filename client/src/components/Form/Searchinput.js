import React from "react";
import { useSearch } from "../../context/search";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/searchInput.css";
import axios from "axios";

const Searchinput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={values.keyword}
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
      />
      <button type="submit">
        <FaSearch />
      </button>
    </form>
  );
};

export default Searchinput;
