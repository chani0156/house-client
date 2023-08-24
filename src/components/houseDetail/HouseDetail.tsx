import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHouseById } from '../../services/houseService';
import HouseUpdateForm from '../houseUpdateForm/HouseUpdateForm'; 
import { Container, Paper, Typography, Button } from '@mui/material';
import Snacknar from '../common/Snacknar';

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
  const [snackbarInfo, setSnackbarInfo] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleSnackbarClose = () => {
    setSnackbarInfo((prevInfo) => ({ ...prevInfo, open: false }));
  };

  const openSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbarInfo({
      open: true,
      message,
      severity,
    });
  };
  useEffect(() => {
    async function fetchHouseDetails() {
      try {
        const fetchedHouse = await getHouseById(Number(id));
        setHouse(fetchedHouse);
      } catch (error) {
        console.error('Error fetching house details:', error);
      }
    }

    fetchHouseDetails();
  }, [id]);

  const handleEditClick = () => {
    setEditMode(true);
  };
  const handleUpdateSuccess = async (isSuccess: boolean) => {
    try {
        if(isSuccess){
            openSnackbar('House details updated successfully!', 'success');
            const updatedHouse = await getHouseById(Number(id));
            setHouse(updatedHouse);
            setEditMode(false);
        }
        else openSnackbar('Error updating house details', 'error');

     
    } catch (error) {
      console.error('Error fetching updated house details:', error);
    }
  };
  if (!house) {
    return <div>Loading...</div>;
  }

  return (
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
          {/* Add other details here */}
          <Button variant="contained" color="primary" onClick={handleEditClick} fullWidth>
            Edit
          </Button>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" color="secondary" fullWidth sx={{ marginTop: 2 }}>
              Back to List
            </Button>
          </Link>
        </div>
      )}
       <Snacknar
         open={snackbarInfo.open}
         message={snackbarInfo.message}
         severity={snackbarInfo.severity}
         onClose={handleSnackbarClose}
      />
    </Container>
  );
};

export default HouseDetail;