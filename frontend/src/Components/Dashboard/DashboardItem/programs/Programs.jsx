import React, { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../../../API/axiosInstance';
import { Modal, Button } from 'react-bootstrap';

import ProgramAdd from './ProgramsAdd';
import ProgramEdit from './ProgramsEdit';
import ProgramDeleteConfirm from './ProgramDeleteConfirm';

import { PROGRAM_GET_ALL, PROGRAM_DELETE_BY_ID } from '../../../../externalApi/ExternalUrls';

function Programs() {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState(null);

    useEffect(() => {
        fetchPrograms();
    }, []);

    const fetchPrograms = async () => {
        try {
            const res = await axios.get(PROGRAM_GET_ALL);
            setPrograms(res.data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const handleAdd = () => setShowAddModal(true);
    const handleEdit = (program) => {
        setSelectedProgram(program);
        setShowEditModal(true);
    };
    const handleDelete = (program) => {
        setSelectedProgram(program);
        setShowDeleteModal(true);
    };

    // Close modals
    const handleCloseAdd = () => setShowAddModal(false);
    const handleCloseEdit = () => setShowEditModal(false);
    const handleCloseDelete = () => setShowDeleteModal(false);

    const handleSaveSuccess = () => {
        fetchPrograms();
        setShowAddModal(false);
        setShowEditModal(false);
    };

    const confirmDelete = async () => {
        try {
            await axiosInstance.delete(PROGRAM_DELETE_BY_ID(selectedProgram.programID));
            setPrograms(programs.filter(p => p.programID !== selectedProgram.programID));
        } catch (err) {
            console.error(err);
        }
        setShowDeleteModal(false);
    };

    return (
        <div>
            <h2>Programs</h2>
            <button
                className='functionButton btn bg-pink mb-3'
                onClick={handleAdd}
            >
                Add New Program
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
                        {programs.map(program => (
                            <tr key={program.programID}>
                                <td className='border p-2'>{program.programID}</td>
                                <td className='border p-2'>{program.title}</td>
                                <td className='border p-2'>
                                    <button
                                        className='functionButton me-2 btn text-pink border-pink'
                                        onClick={() => handleEdit(program)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className='functionButton btn bg-pink'
                                        onClick={() => handleDelete(program)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
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
                    <Modal.Title>Add New Program</Modal.Title>
                    <Button variant="secondary" onClick={handleCloseAdd} className="ms-auto">close</Button>
                </Modal.Header>
                <Modal.Body>
                    <ProgramAdd onSaveSuccess={handleSaveSuccess} />
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
                    <Modal.Title>Edit Program</Modal.Title>
                    <Button variant="secondary" onClick={handleCloseEdit} className="ms-auto">close</Button>
                </Modal.Header>
                <Modal.Body>
                    <ProgramEdit program={selectedProgram} onSaveSuccess={handleSaveSuccess} />
                </Modal.Body>
            </Modal>

            {/* DELETE CONFIRMATION MODAL */}
            <ProgramDeleteConfirm
                show={showDeleteModal}
                handleClose={handleCloseDelete}
                handleConfirm={confirmDelete}
                program={selectedProgram}
            />
        </div>
    );
}

export default Programs;