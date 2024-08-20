import React, { useContext, useEffect, useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import {
  makeStyles,
  Button,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Grid,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Radio from "@material-ui/core/Radio";
import AddIcon from "@material-ui/icons/Add";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AdminContext from "../../../context/AdminContext/AdminContext";
import BranchContext from "../../../context/BranchContext/BranchContext";
import "../../../style.css";
import AuthContext from "context/AuthContext/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {},
  activeColor: {
    backgroundColor: "#35ab8f",
  },
  editButton: {
    margin: "5px",
  },
  deleteButton: {
    margin: "5px",
  },
  role: {
    marginTop: "20px",
  },
  autocomplete: {
    marginTop: "50px",
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
const ManagerList = () => {
  const classes = useStyles();
  const {
    allmanager,
    getAllManager,
    success,
    addNewAdmin,
    addNewManager,
    updateAdmin,
    deleteAdmin,
  } = useContext(AdminContext);
  const { branches, getBranches } = useContext(BranchContext);
  const {user}=useContext(AuthContext)

  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [name, setName] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState(null);
  const [branch, setBranchName] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    if(role==='manager'){
      addNewManager({
        name,
        mobile,
        email,
        address,
        branch,
        role,
        password,
        confirmPassword,
      });
    }else if(role==='admin')
    addNewAdmin({
      email,
      password
    });
  };

  console.log(allmanager)

  useEffect(() => {
    getAllManager();
    getBranches();
  }, []);

  const handleBranchName = (e, v) => {
    if (v) {
      setBranchName(v._id);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Admin</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          <TextField
            margin="dense"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            label="Phone"
            type="number"
            fullWidth
            required
          />
          <TextField
            margin="dense"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            required
          />

          <TextField
            margin="dense"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            id="Address"
            label="Address"
            type="text"
            fullWidth
            required
          />

          <Grid container>
            <Grid item md={4} sm={12} className={classes.role}>
              <FormLabel component="legend">Role</FormLabel>
              <RadioGroup
                row
                aria-label="position"
                name="position"
                defaultValue="top"
                onChange={(e) => setRole(e.target.value)}
              >
                
                {user && user.role==='superAdmin' && (
                  <FormControlLabel
                  value="admin"
                  control={<Radio color="primary" />}
                  label="Admin"
                  labelPlacement="admin"
                />
                )}
                <FormControlLabel
                  value="manager"
                  control={<Radio color="primary" />}
                  label="Maneger"
                  labelPlacement="employee"
                />
              </RadioGroup>
            </Grid>

            <Grid item md={8} sm={12} className={classes.autocomplete}>
              <Autocomplete
                id="combo-box-demo"
                onChange={(e, v) => handleBranchName(e, v)}
                options={branches}
                getOptionLabel={(option) => option.branchName}
                style={{ width: 250 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select branch"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
          </Grid>

          <TextField
            required
            margin="dense"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type="password"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="confirmpassword"
            label="Confirm Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <MaterialTable
        title="Branch Manager List"
        columns={[
          { title: "Name", field: "name" },
          { title: "Mobile", field: "mobile" },
          { title: "Email", field: "email" },
          { title: "Address", field: "address" },
          {
            title: "isActivate",
            field: "isActivate",
            lookup: { true: "True", false: "False" },
          },
          { title: "Branch", field: "branch.branchName", editable: "never" },
        ]}
        data={allmanager}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                // const dataUpdate = [...data];
                // const index = oldData.tableData.id;
                // dataUpdate[index] = newData;
                // setData([...dataUpdate]);
                const updatedData = {
                  name: newData.name,
                  mobile: newData.mobile,
                  email: newData.email,
                  address: newData.address,
                  isActivate: newData.isActivate,
                };
                console.log(newData);
                updateAdmin(newData._id, updatedData);

                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                // const dataDelete = [...bookings];
                // const index = oldData.tableData.id;
                // console.log(oldData.tableData);
                // dataDelete.splice(index, 1);
                // // setBookingsDataFromContext([...dataDelete]);

                deleteAdmin(oldData._id);
                resolve();
              }, 1000);
            }),
        }}
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClickOpen}
                >
                  <AddIcon />
                  Add Branch Manager
                </Button>
              </Grid>
            </Grid>
          ),
        }}
      />
    </div>
  );
};

export default ManagerList;
