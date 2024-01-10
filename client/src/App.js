import './App.css';
import {Route, Routes} from "react-router-dom"
import {Home} from "./pages/Home"
import {HomePage} from "./pages/HomePage"
//import Login from './components/Login';
//import SignUp from './components/SignUp';
import RoomComponent from './components/RoomComponent.';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/homepage" element={<HomePage />} />
        {/*
        <Route path="/homepage" element={<RoomComponent />} />
        */}
      </Routes>
    </>
  )
}

export default App;


{/*
return (
    <div className="App">
      <SignUp/>
      <Login/>
    </div>
  );
*/}