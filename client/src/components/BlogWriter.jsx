import React, { useState } from "react";
import banner from "../assets/blog_bg.png";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const BlogWriter = () => {
  const bgStyle = {
    backgroundImage: `url(${banner})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width: "auto",
  };

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [profilePic,setProfilePic] = useState("")
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    data.set("profilePic",profilePic[0])

    e.preventDefault();
    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
      toast("New post has been created successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };

  if(redirect){
    <Navigate to={'/'}/>
  }

  return (
    <div className="mb-28 " style={bgStyle}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="display-5 fw-bold text-body-emphasis lh-1 flex justify-center mb-5 md:p-5 p-2 items-center">
        A Platform for Expression: Unleash Your Ideas
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: "\n  body {background:white !important;}\n",
        }}
      />

      <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl bg-white">
        <form onSubmit={handleSubmit}>
          <input
            className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none w-full"
            spellCheck="false"
            placeholder="Title"
           
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none w-full"
            spellCheck="false"
            placeholder="Write a short summary here"
            type="text"
            required
           
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <ReactQuill
            className=" description h-60 outline-none"
            value={content}
            onChange={(newValue) => setContent(newValue)}
            modules={modules}
            formats={formats}
            theme="snow"
            placeholder="Write your blog content here"
          />

          <div className="max-w-2xl mx-auto w-full mt-28 md:mt-14 lg:mt-10">
            <label
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="file_input"
            >
              Upload Picture For Blog
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-3 mt-2"
              id="file_input"
              type="file"
              required
              onChange={(e) => setFiles(e.target.files)}
            />
             <label
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="file_input"
            >
              Upload Profile Picture (Optional)
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-3 mt-2"
              id="file_input"
              type="file"
              required
              onChange={(e) => setProfilePic(e.target.files)}
            />
          </div>
          

          {/* buttons */}
          <div className="buttons flex mt-3 justify-end">
            <Link to={"/"}>
              <button className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
                Return to Home
              </button>
            </Link>

            <button
              type="submit"
              className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
            >
              Post
            </button>
          </div>
        </form>
      </div>
     
    </div>
  );
};

export default BlogWriter;
