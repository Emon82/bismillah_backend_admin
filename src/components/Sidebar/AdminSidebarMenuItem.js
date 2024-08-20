import React from 'react';
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import PeopleIcon from '@material-ui/icons/People';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import AssessmentIcon from '@material-ui/icons/Assessment';
import {admin} from '../../routes'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
  
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  linkStyle:{
      color:"black"
  }
}));

export default function NestedList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
     
        <Link to="/admin/dashboard"  className={classes.linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Admin Dashboard" />
      </ListItem>
      </Link>
     
      <Link to="/admin/booking-list"  className={classes.linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <FeaturedPlayListIcon />
        </ListItemIcon>
        <ListItemText primary="Booking" />
      </ListItem>
      </Link>

      <Link to="/admin/customer"  className={classes.linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Customer" />
      </ListItem>
      </Link>

      <Link to="/admin/employee"  className={classes.linkStyle}>
      <ListItem button>
        <ListItemIcon>
        <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Employee" />
      </ListItem>
      </Link>

    
      
      <Link to="/admin/transportation"  className={classes.linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <LocalShippingIcon />
        </ListItemIcon>
        <ListItemText primary="Transportation" />
      </ListItem>
      </Link>

      <Link to="/admin/load-parcel"  className={classes.linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <AddShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Load Parcel" />
      </ListItem>
      </Link>
      <Link to="/admin/unload-parcel"  className={classes.linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <RemoveShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Unload Parcel" />
      </ListItem>
      </Link>

      <Link to="/admin/deliver-parcel"  className={classes.linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <EmojiTransportationIcon />
        </ListItemIcon>
        <ListItemText primary="Deliver parcel" />
      </ListItem>
      </Link>

      <Link to="/admin/income-table"  className={classes.linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <CreditCardIcon />
        </ListItemIcon>
        <ListItemText primary="Income" />
      </ListItem>
      </Link>

      <Link to="/admin/payment-table"  className={classes.linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <CreditCardIcon />
        </ListItemIcon>
        <ListItemText primary="Expense" />
      </ListItem>
      </Link>

     <Link to="/admin/report"  className={classes.linkStyle}> 
      <ListItem button>
        <ListItemIcon>
          <AssessmentIcon />
        </ListItemIcon>
        <ListItemText primary="Report" />
      </ListItem>
     </Link>
      
      
      {/* <ListItem button onClick={handleClick}  className={classes.linkStyle}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Extra" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItem>
        </List>
      </Collapse> */}
    </List>
  );
}