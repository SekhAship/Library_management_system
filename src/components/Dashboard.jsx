// pages/Dashboard.jsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getBooks, deleteBook, updateBook } from '../api/booksApi';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { Edit, Search, Trash2 } from 'lucide-react'; // Icons
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import BookModal from './modals/BooksModal';



// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const Dashboard = () => {
  const [user, setUser] = useState(null);

useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []); 
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchItem, setSearchItem] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editBookData, setEditBookData] = useState({ id: '', name: '', author: '', publisher: '', isbn: '' });

  const { data: books, isPending, error } = useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      toast.success('Book deleted successfully');
      queryClient.invalidateQueries(['books']);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Update Mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, updatedData }) => updateBook(id, updatedData),
    onSuccess: () => {
      toast.success('Book updated successfully');
      queryClient.invalidateQueries(['books']);
      setIsModalOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Edit Book
  const handleEdit = (book) => {
    setEditBookData(book);
    setIsModalOpen(true);
  };

  // Delete Book
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      deleteMutation.mutate(id);
    }
  };

  // Handle Update
  const handleUpdate = () => {
    updateMutation.mutate({ id: editBookData.id, updatedData: editBookData });
  };

  // Column Definitions
  const colDefs = [
    { field: 'name' },
    { field: 'author' },
    { field: 'publisher' },
    { field: 'isbn' },
    {
      field: 'edit',
      cellRenderer: (params) => (
        <div className={`py-2 ${!user || user.role !== "librarian" ? 'opacity-50 pointer-events-none' : ''}`}>
          <Edit
            color='gray'
            className='cursor-pointer'
            onClick={() => handleEdit(params.data)}
          />
        </div>
      ),
    },
    
    {
      field: 'delete',
      cellRenderer: (params) => (
        <div className={`py-2 ${user.role !== "librarian" ? 'opacity-50 pointer-events-none' : ''}`}>
          <Trash2
            color='red'
            className='cursor-pointer'
            onClick={() => handleDelete(params.data.id)}
          />
        </div>
      ),
    },

  ];

  return (
    <div className='px-4'>
      <h2 className='text-center text-2xl my-3 font-semibold'>Book List</h2>
      <div className='py-3 my-3'>
        <div className='border flex my-3 p-2 max-w-sm'>
          <Search />
          <input
            type='text'
            placeholder='Search by any field'
            className='outline-none pl-2'
            onChange={(event) => setSearchItem(event.target.value)}
          />
        </div>
        <div style={{ height: 500 }} className='ag-theme-alpine'>
          <AgGridReact
            rowData={books}
            columnDefs={colDefs}
            pagination={true}
            quickFilterText={searchItem}
            domLayout='autoHeight'
            defaultColDef={{
              flex: 1,
              resizable: true,
            }}
          />
        </div>
      </div>

      {/* Reusable Modal */}
      <BookModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        editBookData={editBookData}
        setEditBookData={setEditBookData}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default Dashboard;
