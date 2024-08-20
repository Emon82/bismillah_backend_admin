import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { logIn,loadAdmin} from '../../redux/actions/adminAction';
import {
  Grid,
  Box,
  Container,
  Avatar,
  Typography,
  makeStyles,
  Button,
  CssBaseline,
  TextField,
  InputLabel,
  Select,
  Paper,
  FormControl,
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "100px",
  },

  paper: {
    marginBottom: "90px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "25px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    marginTop: "10px",
    width: "100%",
    minHeight: "60px",
  },
}));

const Login = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.adminState.isAuthenticated);
  useEffect(() => {
      dispatch(loadAdmin())
      if (isAuthenticated) {
          history.push('/admin');
      }
      // eslint-disable-next-line
  }, [isAuthenticated])

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;


  const onSubmit = (e) => {
    e.preventDefault();
    const identity = email
    dispatch(logIn({identity , password }));
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item md={3} sm={12} xs={12}></Grid>

        <Grid item md={6} sm={12} xs={12}>
          <Container component="main" maxWidth="xs" className={classes.main}>
            <Paper elevation={5}>
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Login your dashboard
                </Typography>
                <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
                  <TextField
                    size="small"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={(e) => onChange(e)}
                  />
                  <TextField
                    size="small"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    name="password"
                    value={password}
                    InputProps={{ // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    onChange={(e) => onChange(e)}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Login
                  </Button>
                </form>
              </div>
              <Box mt={8}></Box>
            </Paper>
          </Container>
        </Grid>

        <Grid item md={3} sm={12} xs={12}></Grid>
      </Grid>
    </div>
  );
};
export default withRouter(Login);
