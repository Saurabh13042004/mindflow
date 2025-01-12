import React, { useEffect, useState } from 'react';
import {
  Brain,
  Plus,
  FileText,
  Share2,
  Settings,
  LogOut,
  Search,
  LayoutTemplate,
  Users,
  Sparkles,
  User,
  Key,
  HelpCircle,
  Pencil,
  Trash2,
  X
} from 'lucide-react';
import Cookies from 'js-cookie';
import { Link, useNavigate } from "react-router-dom";
import { deleteFlowChart, getAllFlowcharts } from '../api/flowcharts';

function UserDashboard() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(null);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('viewer');

  const [recentFiles, setRecentFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null); // State to track which dropdown is open

  const token = Cookies.get('token');
  const navigate = useNavigate();

  // const recentFiles = [
  //   { id: 1, name: 'Project Brainstorm', lastModified: '2024-03-10', shared: 3 },
  //   { id: 2, name: 'Marketing Strategy', lastModified: '2024-03-09', shared: 5 },
  //   { id: 3, name: 'Product Roadmap', lastModified: '2024-03-08', shared: 2 }
  // ];

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/');
  };

  const handleSettingsClick = (fileId, e) => {
    e.stopPropagation();
    setShowSettingsDropdown(showSettingsDropdown === fileId ? null : fileId);
  };

  const handleAccessClick = (file) => {
    setSelectedFile(file);
    setShowAccessModal(true);
    setShowSettingsDropdown(null);
  };

  const handleShareAccess = (e) => {
    e.preventDefault();
    console.log('Sharing access with:', { email, role, fileId: selectedFile?.id });
    setShowAccessModal(false);
    setEmail('');
    setRole('viewer');
  };

  const handleDelete = async (flowchartId) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this flowchart? This action cannot be undone.");
    if (userConfirmed) {
      try {
        const status = await deleteFlowChart(flowchartId);
        if (status === 200) {
          window.alert('Flowchart deleted successfully');
          window.location.reload();
        }
      } catch (e) {
        console.error(e);
        window.alert(e.data.message);
      }
    }
    setShowSettingsDropdown(null);
  };

  const handleEdit =  (flowchartId) => {
    window.location.href = `canvas/${flowchartId}`;
    setShowSettingsDropdown(null);
  };


  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;

  useEffect(() => {
    const fetchFlowcharts = async () => {
      try {
        const data = await getAllFlowcharts();
        setRecentFiles(data);
      } catch (err) {
        setError("Failed to fetch flowcharts.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlowcharts();
  }, []);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Brain className="h-8 w-8 text-blue-600" />
          <h1 className="text-xl font-semibold">MindFlow</h1>
        </div>

        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search your mindmaps..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Settings className="h-6 w-6 text-gray-600" />
          </button>
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center focus:outline-none"
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="h-10 w-10 rounded-full border-2 border-gray-200 hover:border-blue-500 transition-colors"
              />
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-200">
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">john@example.com</p>
                </div>

                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <User className="h-4 w-4 mr-3 text-gray-500" />
                  Edit Profile
                </a>

                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Key className="h-4 w-4 mr-3 text-gray-500" />
                  Change Password
                </a>

                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <HelpCircle className="h-4 w-4 mr-3 text-gray-500" />
                  Help & Support
                </a>

                <div className="border-t">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Rest of the component remains the same */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <button className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
            <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
              <Plus className="h-6 w-6 text-blue-600" />
            </div>
            <Link to='/canvas/new' className="text-lg font-medium text-gray-800 dark:text-white">New Mindmap</Link>
            {/* <span className="font-medium">New Mindmap</span> */}
          </button>

          <button className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
            <div className="h-12 w-12 bg-purple-50 rounded-full flex items-center justify-center mb-3">
              <LayoutTemplate className="h-6 w-6 text-purple-600" />
            </div>
            <span className="font-medium">Templates</span>
          </button>

          <button className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
            <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center mb-3">
              <Sparkles className="h-6 w-6 text-green-600" />
            </div>
            <span className="font-medium">AI Generate</span>
          </button>

          <button className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
            <div className="h-12 w-12 bg-orange-50 rounded-full flex items-center justify-center mb-3">
              <Share2 className="h-6 w-6 text-orange-600" />
            </div>
            <span className="font-medium">Shared with me</span>
          </button>
        </div>

        {/* Recent Files */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Files</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700">View all</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Last Modified</th>
                  <th className="pb-3 font-medium">Shared With</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentFiles.map((file,index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="py-4">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <a className="font-medium" href={`/canvas/${file.flowchart._id}`} target='_blank'>{file.flowchart.title}</a>
                        {/* <span className="font-medium">{file.name}</span> */}
                      </div>
                    </td>
                    <td className="py-4 text-sm text-gray-500">
                    {new Date(file.flowchart.createdAt).toLocaleDateString()}
                      
                      {/* {file.flowchart.createdAt} */}
                      
                      </td>
                    <td className="py-4">
                      <div className="flex -space-x-2">
                        {[...Array(file.shared)].map((_, i) => (
                          <img
                            key={i}
                            className="h-8 w-8 rounded-full border-2 border-white"
                            src={`https://i.pravatar.cc/150?img=${i + 1}`}
                            alt=""
                          />
                        ))}
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Share2 className="h-4 w-4 text-gray-600" />
                        </button>
                        <div className="relative">
                          <button
                            className="p-2 hover:bg-gray-100 rounded-lg"
                            onClick={(e) => handleSettingsClick(index, e)}
                          >
                            <Settings className="h-4 w-4 text-gray-600" />
                          </button>

                          {showSettingsDropdown === index && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-200 z-10">
                              <button
                                onClick={() => handleAccessClick(file)}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <Share2 className="h-4 w-4 mr-3 text-gray-500" />
                                Give Access
                              </button>
                              <button
                                onClick={() => handleEdit(file.id)}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <Pencil className="h-4 w-4 mr-3 text-gray-500" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(file.id)}
                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              >
                                <Trash2 className="h-4 w-4 mr-3" />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      {/* Access Control Modal */}
      {showAccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Share "{selectedFile?.name}"</h3>
              <button
                onClick={() => setShowAccessModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleShareAccess}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter registered email address"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="viewer">Viewer</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAccessModal(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Share Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;