import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import Cards from "../components/Cards";
import { HiPencilAlt } from "react-icons/hi";
import { UserContext } from "../UserContext";

const SinglePost = () => {
  const [postInfo, setPostInfo] = useState(null);
  const [posts, setPosts] = useState([]);
  const {userInfo} = useContext(UserContext)
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  if (!postInfo) return "";

  const currentDate = new Date(postInfo.createdAt);
  const formattedTime12hr = format(currentDate, "MMM d yyyy h:mm a");
  return (
    <>
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <address className="flex items-center mb-6 not-italic">
                <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <img
                    className="mr-4 w-16 h-16 rounded-full"
                    src={`http://localhost:4000/${postInfo.profilePic}`}
                    alt="Jese Leos"
                  />
                  <div>
                    <a
                      href="#"
                      rel="author"
                      className="text-xl font-bold text-gray-900 dark:text-white"
                    >
                      {postInfo.author.username}
                    </a>
                    <p className="text-base font-light text-gray-500 dark:text-gray-400">
                      <time
                        pubdate=""
                        dateTime="2022-02-08"
                        title="February 8th, 2022"
                      >
                        {formattedTime12hr}
                      </time>
                    </p>
                   {userInfo.id == postInfo.author._id &&(<Link to={`/edit/${postInfo._id}`} className="flex justify-start place-items-center gap-2 text-lg
                    text-gray-600 font-bold hover:text-gray-500 hover:cursor-pointer">
                        Edit <HiPencilAlt/>
                    </Link>)}
                  </div>
                </div>
              </address>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {postInfo.title}
              </h1>
            </header>
            <p className="lead">{postInfo.summary}</p>

            <img
              src={`http://localhost:4000/${postInfo.cover}`}
              alt=""
              className="p-5"
            />
            <section>
              <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
            </section>
          </article>
        </div>
      </main>
      <aside
        aria-label="Related articles"
        className="py-8 lg:py-24 bg-gray-50 dark:bg-gray-800"
      >
        <div className="px-4 mx-auto max-w-screen-xl">
          <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
            Related articles
          </h2>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {posts.length > 0 &&
              posts.map((post) => <Cards key={post.id} {...post} />)}
          </div>
        </div>
      </aside>
    </>
  );
};

export default SinglePost;
