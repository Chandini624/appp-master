// src/components/PatientsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [filterText, setFilterText] = useState('');
   const [showModal, setShowModal] = useState(false);
    const [newPatient, setNewPatient] = useState({
      doctorSpecialistName: '',
      doctorAvailabletime: '',
      doctorslot: '',
      doctorfee: '',
    });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:7771/api/paitients/all');
      setPatients(response.data);
      setFilteredPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterText(value);
    const filtered = patients.filter((patient) =>
      patient.patientName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

  const resetForm = () => {
    setShowModal(false);
    setNewPatient({
      doctorSpecialistName: '',
      doctorAvailabletime: '',
      doctorslot: '',
      doctorfee: '',
    });
  };
  

  return (
    <div style={{ padding: '30px' }}>
      <h2>Patients List</h2>
      <input
        type="text"
        placeholder="Filter by Name..."
        value={filterText}
        onChange={handleFilterChange}
        style={{ marginBottom: '20px', padding: '30px' }}
      />
      <button className="btn btn-primary create-btn" onClick={() => setShowModal(true)}>
  <i className="bi bi-plus-circle me-2"></i> Create
</button>



      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Address</th>
            <th>Prescription</th>
            <th>Appointment Date</th>
            <th>Admit Date</th>
            <th>Discharge Date</th>
            <th>Ward No</th>
            <th>Nurse Assigned</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient.patientId}>
              <td>{patient.patientId}</td>
              <td>{patient.patientName}</td>
              <td>{patient.patientEmailId}</td>
              <td>{patient.patientmobileNo}</td>
              <td>{patient.patientAddress}</td>
              <td>{patient.patientPrescription}</td>
              <td>{patient.patientAppointmentdate}</td>
              <td>{patient.patientAdmitdate}</td>
              <td>{patient.patientDischargedate}</td>
              <td>{patient.patientWardnum}</td>
              <td>{patient.patientNurseassign}</td>
            </tr>
            
          ))}
          

        </tbody>
      </table>
    </div>
  );
};

export default PatientsPage;
