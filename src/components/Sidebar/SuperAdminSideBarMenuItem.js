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
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import GroupIcon from '@material-ui/icons/Group';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import AssessmentIcon from '@material-ui/icons/Assessment';
import MoneyIcon from '@material-ui/icons/Money';
import CreditCardIcon from '@material-ui/icons/CreditCard';
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
        <ListItemText primary="Super Admin Dashboard" />
      </ListItem>
      </Link>
     

      <Link to="/admin/branch-list"  className={classes.linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <AccountBalanceIcon />
        </ListItemIcon>
        <ListItemText primary="Branch" />
      </ListItem>
      </Link>

      <Link to="/admin/admin-list"  className={classes.linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary="Admin" />
      </ListItem>
      </Link>

      <Link to="/admin/customer-list"  className={classes.linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Customer" />
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

      <Link to="/admin/employee"  className={classes.linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <GroupIcon />
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

      <Link to="/admin/branch-report"  className={classes.linkStyle}>
      <ListItem button>
        <ListItemIcon>
        <AssessmentIcon />
        </ListItemIcon>
        <ListItemText primary="Branch Report" />
      </ListItem>
      </Link>  

      <Link to="/admin/service-charge"  className={classes.linkStyle}>
      <ListItem button>
        <ListItemIcon>
        <MoneyIcon />
        </ListItemIcon>
        <ListItemText primary="Service Charge" />
      </ListItem>
      </Link>  
    </List>
  );
}