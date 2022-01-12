import React, {useState} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from '../components/Home'
import Navbar from '../components/Navbar'
import Employees from '../components/Employees' 
import Recruiters from '../components/Recruiters'
import Jobs from '../components/Jobs'
import AboutUs from '../components/AboutUs'
import Search from '../components/Search'
import Login from '../components/Login'
import Logout from '../components/Logout'
import RegisterUser from '../components/RegisterUser'
import AddEmployee from '../components/AddEmployee'
import AddRecruiter from '../components/AddRecruiter'
import CreateJobListing from '../components/CreateJobListing'
import ShowMatches from '../components/ShowMatches'
import ShowCandidates from '../components/ShowCandidates'
import ForgotPassword from '../components/forgotPassword'
import MyJobListings from '../components/myJobListings'
import EditEmployee from '../components/EditEmployee'

function Router () {
    
    //To check if app has a logged in user or not
    const [loggedIn, setLoggedIn] = useState(()=> {
        return (JSON.parse(localStorage.getItem('loggedInUser'))) ? true : false;
    })

    return (
        <BrowserRouter>
        <Navbar loggedIn = {loggedIn}/>
            <Routes>
                {
                    //New bullshit way to declare routes, use Routes instead of switch, and have the whole Component Tag
                }
                <Route path='/employee' element={<Employees/>}/>
                <Route path='/recruiter' element={<Recruiters/>}/>
                <Route path='/Search' element={<Search/>}/>
                <Route path='/jobListings' element={<Jobs/>}/>
                <Route path='/login' element={<Login setLoggedIn={setLoggedIn}/>}/>
                <Route path='/logout' element={<Logout setLoggedIn={setLoggedIn}/>}/>
                <Route path='/addEmployee' element={<AddEmployee setLoggedIn={setLoggedIn}/>}/>
                <Route path='/employeeEdit' element={<EditEmployee/>}/>
                <Route path='/addRecruiter' element={<AddRecruiter setLoggedIn={setLoggedIn}/>}/>
                <Route path='/registerUser/*' element={<RegisterUser/>}/>
                <Route path='/createJobListing' element={<CreateJobListing/>}/>
                <Route path='/showMatches' element={<ShowMatches/>}/>
                <Route path='/myJobListings' element={<MyJobListings/>}/>
                <Route path='/showCandidates' element={<ShowCandidates/>}/>
                <Route path='/aboutUs' element={<AboutUs/>}/>
                <Route path='/forgotPassword' element={<ForgotPassword/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/' element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router