import Navbar from './components/Navbar';
import FormStory from './components/FormStory';
import Leaderboard from './components/Leaderboard';
import Home from './components/Home'
import IdentityForm from './components/IdentityForm';
import { Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="box-border w-full min-h-screen">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/form' element={<FormStory />}></Route>
        <Route path='/email' element={<IdentityForm />}></Route>
        <Route path='/leader_board' element={<Leaderboard />}></Route>
        <Route path='*' element={<Navigate replace to='/' />}></Route>
      </Routes>
    </div>
  );
}

export default App;
