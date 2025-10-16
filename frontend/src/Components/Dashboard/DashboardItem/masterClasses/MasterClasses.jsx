import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import axiosInstance from '../../../../API/axiosInstance';

import { MASTERCLASS_GET_ALL, MASTERCLASS_DELETE_BY_ID } from '../../../../externalApi/ExternalUrls';
import MasterClassAdd from './MasterClassesAdd';
import MasterClassEdit from './MasterClassesEdit';
import MasterClassDeleteConfirm from './MasterClassesDeleteConfirm';

function MasterClasses() {
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
            const res = await axios.get(MASTERCLASS_GET_ALL);
            const sorted = res.data.sort((a, b) => a.masterClassID - b.masterClassID);
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

    return (
        <div>
            <h2>Master Classes</h2>
            <button
                className='functionButton btn bg-pink mb-3'
                onClick={handleAdd}
            >
                Add New Master Class
            </button>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='bg-cyan-blue text-white border p-2'>ID</th>
                            <th className='bg-cyan-blue text-white border p-2'>Title</th>
                            <th className='bg-cyan-blue text-white border p-2'>Actions</th>
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
                                    <td className={`border p-2 ${rowStyle}`}>
                                        <button
                                            className='functionButton me-2 btn text-pink border-pink'
                                            onClick={() => handleEdit(masterClass)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className='functionButton btn bg-pink'
                                            onClick={() => handleDelete(masterClass)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
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