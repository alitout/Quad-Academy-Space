import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import axiosInstance from '../../../../API/axiosInstance';
import { useAuth } from '../../../../Context/AuthContext';

import { MASTERCLASS_GET_ALL, MASTERCLASS_DELETE_BY_ID, ENROLLMENT_GET_USER, ENROLLMENT_UNENROLL_MASTERCLASS } from '../../../../externalApi/ExternalUrls';
import MasterClassAdd from './MasterClassesAdd';
import MasterClassEdit from './MasterClassesEdit';
import MasterClassDeleteConfirm from './MasterClassesDeleteConfirm';

import Edit03 from '@untitled-ui/icons-react/build/cjs/Edit03';
import Trash03 from '@untitled-ui/icons-react/build/cjs/Trash03';

function MasterClasses() {
    const auth = useAuth();
    const isAdmin = auth?.user?.role === 'admin';

    const [masterClasses, setMasterClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedMasterClass, setSelectedMasterClass] = useState(null);

    useEffect(() => {
        fetchMasterClasses();
    }, []);

    const fetchMasterClasses = async () => {
        try {
            let data;
            if (isAdmin) {
                // Admins see all master classes
                const res = await axios.get(MASTERCLASS_GET_ALL);
                data = res.data;
            } else {
                // Non-admins see only enrolled master classes
                const res = await axiosInstance.get(ENROLLMENT_GET_USER);
                data = res.data.masterClasses;
            }
            const sorted = data.sort((a, b) => a.masterClassID - b.masterClassID);
            setMasterClasses(sorted);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const handleAdd = () => setShowAddModal(true);
    const handleEdit = (masterClass) => {
        setSelectedMasterClass(masterClass);
        setShowEditModal(true);
    };
    const handleDelete = (masterClass) => {
        setSelectedMasterClass(masterClass);
        setShowDeleteModal(true);
    };

    // Close modals
    const handleCloseAdd = () => setShowAddModal(false);
    const handleCloseEdit = () => setShowEditModal(false);
    const handleCloseDelete = () => setShowDeleteModal(false);

    const handleSaveSuccess = () => {
        fetchMasterClasses();
        setShowAddModal(false);
        setShowEditModal(false);
    };

    const confirmDelete = async () => {
        try {
            await axiosInstance.delete(MASTERCLASS_DELETE_BY_ID(selectedMasterClass.masterClassID));
            setMasterClasses(masterClasses.filter(m => m.masterClassID !== selectedMasterClass.masterClassID));
        } catch (err) {
            console.error(err);
        }
        setShowDeleteModal(false);
    };

    const unenrollFromMasterClass = async (masterClassID) => {
        try {
            await axiosInstance.post(ENROLLMENT_UNENROLL_MASTERCLASS, { masterClassID });
            alert("Unenrolled successfully");
            fetchMasterClasses();
        } catch (err) {
            console.error("Unenrollment error:", err);
            alert(err.response?.data?.msg || "Unenrollment failed. Please try again.");
        }
    };

    return (
        <div>
            <h2>Master Classes</h2>
            {isAdmin && (
                <button
                    className='functionButton btn bg-pink mb-3'
                    onClick={handleAdd}
                >
                    Add New Master Class
                </button>
            )}

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="table-responsive">
                    <table className='table'>
                        <thead>
                            <tr>
                                <th className='bg-cyan-blue text-white border p-2'>ID</th>
                                <th className='bg-cyan-blue text-white border p-2'>Title</th>
                                <th className='bg-cyan-blue text-white border p-2'>Brief</th>
                                <th className='bg-cyan-blue text-white border p-2'>Enrollment</th>
                                {isAdmin &&
                                    <th className='bg-cyan-blue text-white border p-2'>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {masterClasses.map(masterClass => {
                                const disabledRow = !masterClass.isAvailable;
                                const rowStyle = disabledRow
                                    ? 'bg-light text-muted border p-2'
                                    : '';
                                return (
                                    <tr key={masterClass.masterClassID}>
                                        <td className={`border p-2 ${rowStyle}`}>{masterClass.masterClassID}</td>
                                        <td className={`border p-2 ${rowStyle}`}>{masterClass.title}</td>
                                        <td className={`border p-2 ${rowStyle}`}>{masterClass.brief}</td>
                                        {isAdmin ? (
                                            <td className={`border p-2 ${rowStyle}`}>
                                                {masterClass.enrolledUsers.length} enrolled
                                            </td>
                                        ) : (
                                            <td className={`border p-2 ${rowStyle}`}>
                                                <button
                                                    className='functionButton me-2 btn text-pink border-pink'
                                                    onClick={() => unenrollFromMasterClass(masterClass.masterClassID)}
                                                >
                                                    <Edit03 className="d-lg-none" />
                                                    <span className="d-none d-lg-inline">Unenroll</span>
                                                </button>
                                            </td>
                                        )}
                                        {isAdmin && (
                                            <td className={`border p-2 ${rowStyle}`}>
                                                <button
                                                    className='functionButton me-2 btn text-pink border-pink'
                                                    onClick={() => handleEdit(masterClass)}
                                                >
                                                    <Edit03 className="d-lg-none" />
                                                    <span className="d-none d-lg-inline">Edit</span>
                                                </button>
                                                <button
                                                    className='functionButton btn bg-pink'
                                                    onClick={() => handleDelete(masterClass)}
                                                >
                                                    <Trash03 className="d-lg-none" />
                                                    <span className="d-none d-lg-inline">Delete</span>
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                );
                            })}
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
                    <Modal.Title>Add New Master Class</Modal.Title>
                    <Button variant="secondary" onClick={handleCloseAdd} className="ms-auto">close</Button>
                </Modal.Header>
                <Modal.Body>
                    <MasterClassAdd onSaveSuccess={handleSaveSuccess} />
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
                    <Modal.Title>Edit Master Class</Modal.Title>
                    <Button variant="secondary" onClick={handleCloseEdit} className="ms-auto">close</Button>
                </Modal.Header>
                <Modal.Body>
                    <MasterClassEdit masterClass={selectedMasterClass} onSaveSuccess={handleSaveSuccess} />
                </Modal.Body>
            </Modal>

            {/* DELETE CONFIRMATION MODAL */}
            <MasterClassDeleteConfirm
                show={showDeleteModal}
                handleClose={handleCloseDelete}
                handleConfirm={confirmDelete}
                masterClass={selectedMasterClass}
            />
        </div>
    );
}

export default MasterClasses;