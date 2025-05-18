import React, { useState, useEffect } from 'react';
import './AdmitForm.css';

const AdmitForm = () => {
  const [form, setForm] = useState({
    patientId: '',
    patientName: '',
    patientEmailId: '',
    patientmobileNo: '',
    patientAddress: '',
    patientPrescription: '',
    patientAppointmentdate: '',
    patientAdmitdate: '',
    patientWardnum: '',
    patientDischargedate: '',
    patientNurseassign: ''
  });

  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // 🔍 Search state
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch('http://localhost:7771/api/patients');
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:7771/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error('Failed to submit form');

      fetchPatients();
      setForm({
        patientId: '',
        patientName: '',
        patientEmailId: '',
        patientmobileNo: '',
        patientAddress: '',
        patientPrescription: '',
        patientAppointmentdate: '',
        patientAdmitdate: '',
        patientWardnum: '',
        patientDischargedate: '',
        patientNurseassign: ''
      });
      setShowForm(false);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  // 🔍 Filter patients by search term (name, email, mobile)
  const filteredPatients = patients.filter((p) =>
    (p.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     p.patientEmailId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     p.patientmobileNo?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container">
      <h2>🏥 Patient Admission</h2>
      <button className="open-btn" onClick={() => setShowForm(true)}>➕ New Admission</button>

      {/* 🔍 Search bar */}
      <input
        type="text"
        placeholder="🔎 Search by name, email, or mobile..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
        style={{ marginTop: '1rem', padding: '0.5rem', width: '100%' }}
      />

      {showForm && (
        <div className="popup-overlay">
          <div className="popup-form">
            <button className="close-btn" onClick={() => setShowForm(false)}>✖</button>
            <form onSubmit={handleSubmit} className="form">
              <input name="patientId" placeholder="Patient ID" value={form.patientId} onChange={handleChange} required />
              <input name="patientName" placeholder="Name" value={form.patientName} onChange={handleChange} />
              <input name="patientEmailId" placeholder="Email" value={form.patientEmailId} onChange={handleChange} />
              <input name="patientmobileNo" placeholder="Mobile No" value={form.patientmobileNo} onChange={handleChange} />
              <input name="patientAddress" placeholder="Address" value={form.patientAddress} onChange={handleChange} />
              <input name="patientPrescription" placeholder="Prescription" value={form.patientPrescription} onChange={handleChange} />
              <label>Appointment Date:</label>
              <input type="date" name="patientAppointmentdate" value={form.patientAppointmentdate} onChange={handleChange} />
              <label>Admit Date:</label>
              <input type="date" name="patientAdmitdate" value={form.patientAdmitdate} onChange={handleChange} />
              <input name="patientWardnum" placeholder="Ward No" value={form.patientWardnum} onChange={handleChange} />
              <label>Discharge Date:</label>
              <input type="date" name="patientDischargedate" value={form.patientDischargedate} onChange={handleChange} />
              <input name="patientNurseassign" placeholder="Nurse Assigned" value={form.patientNurseassign} onChange={handleChange} />
              <button type="submit" className="submit-btn">✅ Submit</button>
            </form>
          </div>
        </div>
      )}

      <h3>📋 Admitted Patients</h3>
      {filteredPatients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Ward</th>
              <th>Admit Date</th>
              <th>Discharge Date</th>
              <th>Nurse</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((p, i) => (
              <tr key={i}>
                <td>{p.patientId}</td>
                <td>{p.patientName}</td>
                <td>{p.patientEmailId}</td>
                <td>{p.patientmobileNo}</td>
                <td>{p.patientAddress}</td>
                <td>{p.patientWardnum}</td>
                <td>{p.patientAdmitdate}</td>
                <td>{p.patientDischargedate}</td>
                <td>{p.patientNurseassign}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdmitForm;
