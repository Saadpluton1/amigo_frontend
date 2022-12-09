import useAuth from 'hooks/useAuth';
import React from 'react'
import { Navigate, Outlet,useLocation } from "react-router-dom";

    function ProtectedRoute() {
        let user = useAuth();
        const {pathname} = useLocation()
      const adminPath = ['/admin-addgenres','/admin-profile', '/admin-artist', '/admin-artistprofile', '/admin-track', '/admin-addtrack', '/admin-genres', '/admin-all-playlist', '/admin-playlist', '/admin-addArtist', '/admin-addUser',"/admin-user"]
      const userPath = ['/profile', '/dashboard-myplaylist', '/myplaylist' ,'/myfavourite']
      const artistPath = ['/profile', '/dashboard-myplaylist', '/dashboard-mytrack','/myplaylist' , '/dashboard-myalbum','/myfavourite','/artist-profile','/my-music']

         if(user?.role === "admin" && adminPath.includes(pathname))
         {
            return <Outlet></Outlet>
         }
         if(user?.role === "user" && userPath.includes(pathname))
         {
            return <Outlet></Outlet>
         }
         if(user?.role === "artist" && artistPath.includes(pathname))
         {
            return <Outlet></Outlet>
         }
            
            
        else{
            return <Navigate to="/Sign-in" state={{ from: pathname }} />;         
        }
        
    }


export default ProtectedRoute
