import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import {
  FaUserInjured,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';
import './AppointmentsList.css';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:7771/api/appointments1');
      const sorted = response.data.sort((a, b) => a.time.localeCompare(b.time));
      setAppointments(sorted);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const updateAppointmentStatus = async (id, action) => {
    try {
      await axios.patch(`http://localhost:7771/api/appointments1/${id}`, {
        status: action === 'confirm' ? 'confirmed' : 'cancelled',
      });
      fetchAppointments();
    } catch (err) {
      alert('Failed to update appointment');
    }
  };

  return (
    <div className="appointments-container">
      <h2 className="appointments-title">📋 All Appointments</h2>

      {loading ? (
        <div className="appointments-loading">Loading...</div>
      ) : appointments.length === 0 ? (
        <div className="appointments-empty">No appointments available.</div>
      ) : (
        <div className="appointments-table-container">
          <table className="appointments-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt, index) => (
                <tr key={appt.id}>
                  <td>{index + 1}</td>
                  <td className="patient-name">
                    <FaUserInjured className="icon" /> {appt.patientName}
                  </td>
                  <td>{appt.doctor}</td>
                  <td>{appt.date}</td>
                  <td>{appt.time}</td>
                  <td>
                    {appt.status === 'confirmed' ? (
                      <FaCheckCircle className="icon green" />
                    ) : appt.status === 'cancelled' ? (
                      <FaTimesCircle className="icon red" />
                    ) : (
                      'Pending'
                    )}
                  </td>
                  <td>
                    <select
                      onChange={(e) => updateAppointmentStatus(appt.id, e.target.value)}
                      defaultValue=""
                      className="action-dropdown"
                    >
                      <option value="" disabled>
                        Choose
                      </option>
                      <option value="confirm">✅ Confirm</option>
                      <option value="cancel">🗑 Cancel</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AppointmentsList;
