import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/layout/Navbar';
import { useFirebase } from './context/auth/FirebaseContext';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Project from './pages/Project';
import Projects from './pages/Projects';

function App() {
  const { loggedIn } = useFirebase();

  return (
    <BrowserRouter>
      <main>
        <Navbar />
        {loggedIn ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/dashboard/*" element={<Dashboard />}></Route>
          </Routes>
        ) : (
          <Routes>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/*" element={<Login />} />
          </Routes>
        )}
        <ToastContainer autoClose={2000} />
      </main>
    </BrowserRouter>
  );
}

export default App;
