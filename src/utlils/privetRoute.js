import React,{useContext} from 'react'
import { useSelector } from 'react-redux'
import {Route,Redirect} from 'react-router-dom'

const PrivateRoute=({component: Component, ...rest})=>{
    const isAuthenticated = useSelector((state) => state.adminState.isAuthenticated);
    return(
   <Route
   {...rest}
   render={props=> !isAuthenticated? (<Redirect to='/'/>) : (<Component {...props} />)}
   
   />
    )
    
}

export default PrivateRoute