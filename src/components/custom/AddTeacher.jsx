import React, { useState } from "react";
import { addTeacher } from "../../api/addTeacherApi";
import toast from "react-hot-toast";

const AddTeacher = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("librarian");

  const password = `${name}@library`;

  const handleaddTeacher = async (e) => {
    e.preventDefault();
    if (!name || !email || !phoneNumber || !address) {
      toast.error("Please fill all fields!");
      return;
    }
  
    const success = await addTeacher(name, email, phoneNumber, address, role);
    if (success) {
      setName("");
      setEmail("");
      setPhoneNumber("");
      setAddress("");
      setRole("librarian");
      toast.success("Teacher added successfully!");
    } else {
      toast.error("Error adding teacher!");
    }
  };
  

  return (
    <div className="add-student-container">
      <h2 className="text-center text-2xl my-3 font-semibold">
        Add Teacher
      </h2>
      <form onSubmit={handleaddTeacher} className="add-student-form">
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />

        <label>Phone Number:</label>
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Enter phone number" />

        <label>Address:</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter address" />

        <label>Password:</label>
        <input type="text" value={password} readOnly />

        <button type="submit" className="add-btn">Add Teacher</button>
      </form>
    </div>
  );
};

export default AddTeacher;