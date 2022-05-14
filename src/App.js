import './App.css';
import Home from "./pages/home/Home";
// import NewCourses from './pages/newCourses/NewCourses';
// import SignInSide from "./pages/signin/index";
// import SignUpForm from "./pages/signup/index";
import AuthProvider from "./contexts/authContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
// import ForgetPassword from "./pages/forgetPassword";
import SignInRoute from "./SignInRoute";
// import UpdateProfile from "./pages/updateProfile";
import NewCourses from './pages/newCourses/NewCourses';
import AdminLogin from './pages/adminLogin/AdminLogin';
import AdminHome from "./pages/adminHome/AdminHome";
import PasswordReset from './pages/passwordReset/PasswordReset';
import AddAdmin from "./pages/addAdmin/AddAdmin";
import Courses from "./pages/courses/Courses";
import StudentLogin from './pages/studentLogin/StudentLogin';
import StudentSignup from './pages/studentSignup/StudentSignup';

function App() {
  return (
    // <AuthProvider>
    //   <BrowserRouter>
    //     <Routes>
    //       <Route exact path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
    //       <Route path="/update-profile" element={<PrivateRoute><UpdateProfile/></PrivateRoute>}/>
    //       <Route path="/signup" element={<SignInRoute><SignUpForm /></SignInRoute> } />
    //       <Route path="/signin" element={<SignInRoute><SignInSide/></SignInRoute> }/>
    //       <Route path="/forget-password" element={<SignInRoute><ForgetPassword/></SignInRoute> }/>
    //     </Routes>
    //   </BrowserRouter>
    // </AuthProvider>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignInRoute> <Home/> </SignInRoute>} />
          <Route path="/new-courses" element={<NewCourses/>}/>
          <Route path="/admin-login" element={<SignInRoute> <AdminLogin/></SignInRoute>}/>
          <Route path="/admin-home" element={<PrivateRoute> <AdminHome/></PrivateRoute>}/>
          <Route path="/admin-reset" element={<PrivateRoute> <PasswordReset/></PrivateRoute>}/>
          <Route path="/admin-add" element={<PrivateRoute> <AddAdmin/></PrivateRoute>}/>
          <Route path="/admin-course" element={<PrivateRoute> <Courses/></PrivateRoute>}/>
          <Route path="/login" element={<StudentLogin/>}/>
          <Route path="/signup" element={<StudentSignup/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
