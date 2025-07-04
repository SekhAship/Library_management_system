import React, { useEffect, useState } from "react";
import { fetchStudents, fetchBooks, issueBook } from "../../api/issueBookApi";
import toast from "react-hot-toast";

const IssueBook = () => {
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [isbn, setIsbn] = useState(""); // New state for ISBN

  useEffect(() => {
    loadStudents();
    loadBooks();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await fetchStudents();
      setStudents(data);
    } catch (error) {
      toast.error("Failed to load students");
    }
  };

  const loadBooks = async () => {
    try {
      const data = await fetchBooks();
      setBooks(data);
    } catch (error) {
      toast.error("Failed to load books");
    }
  };

  // Update ISBN when book is selected
  const handleBookChange = (bookId) => {
    setSelectedBook(bookId);
    const selected = books.find((book) => book.id === bookId);
    setIsbn(selected ? selected.isbn : "");
  };

  const handleIssueBook = async (e) => {
    e.preventDefault();
    if (!selectedStudent || !selectedBook || !issueDate || !returnDate) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      await issueBook(selectedStudent, selectedBook, issueDate, returnDate);
      toast.success("Book issued successfully!");
      setSelectedStudent("");
      setSelectedBook("");
      setIssueDate("");
      setReturnDate("");
      setIsbn("");
    } catch (error) {
      toast.error("Error issuing book: " + error.message);
    }
  };
  // console.log(students);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Issue Book</h2>
      <form onSubmit={handleIssueBook} className="space-y-4">
        <div>
          <label className="block font-medium">Student:</label>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="">Select Student</option>
            {students.filter((student) => student.role === "user").map((student) => (
              <option key={student.id} value={student.id}>
                {student.name} ({student.email})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Book:</label>
          <select
            value={selectedBook}
            onChange={(e) => handleBookChange(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="">Select Book</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.name} by {book.author}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">ISBN:</label>
          <input
            type="text"
            value={isbn}
            disabled
            className="border p-2 w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium">Issue Date:</label>
          <input
            type="date"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block font-medium">Return Date:</label>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Issue Book
        </button>
      </form>
    </div>
  );
};

export default IssueBook;