import React, { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../../../API/axiosInstance';
import { Modal, Button } from 'react-bootstrap';
import { useAuth } from '../../../../Context/AuthContext';

import ProgramAdd from './ProgramsAdd';
import ProgramEdit from './ProgramsEdit';
import ProgramDeleteConfirm from './ProgramDeleteConfirm';

import { PROGRAM_GET_ALL, PROGRAM_DELETE_BY_ID, ENROLLMENT_GET_USER, ENROLLMENT_UNENROLL_PROGRAM } from '../../../../externalApi/ExternalUrls';

import Edit03 from '@untitled-ui/icons-react/build/cjs/Edit03';
import Trash03 from '@untitled-ui/icons-react/build/cjs/Trash03';

function Programs() {
    const auth = useAuth();
    const isAdmin = auth?.user?.role === 'admin';

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
            if (isAdmin) {
                // Admins see all programs
                const res = await axios.get(PROGRAM_GET_ALL);
                setPrograms(res.data);
            } else {
                // Non-admins see only enrolled programs
                const res = await axiosInstance.get(ENROLLMENT_GET_USER);
                setPrograms(res.data.programs);
            }
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

    const unenrollFromProgram = async (programID) => {
        try {
            await axiosInstance.post(ENROLLMENT_UNENROLL_PROGRAM, { programID });
            alert("Unenrolled successfully");
            fetchPrograms();
        } catch (err) {
            console.error("Unenrollment error:", err);
            alert(err.response?.data?.msg || "Unenrollment failed. Please try again.");
        }
    };

    return (
        <div>
            <h2>Programs</h2>
            {isAdmin && (
                <button
                    className='functionButton btn bg-pink mb-3'
                    onClick={handleAdd}
                >
                    Add New Program
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
                            {programs.map(program => {
                                const disabledRow = !program.isAvailable;
                                const rowStyle = disabledRow
                                    ? 'bg-light text-muted border p-2'
                                    : '';
                                return (
                                    <tr key={program.programID}>
                                        <td className={`border p-2 ${rowStyle}`}>{program.programID}</td>
                                        <td className={`border p-2 ${rowStyle}`}>{program.title}</td>
                                        <td className={`border p-2 ${rowStyle}`}>{program.brief}</td>
                                        {isAdmin ? (
                                            <td className={`border p-2 ${rowStyle}`}>
                                                {program.enrolledUsers.length} enrolled
                                            </td>
                                        ) : (
                                            <td className={`border p-2 ${rowStyle}`}>
                                                <button
                                                    className='functionButton me-2 btn text-pink border-pink'
                                                    onClick={() => unenrollFromProgram(program.programID)}
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
                                                    onClick={() => handleEdit(program)}
                                                >
                                                    <Edit03 className="d-lg-none" />
                                                    <span className="d-none d-lg-inline">Edit</span>
                                                </button>
                                                <button
                                                    className='functionButton btn bg-pink'
                                                    onClick={() => handleDelete(program)}
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