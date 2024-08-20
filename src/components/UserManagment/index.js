import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CorrectionReqList from './CorrectionReqList/CorrectionReqList';
import PendingProfile from './PendingProfile/PendingProfileList';
import ApproveProfile from './ApproveProfile/AproveProfileList';
import RejectProfile from './RejectProfile/RejectProfileLst';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

// function LinkTab(props) {
//   return (
//     <Tab
//       component="a"
//       onClick={(event) => {
//         event.preventDefault();
//       }}
//       {...props}
//     />
//   );
// }

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Index = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          style={{backgroundColor:"#2E253D", color:"white"}}
          aria-label="simple tabs example"
        >
           <Tab label="Pending Profile List" {...a11yProps(0)} />
          {/* <Tab label="Correction Profile List" {...a11yProps(1)} /> */}
          <Tab label="Approved Profile List" {...a11yProps(1)} />
          <Tab label="Rejected Profile List" {...a11yProps(2)} />

          {/* <LinkTab label="Pending Profile List" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="Correction Profile List" href="/correction" {...a11yProps(1)} />
          <LinkTab label="Approved Profile List" href="/trash" {...a11yProps(2)} />
          <LinkTab label="Rejected Profile List" href="/spam" {...a11yProps(3)} /> */}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
       <PendingProfile/>
      </TabPanel>
      {/* <TabPanel value={value} index={1}>
       <CorrectionReqList/>
      </TabPanel> */}
      <TabPanel value={value} index={1}>
        <ApproveProfile/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <RejectProfile/>
      </TabPanel>
    </div>
  );
}

export default Index