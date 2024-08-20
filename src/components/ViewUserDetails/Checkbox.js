import React from "react";
import {
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

const CheckBox = (props) => {
  const {
    label,
    name,
    value,
    checked,
    handleInputChange
  } = props;

  
  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            value={value}
            checked={checked}
            onChange={handleInputChange}
            name={name}
          />
        }
        label={label}
      />
    </div>
  );
}

export default CheckBox;