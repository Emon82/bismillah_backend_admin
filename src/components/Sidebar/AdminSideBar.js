/*eslint-disable*/
import React,{useContext,useEffect} from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";

// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.js";
import RTLNavbarLinks from "components/Navbars/RTLNavbarLinks.js";
import AdminSidebarMenuItem from './AdminSidebarMenuItem'
import SuperAdminSidebarMenuItem from './SuperAdminSideBarMenuItem'
import AuthContext from '../../context/AuthContext/AuthContext'

import styles from "assets/jss/bismillah_marrige/components/sidebarStyle.js";

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();
  const {user,success,login,logout}=useContext(AuthContext)
  const role= localStorage.getItem("role")
  
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  const { color, logo, image, logoText, routes } = props;
  
  var brand = (
    <div className={classes.logo}>
      <a
        href='/'
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive
        })}
    
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        <span >  {logoText}</span>
      
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}

            {user.role==='superAdmin' && <SuperAdminSidebarMenuItem/> } 
          {user.role==='admin' && <AdminSidebarMenuItem/> }   
        
            
          </div>
        
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
          
          {(user.role==='superAdmin' || role=='superAdmin') && <SuperAdminSidebarMenuItem/> } 
          {(user.role==='admin' || role=='admin') && <AdminSidebarMenuItem/> }   
          </div>
        
        </Drawer>
      </Hidden>
    </div>
  );
}


