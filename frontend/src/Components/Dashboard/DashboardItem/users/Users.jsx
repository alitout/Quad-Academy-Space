import React, { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../../../API/axiosInstance';
import { Modal, Button } from 'react-bootstrap';

import UsersAdd from './UsersAdd';
import UsersEdit from './UsersEdit';
import UsersDeleteConfirm from './UsersDeleteConfirm';

import { USER_GET_ALL, USER_DELETE_BY_ADMIN, USER_RESET_PASSWORD } from '../../../../externalApi/ExternalUrls'

import Edit03 from '@untitled-ui/icons-react/build/cjs/Edit03';
import Trash03 from '@untitled-ui/icons-react/build/cjs/Trash03';
import RefreshCcw01 from '@untitled-ui/icons-react/build/cjs/RefreshCcw01';

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get(USER_GET_ALL);
            setUsers(res.data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    }

    const handleAdd = () => setShowAddModal(true);
    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };
    const handleDelete = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    // Close modals
    const handleCloseAdd = () => setShowAddModal(false);
    const handleCloseEdit = () => setShowEditModal(false);
    const handleCloseDelete = () => setShowDeleteModal(false);

    const handleSaveSuccess = () => {
        fetchUsers();
        setShowAddModal(false);
        setShowEditModal(false);
    };

    const confirmDelete = async () => {
        try {
            await axiosInstance.delete(USER_DELETE_BY_ADMIN(selectedUser.userID));
            setUsers(users.filter(user => user.userID !== selectedUser.userID));
        } catch (err) {
            console.error(err);
        }
        setShowDeleteModal(false);
    };

    const handleResetPassword = (user) => {
        setSelectedUser(user);
        setShowResetPasswordModal(true);
    };

    return (
        <div>
            <h2>Users</h2>
            <button
                className='functionButton btn bg-pink mb-3'
                onClick={handleAdd}
            >
                Add New User
            </button>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="table-responsive">
                    <table className='table'>
                        <thead>
                            <tr>
                                <th className='bg-cyan-blue text-white border p-2'>ID</th>
                                <th className='bg-cyan-blue text-white border p-2'>Username</th>
                                <th className='bg-cyan-blue text-white border p-2'>Name</th>
                                <th className='bg-cyan-blue text-white border p-2'>Email</th>
                                <th className='bg-cyan-blue text-white border p-2'>Role</th>
                                <th className='bg-cyan-blue text-white border p-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.userID}>
                                    <td className='border p-2'>{user.userID}</td>
                                    <td className='border p-2'>{user.username}</td>
                                    <td className='border p-2'>{user.fullName}</td>
                                    <td className='border p-2'>{user.email}</td>
                                    <td className='border p-2'>{user.role}</td>
                                    <td className={`border p-2 d-flex gap-2`}>
                                        <button
                                            className='functionButton btn text-pink border-pink'
                                            onClick={() => handleEdit(user)}
                                        >
                                            <Edit03 className="d-lg-none" />
                                            <span className="d-none d-lg-inline">Edit</span>
                                        </button>
                                        <button
                                            className='functionButton btn bg-pink'
                                            onClick={() => handleDelete(user)}
                                        >
                                            <Trash03 className="d-lg-none" />
                                            <span className="d-none d-lg-inline">Delete</span>
                                        </button>
                                        <button
                                            className='btn bg-gray-500 text-white'
                                            onClick={() => handleResetPassword(user)}
                                        >
                                            <RefreshCcw01 className="d-lg-none" />
                                            <span className="d-none d-lg-inline">Reset Password</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* ADD MODAL */}
            <Modal
                show={showAddModal}
                onHide={handleCloseAdd}
                backdrop="static"
                keyboard={false}
                size="lg"
                centered
            >
                <Modal.Header>
                    <Modal.Title>Add New User</Modal.Title>
                    <Button variant="secondary" onClick={handleCloseAdd} className="ms-auto">close</Button>
                </Modal.Header>
                <Modal.Body>
                    <UsersAdd onSaveSuccess={handleSaveSuccess} />
                </Modal.Body>
            </Modal>

            {/* EDIT MODAL */}
            <Modal
                show={showEditModal}
                onHide={handleCloseEdit}
                backdrop="static"
                keyboard={false}
                size="lg"
                centered
            >
                <Modal.Header>
                    <Modal.Title>Edit User</Modal.Title>
                    <Button variant="secondary" onClick={handleCloseEdit} className="ms-auto">close</Button>
                </Modal.Header>
                <Modal.Body>
                    <UsersEdit user={selectedUser} onSaveSuccess={handleSaveSuccess} />
                </Modal.Body>
            </Modal>

            {/* DELETE CONFIRMATION MODAL */}
            <UsersDeleteConfirm
                show={showDeleteModal}
                handleClose={handleCloseDelete}
                handleConfirm={confirmDelete}
                user={selectedUser}
            />

            {/* RESET PASSWORD MODAL */}
            <Modal
                show={showResetPasswordModal}
                onHide={() => setShowResetPasswordModal(false)}
                keyboard={false}
                centered
            >
                <Modal.Header>
                    <Modal.Title>Reset Password</Modal.Title>
                    <Button variant="secondary" onClick={() => setShowResetPasswordModal(false)} className="ms-auto">close</Button>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to reset the password for <strong>{selectedUser?.username}</strong>?</p>
                    <Button className='functionButton bg-pink' onClick={() => {
                        try {
                            axiosInstance.patch(USER_RESET_PASSWORD(selectedUser.userID));
                        } catch (err) {
                            console.error(err);
                        }
                        setShowResetPasswordModal(false);
                    }}>Yes, Reset Password</Button>
                </Modal.Body>
            </Modal>

        </div>
    )
}

export default Users;