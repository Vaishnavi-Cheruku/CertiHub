import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0
  });
  const [loading, setLoading] = useState(true);
  const [workload, setWorkload] = useState(null);
  
  // Get staff ID from localStorage or wherever you store it after login
  const staffId = '67dbcf81993e7c68bfa7fa4e'; // Vaishnavi's ID
  const staffName = 'Vaishnavi Cheruku'; // For display purposes
  
  useEffect(() => {
    fetchStats();
    fetchWorkload();
  }, []);
  
  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Get pending applications count
      const pendingRes = await axios.get(`http://localhost:4000/api/income-certificates/staff/${staffId}/pending`);
      
      // Get approved applications count
      const approvedRes = await axios.get(`http://localhost:4000/api/income-certificates/staff/${staffId}/approved`);
      
      // Get rejected applications count
      const rejectedRes = await axios.get(`http://localhost:4000/api/income-certificates/staff/${staffId}/rejected`);
      
      setStats({
        pending: pendingRes.data.length,
        approved: approvedRes.data.length,
        rejected: rejectedRes.data.length
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching statistics:', error);
      setLoading(false);
    }
  };
  
  const fetchWorkload = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/income-certificates/staff/workload');
      setWorkload(response.data);
    } catch (error) {
      console.error('Error fetching staff workload:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Staff Dashboard</h1>
        <div className="mt-2 md:mt-0">
          <span className="text-gray-600">Welcome, </span>
          <span className="font-semibold">{staffName}</span>
        </div>
      </div>
      
      {workload && workload.vaishnavi.isOverloaded && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
          <p className="font-bold">Maximum Load Alert</p>
          <p>You have reached the maximum number of pending applications (10). New applications will be redirected to other staff members.</p>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center">
          <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link to="/staff-pending" className="block">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Pending Applications</h2>
                  <span className="text-amber-500 text-2xl font-bold">{stats.pending}</span>
                </div>
                <div className="flex items-center text-amber-500">
                  <span>View all pending</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </Link>
            
            <Link to="/staff-verified" className="block">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Approved Applications</h2>
                  <span className="text-green-500 text-2xl font-bold">{stats.approved}</span>
                </div>
                <div className="flex items-center text-green-500">
                  <span>View approved</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </Link>
            
            <Link to="/staff-rejected" className="block">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Rejected Applications</h2>
                  <span className="text-red-500 text-2xl font-bold">{stats.rejected}</span>
                </div>
                <div className="flex items-center text-red-500">
                  <span>View rejected</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </Link>
          </div>
          
          {workload && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4">Staff Workload Distribution</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Vaishnavi Cheruku</span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${workload.vaishnavi.isOverloaded ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {workload.vaishnavi.isOverloaded ? 'Overloaded' : 'Available'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${workload.vaishnavi.isOverloaded ? 'bg-red-500' : 'bg-green-500'}`} 
                      style={{ width: `${Math.min(workload.vaishnavi.pendingCount * 10, 100)}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <span>{workload.vaishnavi.pendingCount} pending applications</span>
                    <span className="mx-1">•</span>
                    <span>{workload.vaishnavi.pendingCount >= 10 ? '100%' : `${workload.vaishnavi.pendingCount * 10}%`} capacity</span>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Joyce</span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${workload.joyce.isOverloaded ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {workload.joyce.isOverloaded ? 'Overloaded' : 'Available'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${workload.joyce.isOverloaded ? 'bg-red-500' : 'bg-green-500'}`} 
                      style={{ width: `${Math.min(workload.joyce.pendingCount * 10, 100)}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <span>{workload.joyce.pendingCount} pending applications</span>
                    <span className="mx-1">•</span>
                    <span>{workload.joyce.pendingCount >= 10 ? '100%' : `${workload.joyce.pendingCount * 10}%`} capacity</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <p className="text-gray-500 italic">Application processing activity will appear here.</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;