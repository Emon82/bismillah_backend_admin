import {
  Typography,
  makeStyles,
  Grid,
  Avatar,
  TextField,
  Box,
} from "@material-ui/core";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import * as api from "../../api/index";
import CustomCheckbox from "./Checkbox";
import InputTextField from "./InputText";
import convertAvatarUrl from "../../utlils/convertAvatarUrl";
import Notification from "../../utlils/notification";
import allApplicationErrorHandle from "../../utlils/allApplicationErrorHandle";
const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    padding: "10px",
  },
  avatarSize: {
    height: "150px",
    width: "150px",
    margin: "auto",
    padding: "5px",
  },
  grids: {
    paddingBottom: "30px",
  },
  head: {
    fontSize: "25px",
    fontWeight: 500,
    textAlign: "center",
  },
  top: {
    textAlign: "center",
  },
}));
const EditableProfile = ({ profileId }) => {
  const classes = useStyles();
  const [profile, setProfile] = useState(null);
  const [profileEditable, setEditable] = useState(true);
  const [id, setProfileId] = useState("");
  const [relationship, setRelationship] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [religion, setReligion] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [contact, setContact] = useState("");
  const [addressOne, setAddressOne] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZioCode] = useState("");

  const [profession, setProfession] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [degree, setDegree] = useState("");
  const [designation, setDesignation] = useState("");
  const [institute, setInstatite] = useState("");
  const [income, setAnnualIncome] = useState("");

  const [diet, setDiet] = useState("");
  const [smoke, setSmoke] = useState("");
  const [drink, setDrink] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [skinTone, setSkinTone] = useState("");
  const [bio, setAbout] = useState("");

  const [resendCorrectionReq, setResendCorrectionReq] = useState(false);
  const [correctionItem, setCorrectionItem] = useState([]);
  console.log(correctionItem)

  const addItem = (d) => {
    setCorrectionItem(
      correctionItem.some((name) => name === d)
        ? correctionItem.filter((name) => name !== d)
        : [...correctionItem, d]
    );
  };

  const fetchProfileDetails = async (id) => {
    try {
      const result = await api.profileDetailsUrl(id);
      console.log(result.details)
      if (result.code === 200) {
        setProfile(result.details);
        setProfileId(result.details?.id);
        setCorrectionItem(...correctionItem,result.details?.correctionList)
        setResendCorrectionReq(result.details?.correctionList.length ? true : false)
        setRelationship(result.details?.relationship);
        setFirstName(result.details?.firstName);
        setLastName(result.details?.lastName);
        setReligion(result.details?.religion);
        setGender(result.details?.gender);
        setMaritalStatus(result.details?.maritalStatus);

        setAddressOne(result.details?.addressOne);
        setCity(result.details?.city);
        setState(result.details?.state);
        setCountry(result.details?.country);
        setZioCode(result.details?.zipCode);
        setProfession(result.details?.profession);
        setContact(result.details?.contact);
        setDegree(result.details?.degree);
        setDesignation(result.details?.designation);
        setInstatite(result.details?.institute);
        setCompanyName(result.details?.companyName);
        setAnnualIncome(result.details?.income);
        setDiet(result.details?.diet);
        setHeight(result.details?.height);
        setWeight(result.details?.weight);
        setBodyType(result.details?.bodyType);
        setSkinTone(result.details?.skinTone);
        setAbout(result.details?.bio);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const submitHandle = async () => {
    try {
      const result = await api.editProfileUrl({
        id,
        relationship,
        firstName,
        lastName,
        religion,
        gender,
        maritalStatus,
        contact,
        addressOne,
        city,
        state,
        country,
        zipCode,
      });

      if (result.code == 200) {
        Notification("Edit Success", "success", 1000);
        setProfile(result.details);
        setRelationship(result.details?.relationship);
        setFirstName(result.details?.firstName);
        setLastName(result.details?.lastName);
        setReligion(result.details?.religion);
        setGender(result.details?.gender);
        setMaritalStatus(result.details?.maritalStatus);
        setContact(result.details?.contact);
        setAddressOne(result.details?.addressOne);
        setCity(result.details?.city);
        setState(result.details?.state);
        country(result.details?.country);
        zipCode(result.details?.zipCode);
      }
    } catch (error) {
      // allApplicationErrorHandle(error)
    }
  };

  useEffect(() => {
    fetchProfileDetails(profileId);
  }, []);

  const editHandle = () => {
    setEditable(!profileEditable);
  };

  const handleInputChange = (event) => {
    addItem(event.target.name);
  };

  const correctionReqHandle = async () => {
    try {
      const result = await api.correctionReqUrl(id, correctionItem);
      console.log(result);
      Notification("Request Send", "success", 1000);
      // fetch();
      handleModalClose();
    } catch (error) {
      // allApplicationErrorHandle(error);
      console.log(error);
    }
  };

  return (
    <div className={classes.root}>
      <Grid>
        <Button className={classes.top} onClick={() => editHandle()}>
          Edit
        </Button>
      </Grid>
      <Grid container>
        <Avatar
          alt="Cindy Baker"
          src={convertAvatarUrl(profile?.avatar)}
          className={classes.avatarSize}
        />
      </Grid>
      <Grid>
        <Typography className={classes.head}>Profile Details</Typography>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} direction="row">
          <TextField
            size="small"
            name="relationship"
            disabled={profileEditable}
            variant="outlined"
            required
            fullWidth
            label="Relationship"
            autoFocus
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
          />
          <CustomCheckbox
            checked={correctionItem.includes('relationship')}
            label="Relationship"
            name="relationship"
            value={relationship}
            handleInputChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            size="small"
            disabled={profileEditable}
            name="First Name"
            variant="outlined"
            required
            fullWidth
            label="First Name"
            autoFocus
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <CustomCheckbox
            name="firstName"
            label="First Name"
            value={firstName}
            checked={correctionItem.includes('firstName')}
            handleInputChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            disabled={profileEditable}
            size="small"
            name="lastName"
            disabled="true"
            variant="outlined"
            required
            fullWidth
            label="Last Name"
            autoFocus
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <CustomCheckbox
            name="lastName"
            label="Last Name"
            value={lastName}
            checked={correctionItem.includes('lastName')}
            handleInputChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={profileEditable}
            size="small"
            variant="outlined"
            required
            fullWidth
            label="Religion"
            autoFocus
            value={religion}
            onChange={(e) => setReligion(e.target.value)}
          />
          <CustomCheckbox
            name="religion"
            label="Religion"
            value={religion}
            checked={correctionItem.includes('religion')}
            handleInputChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            disabled={profileEditable}
            size="small"
            name="gender"
            disabled="true"
            variant="outlined"
            required
            fullWidth
            label="Gender"
            autoFocus
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <CustomCheckbox
            name="gender"
            label="Gender"
            value={gender}
            checked={correctionItem.includes('gender')}
            handleInputChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={profileEditable}
            size="small"
            variant="outlined"
            required
            fullWidth
            label="Marital Status"
            autoFocus
            value={maritalStatus}
            onChange={(e) => setMaritalStatus(e.target.value)}
          />
          <CustomCheckbox
            name="maritalStatus"
            label="Marital Status"
            value={maritalStatus}
            checked={correctionItem.includes('maritalStatus')}
            handleInputChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            disabled={profileEditable}
            size="small"
            name="contact"
            disabled="true"
            variant="outlined"
            required
            fullWidth
            label="Contact"
            autoFocus
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <CustomCheckbox
            name="contact"
            label="Contact"
            value={contact}
            checked={correctionItem.includes('contact')}
            handleInputChange={handleInputChange}
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={profileEditable}
            size="small"
            name="addressOne"
            variant="outlined"
            required
            fullWidth
            label="Address One"
            autoFocus
            value={addressOne}
            onChange={(e) => setAddressOne(e.target.value)}
          />
          <CustomCheckbox
            name="addressOne"
            label="Address One"
            value={addressOne}
            checked={correctionItem.includes('addressOne')}
            handleInputChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            disabled={profileEditable}
            size="small"
            name="city"
            disabled="true"
            variant="outlined"
            required
            fullWidth
            label="City"
            autoFocus
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <CustomCheckbox
            name="city"
            label="City"
            value={city}
            checked={correctionItem.includes('city')}
            handleInputChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={profileEditable}
            size="small"
            name="companyOwner"
            variant="outlined"
            required
            fullWidth
            label="state"
            autoFocus
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <CustomCheckbox
            name="state"
            label="State"
            value={state}
            checked={correctionItem.includes('state')}
            handleInputChange={handleInputChange}
          />
        </Grid>


        <Grid item xs={12} sm={6}>
          <TextField
            disabled={profileEditable}
            size="small"
            variant="outlined"
            required
            fullWidth
            label="Profession"
            autoFocus
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
          />
 
          <CustomCheckbox
            name="profession"
            label="Profession"
            value={profession}
            checked={correctionItem.includes('profession')}
            handleInputChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            disabled={profileEditable}
            size="small"
            variant="outlined"
            required
            fullWidth
            label="Degree"
            autoFocus
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
          />

          <CustomCheckbox
            name="degree"
            label="Degree"
            value={degree}
            checked={correctionItem.includes('degree')}
            handleInputChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            disabled={profileEditable}
            size="small"
            variant="outlined"
            required
            fullWidth
            label="Designation"
            autoFocus
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />

          <CustomCheckbox
            name="designation"
            label="Designation"
            value={designation}
            checked={correctionItem.includes('designation')}
            handleInputChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            disabled={profileEditable}
            size="small"
            variant="outlined"
            required
            fullWidth
            label="CompanyName"
            autoFocus
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />

          <CustomCheckbox
            name="companyName"
            label="Company Name"
            value={companyName}
            checked={correctionItem.includes('companyName')}
            handleInputChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            disabled={profileEditable}
            size="small"
            variant="outlined"
            required
            fullWidth
            label="Institute"
            autoFocus
            value={institute}
            onChange={(e) => setInstatite(e.target.value)}
          />

          <CustomCheckbox
            name="institute"
            label="Institute"
            value={institute}
            checked={correctionItem.includes('institute')}
            handleInputChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            disabled={profileEditable}
            size="small"
            variant="outlined"
            required
            fullWidth
            label="Income"
            autoFocus
            value={income}
            onChange={(e) => setAnnualIncome(e.target.value)}
          />

          <CustomCheckbox
            name="income"
            label="Income"
            value={income}
            checked={correctionItem.includes('income')}
            handleInputChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            disabled={profileEditable}
            size="small"
            variant="outlined"
            required
            fullWidth
            label="Diet"
            autoFocus
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
          />

          <CustomCheckbox
            name="diet"
            label="Diet"
            value={diet}
            checked={correctionItem.includes('diet')}
            handleInputChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            disabled={profileEditable}
            size="small"
            variant="outlined"
            required
            fullWidth
            label="Height"
            autoFocus
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />

          <CustomCheckbox
            name="height"
            label="Height"
            value={height}
            checked={correctionItem.includes('height')}
            handleInputChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            disabled={profileEditable}
            size="small"
            variant="outlined"
            required
            fullWidth
            label="Weight"
            autoFocus
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          <CustomCheckbox
            name="weight"
            label="Weight"
            value={weight}
            checked={correctionItem.includes('weight')}
            handleInputChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            disabled={profileEditable}
            size="small"
            variant="outlined"
            required
            fullWidth
            label="Bio"
            autoFocus
            value={bio}
            onChange={(e) => setAbout(e.target.value)}
          />

          <CustomCheckbox
            name="bio"
            label="Bio"
            value={bio}
            checked={correctionItem.includes('bio')}
            handleInputChange={handleInputChange}
          />
        </Grid>

        <Grid></Grid>
      </Grid>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          color="primary"
          variant="contained"
          disabled={correctionItem.length ? false : true}
          onClick={() => correctionReqHandle()}
        >
          
          {!resendCorrectionReq ? 'Send Correction Request' : 'Resend Correction Request' }
        </Button>

        <Button
          style={{ marginLeft: "2px" }}
          color="primary"
          variant="contained"
          disabled={profileEditable}
          onClick={() => submitHandle()}
        >
          Update
        </Button>
      </Box>
    </div>
  );
};

export default EditableProfile;
