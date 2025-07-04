import React, { useState } from "react";
import { addStudent } from "../../api/addStudentApi";
import toast from "react-hot-toast";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [collegeId, setCollegeId] = useState("");

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!name || !email || !department|| !collegeId) {
      toast.error("Please fill all fields!");
      return;
    }

    const success = await addStudent(name, email, department,collegeId);
    if (success) {
      alert("Student added successfully!");
      setName("");
      setEmail("");
      setDepartment("");
      setCollegeId("");
      toast.success("Student added successfully!");
    } else {
      toast.error("Error adding student!");
    }
  };

  return (
    <div className="add-student-container">
      <h2>Add Student</h2>
      <form onSubmit={handleAddStudent} className="add-student-form">
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />

        <label>Department:</label>
        <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Enter department" />

        <label>College ID:</label>
        <input type="text" value={collegeId} onChange={(e) => setCollegeId(e.target.value)} placeholder="Enter college ID" />

        <button type="submit" className="add-btn">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
