import { Routes, Route } from 'react-router-dom';
import Nav from './pages/Navbar';
import Footer from './pages/Footer';
import Body from './pages/Body';
import ShoppingCart from './pages/ShoppingCart';
import Checkout from './pages/CheckOut';
import ChangePassword from './pages/Login/ChangePassword';
import Login from './pages/Login/Login';
import ForgotPassword from './pages/Login/Forgotpw';
import ResetPassword from './pages/Login/ResetPassword';
import Register from './pages/Login/Register';
import CourseEnroll from './pages/CourseContent/CourseEnroll';
import Search from './pages/CourseContent/Search';
import CourseDetail from './pages/CourseContent/CourseDetail';
import Profile from './pages/Instructor/Profile';
import MyCourse from './pages/CourseContent/MyCourse';
import CoursePage from './pages/CourseContent/CoursePage';
import TakeQuiz from './pages/Quiz/TakeQuiz';
import ResultQuiz from './pages/Quiz/ResultQuiz';
// import ResultQuiz from './pages/Quiz/ResultQuiz';
// import CoursePage from './pages/CourseContent/CoursePage';




function App() {
  return (

    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Body/>}/>
        <Route path="/news/:id" element={<CourseDetail/>} /> 
        <Route path="/search" element={<Search/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/fogotPassword' element={<ForgotPassword/>}/>
        <Route path='/changePassword' element={<ChangePassword/>}/>
        <Route path='/resetPassword' element={<ResetPassword/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/wishlist'element={<ShoppingCart/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path="/courseEnroll" element={<CourseEnroll />} />
        <Route path='/detailProfile/:emailAddress' element={<Profile/>}/>
        <Route path='/myCourse' element={<MyCourse/>}/>
        <Route path='/coursePage/:courseId' element={<CoursePage/>}/>
        <Route path="/takeQuiz/:quizId/:dateTime" element={<TakeQuiz />} />
        <Route path='/result/:quizSessionId' element={<ResultQuiz/>}/>
      </Routes>



      {/* đức */}
      {/* <EnterCode/> */}
   

      {/* nguyên  */}
     
    

      <Footer />
    </div>

  );
}

export default App;
