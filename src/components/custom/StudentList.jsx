import React, { useEffect, useState } from "react";
import { fetchStudents, deleteStudent } from "../../api/studentListApi";


const user = JSON.parse(localStorage.getItem('user'));

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const data = await fetchStudents();
    setStudents(data);
  };

  const handleDelete = async (id) => {
    const success = await deleteStudent(id);
    if (success) {
      setStudents(students.filter((student) => student.id !== id));
    }
  };
  return (
    <div className="student-list-container">
      <h2 className="text-center text-2xl my-3 font-semibold">
      Student List
      </h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.filter((student)=>student.role==="user")
            .map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                
                <td>
                  <button onClick={() => handleDelete(student.id)} className="delete-btn"
                    disabled={user.role !== "librarian"}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No students found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
