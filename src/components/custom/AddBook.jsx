import React, { useState } from "react";
import { addBookToDB } from "../../api/addBookToDB";

const AddBook = () => {
  const [book, setBook] = useState({
    name: "",
    author: "",
    publisher: "",
    isbn: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addBookToDB(book, setLoading);

    if (response.success) {
      setMessage("Book added successfully!");
      setBook({ name: "", author: "", publisher: "", isbn: "" }); // Reset form
    } else {
      setMessage("Failed to add book. Try again.");
    }
  };

  return (
    <div className="add-book-container">
      <h2 className="text-center text-2xl my-3 font-semibold">
        Add a New Book
      </h2>

      {message && <p>{message}</p>}
      {loading && <p>Loading...</p>}
      <form onSubmit={handleSubmit} className="add-book-form">
        <input
          type="text"
          name="name"
          placeholder="Book Name"
          value={book.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="publisher"
          placeholder="Publisher"
          value={book.publisher}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="isbn"
          placeholder="ISBN"
          value={book.isbn}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
