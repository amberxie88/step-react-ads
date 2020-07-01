import React from 'react';

import TextField from '@material-ui/core/TextField';

export default function Query() {
  return (
    <TextField
      id="standard-full-width"
      label="Enter Query"
      style={{ margin: 8 }}
      placeholder="Placeholder"
      helperText="helper text"
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}
