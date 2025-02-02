import React,{useContext,useEffect} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux'
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Avatar from '@material-ui/core/Avatar';
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
// import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import { logout} from '../../redux/actions/adminAction';
import styles from "assets/jss/bismillah_marrige/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

const AdminNavbarLinks=()=> {
  let history = useHistory();
  const dispatch = useDispatch();
  const adminState = useSelector((state) => state.adminState);
  const classes = useStyles();
  const [openNotification, setOpenNotification] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(null);
  const handleClickNotification = event => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };

  // useEffect(() => {
  //   const dashboard=localStorage.getItem("dashboard")
  //   if(dashboard=='authorDashboard'){
  //     loadUser("authorDashboard")
  //   }else{
  //     loadUser("branchDashboard")
  //   }
  // }, [])
   
  
  const logoutHandler=()=>{
      dispatch(logout())
       history.push('/')
  }


  return (
    <div>
      {/* <div className={classes.searchWrapper}>
        <CustomInput
          formControlProps={{
            className: classes.margin + " " + classes.search
          }}
          inputProps={{
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search"
            }
          }}
        />
        <Button color="white" aria-label="edit" justIcon round>
          <Search />
        </Button>
      </div> */}
      <Button
        color={window.innerWidth > 959 ? "transparent" : "white"}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-label="Dashboard"
        className={classes.buttonLink}
      >
        <Dashboard className={classes.icons} />
        <Hidden mdUp implementation="css">
          <p className={classes.linkText}>Dashboard</p>
        </Hidden>
      </Button>
      <div className={classes.manager}>
      <p style={{color:"black",marginRight:'20px', fontWeight:"bold"}}> Hello, {adminState?.admin?.name}</p>
        </div>
  
      <div className={classes.manager}>
    
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
         
          <Avatar  style={{width:"30px", height:"30px"}} alt="Remy Sharp" src="data:image/jpeg;base64,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" />
          {/* <Person className={classes.icons} /> */}
          <Hidden mdUp implementation="css">
           
            {/* <p className={classes.linkText}>Profile</p> */}
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    {/* <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}
                    >
                      Profile
                    </MenuItem> */}
                    {/* <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}
                    >
                      Settings
                    </MenuItem> */}
                    <Divider light />
                    <MenuItem
                      onClick={logoutHandler}
                      className={classes.dropdownItem}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}

export default  AdminNavbarLinks
