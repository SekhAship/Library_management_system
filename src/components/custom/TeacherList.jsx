import React, { useEffect, useState } from "react";
import { fetchTeachers, deleteTeacher } from "../../api/teacherListApi";

const user = JSON.parse(localStorage.getItem('user'));
const TeacherList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const data = await fetchTeachers();
    setStudents(data);
  };

  const handleDelete = async (id) => {
    const success = await deleteTeacher(id);
    if (success) {
      setStudents(students.filter((student) => student.id !== id));
    }
  };

  return (
    <div className="student-list-container">

      <h2 className="text-center text-2xl my-3 font-semibold">
        Teacher List
      </h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phoneNumber}</td>
                <td>{student.address}</td>
                <td>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="delete-btn"
                    disabled={user.role !== "admin"} // Disable if not admin
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No teacher found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherList;
