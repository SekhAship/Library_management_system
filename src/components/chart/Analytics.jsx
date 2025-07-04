import React, { useEffect, useState } from 'react';
import { fetchStudentAnalytics } from '../../api/fetchStudentAnalytics';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#4A90E2', '#50E3C2', '#F5A623'];

const StudentAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    totalStudents: 0,
    totalBooksIssued: 0,
    totalOverdueBooks: 0,
  });

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const data = await fetchStudentAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const pieData = [
    { name: 'Total Students', value: analytics.totalStudents },
    { name: 'Books Issued', value: analytics.totalBooksIssued },
    { name: 'Overdue Books', value: analytics.totalOverdueBooks },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Student Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-xl">
          <h3 className="text-xl font-medium">Total Students</h3>
          <p className="text-3xl font-bold">{analytics.totalStudents}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-xl">
          <h3 className="text-xl font-medium">Total Books Issued</h3>
          <p className="text-3xl font-bold">{analytics.totalBooksIssued}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-xl">
          <h3 className="text-xl font-medium">Overdue Books</h3>
          <p className="text-3xl font-bold">{analytics.totalOverdueBooks}</p>
        </div>
      </div>

      <div className="mt-8 bg-white p-4 rounded-xl shadow-lg">
        <h3 className="text-xl font-medium mb-4">Analytics Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StudentAnalytics;