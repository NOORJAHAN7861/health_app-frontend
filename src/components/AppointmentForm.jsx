import React, { useEffect, useState } from "react";
import { api } from "../utils/api";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);

  const [doctors, setDoctors] = useState([]);

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

   const [doctors, setDoctors] = useState([]);


  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const {data} = await api.get("/api/v1/user/doctors", {
          withCredentials: true,
        });
        setDoctors(data.doctors);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDoctors();
  }, []);

  const handleAppointment = async (e) => {
    e.preventDefault();

  };

  return (

    <>
    <div className="appointment-form-container">
      <h2>Book an Appointment</h2>

      <form onSubmit={handleAppointment}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="text"
          placeholder="NIC"
          value={nic}
          onChange={(e) => setNic(e.target.value)}
        />

        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />

        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input
          type="date"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
        />

        {/* Department Dropdown */}
        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="">Select Department</option>
          {departmentsArray.map((dept, i) => (
            <option key={i} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        {/* Doctor Dropdown */}
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

        <textarea
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label>
          <input
            type="checkbox"
            checked={hasVisited}
            onChange={(e) => setHasVisited(e.target.checked)}
          />
          Visited Before
        </label>

        <button type="submit">Book Appointment</button>
      </form>
   
    </div>
    </>
  );
 
};



export default AppointmentForm;
