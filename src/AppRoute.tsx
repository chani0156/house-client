import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HouseDetail from './components/houseDetail/HouseDetail';
import HouseForm from './components/houseForm/HouseForm';

const AppRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HouseForm />} />
      <Route path="/houses/:id" element={<HouseDetail />} />
    </Routes>
  );
};

export default AppRoute;
