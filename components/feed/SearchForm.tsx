"use client";

import { FormEvent, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {};

const SearchForm = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const [SearchText, setSearchText] = useState("");
  const startSearch = () => {
    router.push(`${SearchText === "" ? "/" : `?search=${SearchText}`}`);
  };

  useEffect(() => {
    if (search !== null) {
      setSearchText(search);
    } else setSearchText("");
  }, [search]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    startSearch();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchText(e.target.value.toLocaleLowerCase());
  };

  return (
    <form className="feed__form" onSubmit={(e) => handleSubmit(e)}>
      <input
        className="feed__searchBar"
        type="search"
        placeholder="Search for a tag, username or keywords"
        value={SearchText}
        onChange={handleSearchChange}
      />
    </form>
  );
};

export default SearchForm;
