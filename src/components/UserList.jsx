import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const columns = ['ID', 'Name', 'Username', 'Email', 'Phone', 'Website', 'Company'];

  useEffect(() => {
    const delay = setTimeout(() => {

      // axios.get('https://sona-angdembe.typicode.com/users')
      // output:- Failed to fetch users. Please try again later. 
      
      axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
          setUsers(response.data);  // On success, set users
          setLoading(false);       
        })
        .catch(err => {
          setError("Failed to fetch users. Please try again later.");  // On failure, set error message
          setLoading(false);      
        });
    }, 800);

    return () => clearTimeout(delay);
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white shadow-md rounded-lg">
        <svg className="animate-spin h-10 w-10 text-blue-500 mx-auto mb-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0a12 12 0 0 0 0 24v-4a8 8 0 0 1-8-8z"/>
        </svg>
        <div className="text-gray-600 text-xl font-semibold">Loading...</div>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-slate-500">
      <div className="text-red-500 text-center p-4 bg-white shadow-md rounded-lg">
        {error}
      </div>
    </div>
  );

  return (
    <div className='bg-slate-500 min-h-screen py-10'>
      <div className="max-w-7xl mx-auto p-6 bg-slate-300 shadow-md rounded-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">User List</h1>
        <table className="w-full table-auto bg-slate-100 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              {columns.map((col, index) => (
                <th key={index} className="px-6 py-3 text-left text-black">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                {[
                  user.id,
                  user.name,
                  user.username,
                  user.email,
                  user.phone,
                  user.website,
                  user.company.name
                ].map((value, index) => (
                  <td key={index} className="px-6 py-3 text-gray-800">{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
