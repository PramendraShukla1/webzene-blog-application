import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";

const IndexPage = () => {
  const [posts,setPosts] = useState([])
  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <>
      <Header />
      <div className="flex text-center justify-between flex-wrap mt-10 p-5">
        {
          posts.length>0 && posts.map(post => (
            <Cards key={post.id} {...post}/>
          ))
        }
      </div>
    </>
  );
};

export default IndexPage;
