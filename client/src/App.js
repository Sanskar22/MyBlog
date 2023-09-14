import './App.css';
import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Indexpost from './components/Indexpost';
import Loginpage from './components/Loginpage';
import Register from './components/Register';
import { UserContextProvider } from './components/UserContext';
import CreatePost from './components/CreatePost';
import PostPages from './components/PostPages';
import EditPost from './components/EditPost';


function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Indexpost />} />
          <Route path={'/login'} element={<Loginpage />} />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/create'} element={<CreatePost />} />
          <Route path={'/post/:id'} element={<PostPages />} />
          <Route path={'/edit/:id'} element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
