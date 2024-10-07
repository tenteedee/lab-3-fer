import logo from './logo.svg';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './component/Home';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ServiceDetail from './component/ServiceDetail';
import AddService from './component/AddService';
import EditSevice from './component/EditService';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service/:id" element={<ServiceDetail />} />
        <Route path="/service/add" element={<AddService />} />
        <Route path="/service/edit/:id" element={<EditSevice />} />
      </Routes>
    </Router>
  );
}

export default App;
