import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Button, TextField, Container, Typography, Paper } from '@mui/material';
import { updateHouseDetails } from '../../services/houseService'; 
import * as Yup from 'yup';

interface HouseDetail {
  id: number;
  address: string;
  currentValue: number;
  loanAmount: number;
  risk: number;
}

interface HouseUpdateFormProps {
  house: HouseDetail;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdateSuccess: (isSuccess: boolean) => void;
}

const HouseUpdateForm: React.FC<HouseUpdateFormProps> = ({ house, setEditMode, onUpdateSuccess  }) => {
   
  const formik = useFormik({
    initialValues: {
      address: house.address,
      currentValue: house.currentValue.toString(),
      loanAmount: house.loanAmount.toString(),
    },
    validationSchema: Yup.object({
      address: Yup.string().required('Address is required'),
      currentValue: Yup.number().typeError('Please enter a valid number').required('Current Value is required'),
      loanAmount: Yup.number().typeError('Please enter a valid number').required('Loan Amount is required'),
    }),
    onSubmit: async (values) => {
      try {
        await updateHouseDetails(house.id, values);
        setEditMode(false); // Exit edit mode
        onUpdateSuccess(true);
      } catch (error) {
        onUpdateSuccess(false);
      }
    },
  });

  return (
    <Container component={Paper} maxWidth="xs" sx={{ padding: 3, marginTop: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Update House Details
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          label="Address"
          name="address"
          variant="outlined"
          margin="normal"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />
        <TextField
          fullWidth
          label="Current Value"
          name="currentValue"
          variant="outlined"
          margin="normal"
          type="number"
          value={formik.values.currentValue}
          onChange={formik.handleChange}
          error={formik.touched.currentValue && Boolean(formik.errors.currentValue)}
          helperText={formik.touched.currentValue && formik.errors.currentValue}
        />
        <TextField
          fullWidth
          label="Loan Amount"
          name="loanAmount"
          variant="outlined"
          margin="normal"
          type="number"
          value={formik.values.loanAmount}
          onChange={formik.handleChange}
          error={formik.touched.loanAmount && Boolean(formik.errors.loanAmount)}
          helperText={formik.touched.loanAmount && formik.errors.loanAmount}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update
        </Button>
        <Button
          type="button"
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={() => setEditMode(false)}
          sx={{ marginTop: 2 }}
        >
          Cancel
        </Button>
      </form>
    </Container>
  );
};

export default HouseUpdateForm;
