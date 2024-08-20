import React, { useContext, useEffect, useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
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
import CloseIcon from "@material-ui/icons/Close";
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
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
const PlanList = () => {
  const classes = useStyles();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [planList, setPlanList] = useState([]);

  const [name, setName] = useState("");
  const [interval, setIntervalCount] = useState(0);
  const [productprice, setAmount] = useState(0);
  const [description, setDescription] = useState("");

  const fetchPlan = async () => {
    try {
      const result = await api.planList();

      const formatPlan = result?.details.map((item) => ({
        id: item.id,
        name: item.product.name,
        interval: item.recurring.interval,
        interval_count: item.recurring.interval_count,
        unit_amount: item.unit_amount/100,
        description: item.product.description,
        productId: item.product.id,
        active : item.active
      }));

      setPlanList(formatPlan);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, []);
  console.log(planList);

  const openView = (data) => {
    setDialogOpen(!dialogOpen);
    // setRowData(data);
  };

  const closeView = () => {
    setDialogOpen(!dialogOpen);
  };

  const editPlan = async (data) => {
    try {
      const result = await api.editPlan(data);

      fetchPlan();
      Notification("Plan Edit Success", "success", 1000);
    } catch (error) {
      AllApplicationErrorHandle(error);
      console.log(error);
    }
  };

  const createPlan = async () => {
    if(!name || !interval || !productprice || !description){
     return Notification("All Fields Are Required", "danger", 1000);

    }
    try {
      const data = { packageName:name, interval: parseInt(interval), productprice: parseFloat(productprice), description };
      const result = await api.createPlan(data);
      fetchPlan();
      Notification("Plan Create Success", "success", 1000);
      closeView()
    } catch (error) {
      AllApplicationErrorHandle(error);
      console.log(error);
    }
  };

  const activeHandle = async (data) => {
    try {
      const result = await api.activatePlan(data);
      fetchPlan();
      Notification("Plan Activated", "success", 1000);
    } catch (error) {
      AllApplicationErrorHandle(error);
      console.log(error);
    }
  };

  const deActiveHandle = async (data) => {
    try {
      const result = await api.deActivePlan(data);
      fetchPlan();
      Notification("Plan Deactivated", "success", 1000);
    } catch (error) {
      AllApplicationErrorHandle(error);
      console.log(error);
    }
  };

  return (
    <div>
      <MaterialTable
        title="Plan List"
        columns={[
          { title: "Plan Name", field: "name" },
          { title: "Interval", editable: false, field: "interval" },
          { title: "interval Count", field: "interval_count" },
          { title: "Amount", field: "unit_amount" },
          {
            title: "Activation",
            field: "id",
            render: (rowData) => (
              <>
              {
                rowData.active ? ( 
                  <span 
                  style={{cursor:'pointer'}}
                  onClick={() => {
                  deActiveHandle({
                      priceId: rowData.id});
                      }}>
                  <ToggleOnIcon fontSize="large" color="secondary"/>
  
                  </span>
                 
                ) : (
                  <span 
                  style={{cursor:'pointer'}}
                  onClick={() => {
                    activeHandle({
                  priceId: rowData.id});
                      }}
                  >
 <ToggleOffIcon fontSize="large"/>
                  </span>
                )
              }
             </>
            ),
          },
        ]}
        data={planList}
        actions={[
     
      
        ]}
        // editable={{
        //   onRowUpdate: (newData, oldData) =>
        //     new Promise((resolve, reject) => {
        //       setTimeout(() => {
        //         // const data = {
        //         //   totalAmount: newData.totalAmount,
        //         // };
        //         editPlan(newData);
        //         resolve();
        //       }, 1000);
        //     }),
        // }}
        options={{
          actionsColumnIndex: -1,     
          pageSize: 12,
          pageSizeOptions:[12],
          padding: "dense",

        }}
    
        components={{
          Toolbar: (props) => (
            <Grid container>
              <Grid item md={12} sm={12}>
                <MTableToolbar {...props} />
              </Grid>

              <Grid item md={12} sm={12} className={classes.btn}>
                <Button variant="contained" color="primary" onClick={openView}>
                  Create Plan
                </Button>
              </Grid>
            </Grid>
          ),
        }}
      />

      <Dialog
        open={dialogOpen}
        onClose={closeView}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Plan</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Plan Name"
            type="text"
            fullWidth
          />
  
          <TextField
            margin="dense"
            value={interval}
            onChange={(e) => setIntervalCount(e.target.value)}
            label="Interval Count"
            type="number"
            fullWidth
          />
          <TextField
            margin="dense"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Description"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            value={productprice}
            onChange={(e) => setAmount(e.target.value)}
            label="Amount"
            type="number"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeView} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={() => createPlan()}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PlanList;
