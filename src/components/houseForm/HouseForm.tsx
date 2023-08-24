import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Button, TextField, Container, Typography, Paper } from '@mui/material';
import * as Yup from 'yup'; 
import { useNavigate } from 'react-router-dom';
import Snackbar from '../common/Snackbar'; 
import houseService from '../../services/houseService';
import useSnackbar from '../../hooks/useSnackbar';

const HouseForm: React.FC = () => {
    const navigate = useNavigate();
    const [createdHouseId, setCreatedHouseId] = useState<number | null>(null);
    const { snackbarInfo, openSnackbar, closeSnackbar } = useSnackbar(); // Use the custom hook

  // Handle navigation to view details
    const handleViewDetails = () => {
        if (createdHouseId !== null) {
          navigate(`/houses/${createdHouseId}`);
        }
      };

 // Form handling using Formik
  const formik = useFormik({
    initialValues: {
      address: '',
      currentValue: '',
    },
    validationSchema: Yup.object({
      address: Yup.string().required('Address is required'),
      currentValue: Yup.number().typeError('Please enter a valid number').required('Current Value is required'),
    }),
    onSubmit: async (values) => {
      try {
        // Call the createHouse function from the service
        const newHouse = await houseService.createHouse(values);
        if(newHouse.id){
             // Set the created house ID and show success snackbar
            setCreatedHouseId(newHouse.id);      
            openSnackbar('House details created successfully!', 'success');
            formik.resetForm();
        }
     else openSnackbar('Error creating house details', 'error');
      } 
      catch (error) {
        openSnackbar('Error creating house details', 'error');
      }
    },
  });

  return (
    <Container component={Paper} maxWidth="xs" sx={{ padding: 3, marginTop: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Create New House
      </Typography>
      {createdHouseId !== null ? (
        <div>
          <Typography variant="body1" align="center" gutterBottom>
            House created successfully with ID: {createdHouseId}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleViewDetails}
            fullWidth
          >
            View House Details
          </Button>
        </div>
      ) : (
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
        <Button type="submit" variant="contained" color="primary" fullWidth  disabled={formik.isSubmitting}>
          Submit
        </Button>
      </form>)}
     {/* Snackbar component for displaying messages */}
     <Snackbar
         open={snackbarInfo?.open || false}
         message={snackbarInfo?.message || ''}
         severity={snackbarInfo?.severity || 'success'}
         onClose={closeSnackbar}
      />
    </Container>
  );
};

export default HouseForm;
