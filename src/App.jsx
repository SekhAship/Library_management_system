import { useState, useContext } from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Dashboard';
import AuthPage from './components/Auth';
import Toast from 'react-hot-toast';
import RefreshHandler from './RefreshHandler';
import AddBook from './components/custom/AddBook';
import EditBook from './components/custom/EditBook';
import IssueBook from './components/custom/IssueBook';
import ReturnBook from './components/custom/ReturnBook';
import StudentList from './components/custom/StudentList';
import Analytics from './components/chart/Analytics';
import Chart from './components/chart/Chart';
import Header from './components/header/Header';
import Dashboard from './components/Dashboard';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Sidebar from './components/navigation/Sidebar';
import myContext from './context/myContext';
import MyState from './context/myState';
import StudentAnalytics from './components/chart/Analytics';
import AddTeacher from './components/custom/AddTeacher';
import TeacherList from './components/custom/TeacherList';
import Logout from './components/Logout';
import Profile from './components/Profile';
import StudentActivity from './components/custom/StudentActivity';

StudentActivity
const queryClient = new QueryClient();
function MainApp() {
  const { isAuthenticated } = useContext(myContext);
  return (
    <>
      <Header />
      {isAuthenticated ? (
        <Sidebar>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} /> {/* ✅ Default redirect */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addBook" element={<AddBook />} />
            <Route path="/addTeacher" element={<AddTeacher />} />
            <Route path="/editBook" element={<EditBook />} />
            <Route path="/issueBook" element={<IssueBook />} />
            <Route path="/returnBook" element={<ReturnBook />} />
            <Route path="/StudentList" element={<StudentList />} />
            <Route path="/TeacherList" element={<TeacherList />} />
            <Route path="/analytics" element={<StudentAnalytics />} />
            <Route path="/settings/profile" element={<Profile />} />
            <Route path="/studentActivity" element={<StudentActivity />} />

            <Route path="/settings/logout" element={<Logout />} />

            <Route path="/chart" element={<Chart />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} /> {/* ✅ Catch-all redirect */}
          </Routes>
        </Sidebar>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/*" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      )}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MyState> {/* Context Provider is now wrapping MainApp */}
          <MainApp />
        </MyState>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
