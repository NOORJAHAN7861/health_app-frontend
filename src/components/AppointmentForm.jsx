import { api } from "../utils/api";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";

const AppointmentForm = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    appointmentDate: "",
    department: "Pediatrics",
    doctorId: "",
    doctorFirstName: "",
    doctorLastName: "",
    address: "",
    hasVisited: false,
  });

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

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await api.get("/api/v1/user/doctors");
        setDoctors(data.doctors);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDoctors();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle doctor select (IMPORTANT)
  const handleDoctorSelect = (e) => {
    const selectedDoctor = doctors.find(
      (doc) => doc._id === e.target.value
    );

    setForm((prev) => ({
      ...prev,
      doctorId: selectedDoctor._id,
      doctorFirstName: selectedDoctor.firstName,
      doctorLastName: selectedDoctor.lastName,
    }));
  };

  // Submit
  const handleAppointment = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        nic: form.nic,
        dob: form.dob,
        gender: form.gender,
        appointment_date: form.appointmentDate,
        department: form.department,
        doctor: {
          firstName: form.doctorFirstName,
          lastName: form.doctorLastName,
        },
        doctorId: form.doctorId,
        address: form.address,
        hasVisited: form.hasVisited,
      };

      const { data } = await api.post("/api/v1/appointment/post", payload);

      toast.success(data.message);

      // Reset form
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        nic: "",
        dob: "",
        gender: "",
        appointmentDate: "",
        department: "Pediatrics",
        doctorId: "",
        doctorFirstName: "",
        doctorLastName: "",
        address: "",
        hasVisited: false,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container form-component appointment-form">
      <h2>Appointment</h2>
      <form onSubmit={handleAppointment}>
        <div>
          <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" />
          <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" />
        </div>

        <div>
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Mobile Number" />
        </div>

        <div>
          <input name="nic" value={form.nic} onChange={handleChange} placeholder="NIC" />
          <input type="date" name="dob" value={form.dob} onChange={handleChange} />
        </div>

        <div>
          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input type="date" name="appointmentDate" value={form.appointmentDate} onChange={handleChange} />
        </div>

        <div>
          <select name="department" value={form.department} onChange={handleChange}>
            {departmentsArray.map((d, i) => (
              <option key={i} value={d}>{d}</option>
            ))}
          </select>

          {/* Doctor Select */}
          <select value={form.doctorId} onChange={handleDoctorSelect}>
            <option value="">Select Doctor</option>
            {doctors
              .filter((doc) => doc.doctorDepartment === form.department)
              .map((doc) => (
                <option key={doc._id} value={doc._id}>
                  {doc.firstName} {doc.lastName}
                </option>
              ))}
          </select>
        </div>

        <textarea
          rows="6"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
        />

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <p>Have you visited before?</p>
          <input
            type="checkbox"
            name="hasVisited"
            checked={form.hasVisited}
            onChange={handleChange}
          />
        </div>

        <button type="submit">GET APPOINTMENT</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
