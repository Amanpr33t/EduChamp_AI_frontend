import Navbar from './components/Navbar';
import StoryForm from './components/StoryForm';
import Home from './components/Home'
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom'
import EmailForm from './components/EmailForm'
import { useEffect} from 'react'

function App() {
  const navigate = useNavigate()
  let email = localStorage.getItem('email_AI_story')

  //This useEffect hook is used to navigate us to '/email' if the user is not logged in.
  useEffect(() => {
    if (!email) {
      navigate('/email')
    }
  }, [email, navigate])


  return (
    <div className="box-border w-full min-h-screen">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home  />}></Route>
        <Route path='/form' element={<StoryForm />}></Route>
        <Route path='/email' element={<EmailForm />}></Route>
        <Route path='*' element={<Navigate replace to='/' />}></Route>
      </Routes>
    </div>
  );
}

export default App;
