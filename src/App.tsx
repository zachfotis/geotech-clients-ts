import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/layout/Navbar';
import { useFirebase } from './context/auth/FirebaseContext';
import Comp404 from './pages/404';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Project from './pages/Project';
import Projects from './pages/Projects';
import Status from './pages/Status';

function App() {
  const { loggedIn, isAdmin } = useFirebase();

  return (
    <BrowserRouter>
      <main>
        <Navbar />
        {loggedIn ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="/projects" element={<Projects />} />
            {isAdmin && <Route path="/dashboard/*" element={<Dashboard />} />}
            {isAdmin && <Route path="/status" element={<Status />} />}
            <Route path="/*" element={<Comp404 />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />

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
