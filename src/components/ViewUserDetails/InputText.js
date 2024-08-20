import React from "react";
import {
  TextField,
} from '@material-ui/core';

const textInput = (props) => {

  const {
    name,
    value,
    label,
    handleInputTextChange,
    profileEditable
  } = props;

  
  return (
    <div>
          <TextField
          size="small"
          name={name}
          disabled={profileEditable}
          variant="outlined"
          required
          fullWidth
          label={label}
          autoFocus
          value={value}
          onChange={handleInputTextChange}

        />
     
    </div>
  );
}

export default textInput;