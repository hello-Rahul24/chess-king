import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Landing } from './pages/Landing'
import { Game } from './pages/Game'
import { SignIn } from './pages/Signin'
import { SignUp } from './pages/SignUp'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
           <Route path='/'  element={<Landing/>} />
           <Route path='/game'  element={<Game/>} />
           <Route path='/signup'  element={<SignUp/>} />
           <Route path='/signin'  element={<SignIn/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
