import React, { useEffect, useState } from "react";
import { fetchUserDataById } from "../../api/fetchBookIssuedToStudent";
import toast from "react-hot-toast";

const user = localStorage.getItem("user");
const userData = JSON.parse(user);
const studentId = userData ? userData.name : null;

const StudentActivity = () => {
  const [isbn, setIsbn] = useState("");
  const [allBooks, setAllBooks] = useState([]);
  const [fine, setFine] = useState({});

  useEffect(() => {
    if (studentId) loadAllBooks();
  }, [studentId]);

  const loadAllBooks = async () => {
    try {
      const books = await fetchUserDataById(studentId); // Now returns an array
      if (!books || books.length === 0) {
        toast.error("No books found.");
        return;
      }

      const fines = {};
      books.forEach((book) => {
        fines[book.book_id] = calculateFine(book.issue_date, book.return_date);
      });

      setFine(fines);
      setAllBooks(books);
    } catch (error) {
      console.error("Error loading books:", error);
      toast.error("Failed to load books.");
    }
  };

  const handleSearch = async () => {
    if (!isbn) {
      toast.error("Please enter ISBN");
      return;
    }

    const filteredBooks = allBooks.filter((book) => book.isbn === isbn);
    if (filteredBooks.length === 0) {
      toast.error("No book found with this ISBN!");
      return;
    }
    setAllBooks(filteredBooks);
  };

  const calculateFine = (issueDate, returnDate) => {
    const issueDateObj = new Date(issueDate);
    const returnDateObj = new Date(returnDate);
    const today = new Date();

    const isOverdue = today > returnDateObj;
    const diffInDays = Math.floor((today - issueDateObj) / (1000 * 60 * 60 * 24));

    return isOverdue && diffInDays > 7 ? (diffInDays - 7) * 5 : 0;
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Student Book Activity</h2>

      <div className="flex items-center border p-2 mb-4">
        <input
          type="text"
          placeholder="Enter ISBN"
          className="border p-2 w-full"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
        <button onClick={handleSearch} className="ml-2 bg-blue-500 text-white px-4 py-2">
          Search
        </button>
      </div>

      {allBooks.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Book Name</th>
              <th className="border p-2">ISBN</th>
              <th className="border p-2">Issue Date</th>
              <th className="border p-2">Fine</th>
            </tr>
          </thead>
          <tbody>
            {allBooks.map((book) => (
              <tr key={book.book_id}>
                <td className="border p-2 text-center">{book.book_name}</td>
                <td className="border p-2 text-center">{book.isbn}</td>
                <td className="border p-2 text-center">{book.issue_date}</td>
                <td className="border p-2 text-center">₹{fine[book.book_id]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No books found.</p>
      )}
    </div>
  );
};

export default StudentActivity;
