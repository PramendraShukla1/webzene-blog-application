import "./App.css";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Register from "./components/Register";
import IndexPage from "./pages/IndexPage";
import { UserContextProvider } from "./UserContext";
import NewPost from "./pages/NewPost";
import SinglePost from "./pages/SinglePost";
import EditPost from "./pages/EditPost";

function App() {
  return (
    <BrowserRouter>
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage/>}/>
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register/>}/>
          <Route path="/create-new-blog" element={<NewPost/>}/>
          <Route path="/post/:id" element={<SinglePost/>}/>
          <Route path="/edit/:id" element={<EditPost/>}/>
        </Route>
      </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
