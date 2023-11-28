import './App.css';
import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx';
import Home from './pages/Home/Home.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import CreateListing from './pages/CreateListing/CreateListing.jsx';
import Listing from './pages/Listing/Listing.jsx';
import PendingMessage from './pages/PendingMessage';
import Houses from './pages/Houses/Houses.jsx';
import { useAuth } from './context/context';
import Unauthorized from './pages/Unauthorized';
import Admin from './pages/Admin';
import RemoveUser from './pages/RemoveUser';
import Reservations from './pages/Reservations/Reservations';
import AboutUs from './pages/AboutUs/AboutUs';



import Logout from './pages/Logout';
// import AuthContextProvider from './context/context.js'
import RequireAuth from './components/RequireAuth';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements
} from "react-router-dom";
import { Outlet } from 'react-router-dom';
import MyListings from './pages/MyListings/MyListings.jsx';
// import { createRef } from 'react';

export const ROLES = {
  'Admin' : 1,
  'Host' : 2,
  'Renter' : 3,
  'Anonymous' : 4
}

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

function getRoutes(currentUser) {
  const publicRoutes = [
    <Route element={<Layout/>}>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/unauthorized" element={<Unauthorized/>}/>
      <Route path="/logout" element={<Logout/>}/>
      <Route path="/listings" element={<Houses/>}/>
      <Route path="/listings/:id" element={<Listing/>}/>
      <Route path="/Aboutus" element={<AboutUs/>}/>

      {/* <Route path="/houses" element={<Houses/>}/> */}
    </Route>
  ]

  const protectedRoutes = [
    <Route element={<Layout/>}>
      <Route element={<RequireAuth allowedRoles={[ROLES.Renter]} />}>
        <Route path="/reservations" element={<Reservations/>}/>
      </Route>
      <Route element={<RequireAuth allowedRoles={[ROLES.Host]} />}>
        <Route path="/myListings" element={<MyListings/>}/>
        <Route path="/create" element={<CreateListing/>}/>
      </Route>
      <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
        <Route path="/removeUser" element={<RemoveUser/>}/>
        <Route path="/admin-dashboard" element={<Admin/>}/>
      </Route>
    </Route>
  ]

  return [
    publicRoutes,
    protectedRoutes
  ]
};

function App() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  // console.log(currentUser.role)
  const router = createBrowserRouter(createRoutesFromElements(getRoutes(currentUser)));
  return (
    <div className="app">
      <div className="app-container">
        <RouterProvider router={router}/>
      </div>
    </div>
  );
}


export default App;