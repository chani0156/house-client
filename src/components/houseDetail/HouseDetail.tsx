import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import HouseUpdateForm from '../houseUpdateForm/HouseUpdateForm'; 
import { Container, Paper, Typography, Button } from '@mui/material';
import Snackbar from '../common/Snackbar';
import houseService from '../../services/houseService';
import useSnackbar from '../../hooks/useSnackbar';

// Interface to define the structure of house details
interface HouseDetail {
  id: number;
  address: string;
  currentValue: number;
  loanAmount: number;
  risk: number;
}

const HouseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [house, setHouse] = useState<HouseDetail | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const { snackbarInfo, openSnackbar, closeSnackbar } = useSnackbar(); // Use the custom hook

    // Fetch house details from API based on the ID parameter
  useEffect(() => {
    async function fetchHouseDetails() {
      try {
        const fetchedHouse = await houseService.getHouseById(Number(id));
        setHouse(fetchedHouse);
      } catch (error) {
        openSnackbar('Error updating house details', 'error');      }
    }
    fetchHouseDetails();
  }, [id,isUpdateSuccess]);

  const handleEditClick = () => {
    setIsUpdateSuccess(false);
    setEditMode(true);
  };
  const handleUpdateSuccess = async (isSuccess: boolean) => {
    try {
        if(isSuccess){
            setIsUpdateSuccess(true);
            openSnackbar('House details updated successfully!', 'success');
            setEditMode(false);
        }
        else openSnackbar('Error updating house details', 'error');

    } catch (error) {
      console.error('Error fetching updated house details:', error);
    }
  };

  return (
    <>{house?
    <Container component={Paper} maxWidth="xs" sx={{ padding: 3, marginTop: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        House Details
      </Typography>
      {editMode ? (
        <HouseUpdateForm house={house} setEditMode={setEditMode} onUpdateSuccess={handleUpdateSuccess}/>
      ) : (
        <div>
          <Typography>ID: {house.id}</Typography>
          <Typography>Address: {house.address}</Typography>
          <Typography>Current Value: {house.currentValue}</Typography>
          <Typography>Loan Amount: {house.loanAmount}</Typography>
          <Typography>Risk: {house.risk}</Typography>
          <Button variant="contained" color="primary" onClick={handleEditClick} fullWidth>
            Edit
          </Button>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" color="secondary" fullWidth sx={{ marginTop: 2 }}>
              Back 
            </Button>
          </Link>
        </div>
      )}
       <Snackbar
         open={snackbarInfo?.open || false}
         message={snackbarInfo?.message || ''}
         severity={snackbarInfo?.severity || 'success'}
         onClose={closeSnackbar}
      />
    </Container>:
     <div>Loading...</div>
}</>
  );
};

export default HouseDetail;
