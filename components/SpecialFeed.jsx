"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const SpecialPromptCardList = ({ data, handleTagClick}) => {
  return (
    <div className='prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const SpecialFeed = ({word, title}) => {
  const [allPosts, setAllPosts] = useState([]);
  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };



  return (
    <section className='feed'>
      <h1 className='head_text text-left z-500'>{title}</h1>

        <SpecialPromptCardList
          data={filterPrompts(word)}
        />

    </section>
  );
};

export default SpecialFeed;
