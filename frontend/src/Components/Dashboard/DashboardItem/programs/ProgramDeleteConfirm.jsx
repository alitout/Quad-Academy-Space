import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ProgramDeleteConfirm({ show, handleClose, handleConfirm, program }) {
    if (!program) return null;

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header>
                <Modal.Title>Confirm Delete</Modal.Title>
                <Button variant="secondary" onClick={handleClose} className="ms-auto">close</Button>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete <strong>{program.title}</strong> ({program.programID})?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button className='functionButton bg-pink border-0' onClick={handleConfirm}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ProgramDeleteConfirm;
