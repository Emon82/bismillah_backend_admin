import React, { useContext, useEffect, useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import moment from "moment";
import {
  AppBar,
  Slide,
  Box,
  Typography,
  Toolbar,
  IconButton,
  makeStyles,
  Button,
  Grid,
} from "@material-ui/core";
import * as api from "../../api/index";
import Notification from '../../utlils/notification';
import AllApplicationErrorHandle from '../../utlils/allApplicationErrorHandle';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {},
  customBar: {
    display: "flex",
  },
  activeColor: {
    backgroundColor: "#35ab8f",
  },

  addButton: {
    paddingBottom: "2px",
    textAlign: "center",
  },
  btn: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "25px",
  },
}));
const GoldUser = () => {
  const classes = useStyles();

  const [sliverUserList, setSliverUser] = useState([]);

console.log(sliverUserList)


  const fetchSliverUserList = async () => {
    try {
      const result = await api.sliverUserListUrl();
     console.log(result)
 

      setSliverUser(result?.details);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSliverUserList();
  }, []);






  return (
    <div>
      <MaterialTable
        title="Sliver User List"
        columns={[
          { title: "User Name", field: "name" },
          { title: "Email", field: "email" },
          { title: "Phone", field: "phone" },
          {
            title: "Join Date",
            editable: "false",
            field: "created",
            render: (rowData) =>
              moment(rowData.joined).format("D-M-YYYY, h:mm a"),
          },
          { title: "Package Name", field: "subscriptionTier" },
          {
            title: "Premium Since",
            editable: "false",
            field: "premiumSince",
            render: (rowData) =>
              moment(rowData.premiumSince).format("D-M-YYYY, h:mm a"),
          },

          
        //   {
        //     title: "Make Promote",
        //     editable: "false",
        //     field: "scopes",
        //     render: (rowData) =>
        //      (<div>{rowData?.scopes.includes('PREMIUM') && rowData.subscriptionId ? <span>Subscriber</span> : rowData?.scopes.includes('PREMIUM') && !rowData.subscriptionId ? <Button onClick={()=>demoteSubmit(rowData.id)}>Demote</Button> : <Button variant="contained" size="small" color="primary"  onClick={()=>handlePermaneltlyPromotePopUp(rowData.id)}>promote</Button>}</div>)
        //   },

   

        ]}
        data={sliverUserList}
        actions={[
     
      
        ]}

        options={{
          actionsColumnIndex: -1,     
          pageSize: 12,
          pageSizeOptions:[12],
          padding: "dense",

        }}
    
      />



    </div>
  );
};

export default GoldUser;
