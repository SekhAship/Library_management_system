import React, { useEffect, useState } from "react";
import { fetchIssuedBookByISBN, fetchAllNonReturnedBooks, returnBook } from "../../api/returnBookApi";
import toast from "react-hot-toast";

const ReturnBook = () => {
  const [isbn, setIsbn] = useState("");
  const [nonReturnedBooks, setNonReturnedBooks] = useState([]);
  const [fine, setFine] = useState({});

  useEffect(() => {
    loadNonReturnedBooks();
  }, []);

  const loadNonReturnedBooks = async () => {
    try {
      const books = await fetchAllNonReturnedBooks();
      const fines = {};
      books.forEach((book) => {
        fines[book.id] = calculateFine(book.issue_date);
      });
      setFine(fines);
      setNonReturnedBooks(books);
    } catch (error) {
      console.error("Error loading books:", error);
      toast.error("Failed to load non-returned books.");
    }
  };

  const handleSearch = async () => {
    if (!isbn) {
      toast.error("Please enter ISBN");
      return;
    }

    try {
      const book = await fetchIssuedBookByISBN(isbn);
      if (!book) {
        toast.error("No issued book found with this ISBN!");
        return;
      }
      setNonReturnedBooks([book]);
      setFine({ [book.id]: calculateFine(book.issue_date) });
    } catch (error) {
      console.error("Error fetching book:", error);
      toast.error("Failed to fetch book.");
    }
  };

  const calculateFine = (issueDate) => {
    const issueDateObj = new Date(issueDate);
    const today = new Date();
    const diffInDays = Math.floor((today - issueDateObj) / (1000 * 60 * 60 * 24));
    return diffInDays > 7 ? (diffInDays - 7) * 5 : 0;
  };

  const handleReturnBook = async (id) => {
    try {
      await returnBook(id);
      toast.success("Book returned successfully!");
      loadNonReturnedBooks();
    } catch (error) {
      console.error("Error returning book:", error);
      toast.error("Error returning book!");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Return Book</h2>

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

      {nonReturnedBooks.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Book Name</th>
              <th className="border p-2">ISBN</th>
              <th className="border p-2">Issued To</th>
              <th className="border p-2">Issue Date</th>
              <th className="border p-2">Fine</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {nonReturnedBooks.map((book) => (
              <tr key={book.id}>
                <td className="border p-2">{book.book_name}</td>
                <td className="border p-2">{book.isbn}</td>
                <td className="border p-2">{book.student_name}</td>
                <td className="border p-2">{book.issue_date}</td>
                <td className="border p-2">₹{fine[book.id]}</td>
                <td className="border p-2 flex gap-2">
                  <button
                    className="bg-red-500 text-white px-4 py-2"
                    onClick={() => toast.success(`Fine paid: ₹${fine[book.id]}`)}
                  >
                    Pay Fine
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2"
                    onClick={() => handleReturnBook(book.id)}
                  >
                    Submit Book
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No non-returned books found.</p>
      )}
    </div>
  );
};

export default ReturnBook;