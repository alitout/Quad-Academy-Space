import React from 'react';
import { Modal, Button } from 'react-bootstrap';


const generateConfirmationKey = (length = 15) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?-_=+-/|\\{}[]<>.,";
    let key = "";
    for (let i = 0; i < length; i++) {
        key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
};

function UsersDeleteConfirm({ show, handleClose, handleConfirm, user }) {
    const [confirmationKey, setConfirmationKey] = React.useState("");
    const [typedKey, setTypedKey] = React.useState("");
    const [keyError, setKeyError] = React.useState("");

    React.useEffect(() => {
        if (!show) return;
        setConfirmationKey(generateConfirmationKey(15));
        setTypedKey("");
        setKeyError("");
    }, [show]);

    const onClose = () => {
        setTypedKey("");
        setKeyError("");
        handleClose();
    };

    const onConfirm = () => {
        if (typedKey !== confirmationKey) {
            setKeyError("Confirmation key does not match.");
            return;
        }
        handleConfirm();
    };

    if (!user) return null;


    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header>
                <Modal.Title>Confirm Delete</Modal.Title>
                <Button variant="secondary" onClick={onClose} className="ms-auto">close</Button>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete user <strong>{user.username}</strong>, with ID <strong>{user.userID}</strong>?</p>

                <div className="mb-3">
                    <label className="form-label">Confirmation Key</label>
                    <input type="text" className="form-control" value={confirmationKey} readOnly />
                </div>

                <div className="mb-3">
                    <label className="form-label">Type Confirmation Key</label>
                    <input
                        type="text"
                        className={`form-control ${keyError ? "is-invalid" : ""}`}
                        value={typedKey}
                        onChange={(e) => {
                            setTypedKey(e.target.value);
                            if (keyError) setKeyError("");
                        }}
                    />
                    {keyError && <div className="invalid-feedback d-block">{keyError}</div>}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button
                    className="functionButton bg-pink border-0"
                    onClick={onConfirm}
                    disabled={!typedKey || typedKey !== confirmationKey}
                >
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UsersDeleteConfirm;