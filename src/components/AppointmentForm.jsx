import React, { useEffect, useState } from "react";
import { api } from "../utils/api";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  // ✅ Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await api.get("/api/v1/user/doctors", {
          withCredentials: true,
        });
        setDoctors(data.doctors);
      } catch (error) {
        toast.error("Failed to load doctors");
      }
    };
    fetchDoctors();
  }, []);

  // ✅ Reset doctor when department changes
  useEffect(() => {
    setDoctorId("");
  }, [department]);

  const handleAppointment = async (e) => {
    e.preventDefault();

    if (!appointmentDate || !department || !doctorId || !address) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const { data } = await api.post(
        "/api/v1/appointment/post",
        {
          appointment_date: appointmentDate,
          department,
          doctorId,
          address,
          hasVisited,
        },
        { withCredentials: true }
      );

      toast.success(data.message);

      // reset form
      setAppointmentDate("");
      setDepartment("");
      setDoctorId("");
      setAddress("");
      setHasVisited(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appointment-form-container">
      <h2>Book an Appointment</h2>

      <form onSubmit={handleAppointment}>
        {/* Appointment Date */}
        <input
          type="date"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
        />

        {/* Department */}
        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="">Select Department</option>
          {departmentsArray.map((dept, i) => (
            <option key={i} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        {/* Doctor */}
        <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)}>
          <option value="">Select Doctor</option>
          {doctors
            .filter((doc) => doc.doctorDepartment === department)
            .map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.firstName} {doc.lastName}
              </option>
            ))}
        </select>

        {/* Address */}
        <textarea
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {/* Visited */}
        <label>
          <input
            type="checkbox"
            checked={hasVisited}
            onChange={(e) => setHasVisited(e.target.checked)}
          />
          Visited Before
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
