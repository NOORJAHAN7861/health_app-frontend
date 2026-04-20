import { api } from "../utils/api";
import { toast } from "react-toastify";
import React, { useState } from "react";

const MessageForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMessage = async (e) => {
    e.preventDefault();

    // ✅ Basic validation
    if (!firstName || !lastName || !email || !phone || !message) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await api.post(
        "/api/v1/message/send",
        { firstName, lastName, email, phone, message },
        { withCredentials: true }
      );

      toast.success(res.data.message);

      // ✅ Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container form-component message-form">
      <h2>Send Us A Message</h2>

      <form onSubmit={handleMessage}>
        <div>
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
        </div>

        <div>
          <input
            type="email"  // ✅ correct type
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"   // ✅ NOT number
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <textarea
          rows={7}
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div style={{ textAlign: "center" }}>
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </form>

      <img src="/Vector.png" alt="vector" />
    </div>
  );
};

export default MessageForm;