import React from "react";

import { TextField, Grid } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { transform } from "framer-motion";

const FormInput = ({ name, label }) => {
  const { control } = useFormContext();

  const isError = false;

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        defaultValue=""
        as={TextField}
        control={control}
        fullWidth
        name={name}
        render={({ field }) => (
          <TextField
            fullWidth
            value={field.value}
            label={label}
            required
            error={isError}
            onChange={field.onChange}
          />
        )}
      />
    </Grid>
  );
};

export default FormInput;
