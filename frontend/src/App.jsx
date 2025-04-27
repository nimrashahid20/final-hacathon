
import React from 'react';
import { Routes, Route, useLocation  } from 'react-router-dom';
import Home from './Pages/Home';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LoginPage from './Pages/LoginPage';
import SignUp from './Pages/Signup';
import Logout from "./Pages/Logout" 
import Profile from "./Pages/Profile"
import Update from './Pages/Update';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskBoard from './components/Taskboarb';


const App = () => {
  const location = useLocation();
  
  return (
    <>
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
      />
    
      { <Navigation />} 
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        
        <Route path="/logout" element={<Logout />} />
        
        
        <Route path="/profile" element={<Profile />} />
        <Route path="/update" element={<Update />} />
    </Routes>
    {<TaskBoard/>}
    {<Footer/>}
    </>
  );
};

export default App;