import React, { useState } from 'react';
import axios from '../api/axiosInstance';
import { changeName, changePassword, healthCheck } from '../api/users';

const UserAccount = () => {
    const [name, setName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleNameChange = async () => {
        try {
            const healthCheckStatus = await healthCheck();
            if (healthCheckStatus.status === 200) {
                const response = await changeName({ name });
                setMessage(`Name updated successfully to ${response.data.name}`);
            }
        } catch (error) {
            setMessage('Error changing name: ' + error.response?.data?.message || error.message);
        }
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setMessage('New password and confirm password do not match.');
            return;
        }

        try {
            const response = await changePassword({currentPassword, newPassword});
            setMessage('Password updated successfully.');
        } catch (error) {
            setMessage('Error changing password: ' + error.response?.data?.message || error.message);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
            <h2>User Account Management</h2>
            
            <div style={{ marginBottom: '20px' }}>
                <h3>Change Name</h3>
                <input
                    type="text"
                    placeholder="Enter new name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button
                    onClick={handleNameChange}
                    style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Change Name
                </button>
            </div>

            <div>
                <h3>Change Password</h3>
                <input
                    type="password"
                    placeholder="Current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button
                    onClick={handleChangePassword}
                    style={{ padding: '10px 20px', backgroundColor: '#28A745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Change Password
                </button>
            </div>

            {message && <div style={{ marginTop: '20px', color: 'red' }}>{message}</div>}
        </div>
    );
};

export default UserAccount;
