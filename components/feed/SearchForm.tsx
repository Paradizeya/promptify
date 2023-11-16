"use client";

import { useState } from "react";

type Props = {};

const SearchForm = (props: Props) => {
  const [SearchText, setSearchText] = useState("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  return (
    <form className="feed__form">
      <input
        className="feed__searchBar"
        type="search"
        placeholder="Search for a tag or a username"
        value={SearchText}
        onChange={handleSearchChange}
        required
      />
    </form>
  );
};

export default SearchForm;
