import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function MasterClassDeleteConfirm({ show, handleClose, handleConfirm, masterClass }) {
    if (!masterClass) return null;

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header>
                <Modal.Title>Confirm Delete</Modal.Title>
                <Button variant="secondary" onClick={handleClose} className="ms-auto">close</Button>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete <strong>{masterClass.title}</strong> ({masterClass.masterClassID})?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button className='functionButton bg-pink border-0' onClick={handleConfirm}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MasterClassDeleteConfirm;
