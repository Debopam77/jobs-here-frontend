import React, {useState, useEffect} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Axios from 'axios'
import Home from '../components/Home'
import Navbar from '../components/Navbar'
import Employees from '../components/Employees' 
import Recruiters from '../components/Recruiters'
import Jobs from '../components/Jobs'
import AboutUs from '../components/AboutUs'
import Search from '../components/Search'
import Login from '../components/Login'

function Router () {
    
    return (
        <BrowserRouter>
        <Navbar/>
            <Routes>
                {
                    //New bullshit way to declare routes, use Routes instead of switch, and have the whole Component Tag
                }
                <Route path='/employee' element={<Employees/>}/>
                <Route path='/recruiter' element={<Recruiters/>}/>
                <Route path='/Search' element={<Search/>}/>
                <Route path='/jobListings' element={<Jobs/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/aboutUs' element={<AboutUs/>}/>
                <Route path='/' element={<Home sure='Yes'/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router