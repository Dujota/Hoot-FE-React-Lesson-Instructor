import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import authService from './services/authService';

// Components
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm'
import HootList from './components/HootList/HootList';

const App = () => {
  const [user, setUser] = useState(authService.getUser());

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  }

  return (
    <>
      <NavBar user={user} handleSignout={handleSignout}/>
      <Routes>
        { user ? (
          // Protected Routes:
          <>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/hoots" element={<HootList />} />
          </>
        ) : (
            // Public Route:
            <Route path="/" element={<Landing />} />
        )}
        <Route path="/signup" element={<SignupForm setUser={setUser}/>} />
        <Route path="/signin" element={<SigninForm setUser={setUser}/>} />

      </Routes>
    </>
  );
};

export default App;