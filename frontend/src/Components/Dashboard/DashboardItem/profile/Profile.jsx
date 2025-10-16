import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../API/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Button, Form, Card, Modal } from "react-bootstrap";
import { USER_CHANGE_PASSWORD, USER_DELETE_BY_ID, USER_GETSELF, USER_UPDATE_BY_ID } from "../../../../externalApi/ExternalUrls";

function Profile() {
    const navigate = useNavigate();

    // simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // User data states
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);

    // Password modal
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    const [passwordError, setPasswordError] = useState(""); // server/general password error/success
    const [passwordSuccess, setPasswordSuccess] = useState("");
    const [passwordFieldErrors, setPasswordFieldErrors] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });

    // Edit profile states
    const [updating, setUpdating] = useState(false);
    const [editError, setEditError] = useState(""); // general edit error
    const [editSuccess, setEditSuccess] = useState("");
    const [fieldErrors, setFieldErrors] = useState({ email: "", fullName: "" }); // per-field errors

    // Delete profile states
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [passwordInput, setPasswordInput] = useState(""); // for delete modal password
    const [showPassword, setShowPassword] = useState(false); // toggle password visibility
    const [deleteKey, setDeleteKey] = useState("");
    const [deleteInput, setDeleteInput] = useState("");
    const [deleting, setDeleting] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState("");
    const [deleteFieldErrors, setDeleteFieldErrors] = useState({ key: "", password: "" });

    // Fetch user info
    useEffect(() => {
        axiosInstance.get(USER_GETSELF)
            .then(res => setUser(res.data))
            .catch(err => {
                console.error("Error fetching user:", err);
                setEditError("Failed to load user data. Please try again later.");
            });
    }, []);

    // Handle per-field changes and hide field-specific errors
    const handleOnChange = (field, value) => {
        if (!user) return;
        setUser({ ...user, [field]: value });
        setFieldErrors(prev => ({ ...prev, [field]: "" }));
        setEditError("");
        setEditSuccess("");
    };

    // Handle profile update
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!user) return;

        setEditError("");
        setEditSuccess("");
        setFieldErrors({ email: "", fullName: "" });

        // Validation
        const newFieldErrors = { email: "", fullName: "" };
        const trimmedEmail = user.email?.trim();

        if (!trimmedEmail) {
            newFieldErrors.email = "Email cannot be empty.";
        } else if (!emailRegex.test(trimmedEmail)) {
            newFieldErrors.email = "Please enter a valid email address.";
        }

        if (!user.fullName?.trim()) {
            newFieldErrors.fullName = "Full Name cannot be empty.";
        }

        if (newFieldErrors.email || newFieldErrors.fullName) {
            setFieldErrors(newFieldErrors);
            return;
        }

        setUpdating(true);

        try {
            await axiosInstance.patch(USER_UPDATE_BY_ID(user.userID), {
                newEmail: trimmedEmail,
                newFullName: user.fullName.trim()
            });
            setEditSuccess("Profile updated successfully.");
            setEditMode(false);
        } catch (err) {
            console.error("Update failed:", err);
            const msg = err?.response?.data?.message || err?.response?.data?.error || "Update failed. Please try again.";
            setEditError(msg);
        } finally {
            setUpdating(false);
        }
    };


    // Handle password change
    const handlePasswordFieldChange = (field, value) => {
        setPasswordData(prev => ({ ...prev, [field]: value }));
        setPasswordFieldErrors(prev => ({ ...prev, [field]: "" }));
        setPasswordError("");
        setPasswordSuccess("");
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        setPasswordError("");
        setPasswordSuccess("");
        // reset previous field errors
        setPasswordFieldErrors({ oldPassword: "", newPassword: "", confirmNewPassword: "" });

        const oldP = passwordData.oldPassword?.trim();
        const newP = passwordData.newPassword?.trim();
        const confP = passwordData.confirmNewPassword?.trim();

        // Collect all field errors
        const newErrors = { oldPassword: "", newPassword: "", confirmNewPassword: "" };
        if (!oldP) newErrors.oldPassword = "Old password cannot be empty.";
        if (!newP) newErrors.newPassword = "New password cannot be empty.";
        if (!confP) newErrors.confirmNewPassword = "Please confirm the new password.";
        // Only check mismatch if both new and confirm provided
        if (newP && confP && newP !== confP) newErrors.confirmNewPassword = "Passwords do not match!";

        // If any errors, show them all and abort
        if (newErrors.oldPassword || newErrors.newPassword || newErrors.confirmNewPassword) {
            setPasswordFieldErrors(newErrors);
            return;
        }

        axiosInstance.patch(USER_CHANGE_PASSWORD(user.userID), { currentPassword: oldP, newPassword: newP })
            .then(() => {
                setPasswordSuccess("Password changed successfully!");
                setPasswordData({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
                // Close modal after a short delay so user sees success message
                setTimeout(() => {
                    setShowPasswordModal(false);
                    setPasswordSuccess("");
                    setPasswordFieldErrors({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
                }, 1400);
            })
            .catch(err => {
                // Prefer server-provided message if available
                const msg = err?.response?.data?.message || err?.response?.data?.error || "Password change failed. Please try again.";
                setPasswordError(msg);
            });
    };

    // Generate random key for delete confirmation
    const generateKey = (length = 15) => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?-_=+-/|\\{}[]<>.,";
        let key = "";
        for (let i = 0; i < length; i++) {
            key += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return key;
    };

    const openDeleteModal = () => {
        setDeleteKey(generateKey(15));
        setDeleteInput("");
        setPasswordInput("");
        setDeleteSuccess("");
        setDeleteFieldErrors({ key: "", password: "" });
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (!user) return;

        // clear previous messages
        setDeleteSuccess("");
        setDeleteFieldErrors({ key: "", password: "" });

        // Check frontend key first (only show key-related error if mismatch)
        if (deleteInput !== deleteKey) {
            setDeleteFieldErrors(prev => ({ ...prev, key: "Confirmation key does not match." }));
            return;
        }

        // Then check password presence
        if (!passwordInput) {
            setDeleteFieldErrors(prev => ({ ...prev, password: "Please enter your password." }));
            return;
        }

        setDeleting(true);

        try {
            await axiosInstance.post(USER_DELETE_BY_ID(user.userID), {
                password: passwordInput
            });

            setDeleteSuccess("Profile deleted successfully.");
            // Give the user a moment to see success message before redirect
            setTimeout(() => {
                setShowDeleteModal(false);
                localStorage.clear();
                navigate('/');
            }, 1200);
        } catch (err) {
            console.error("Delete failed:", err);
            const msg = err?.response?.data?.msg || err?.response?.data?.message || "Failed to delete profile.";
            // show the server message on the password field (most likely server error for password)
            setDeleteFieldErrors(prev => ({ ...prev, password: msg }));
        } finally {
            setDeleting(false);
        }
    };


    if (!user) return <p>Loading...</p>;

    return (
        <div className="container mt-5">
            <Card className="p-4 shadow">
                <h3 className="mb-3 text-center">Profile</h3>

                {/* Edit success / error messages displayed inline in component */}
                {editError && <div className="mb-3 text-danger">{editError}</div>}
                {editSuccess && <div className="mb-3 text-success">{editSuccess}</div>}

                <Form onSubmit={handleUpdate}>
                    <Form.Group className="mb-3">
                        <Form.Label>User ID</Form.Label>
                        <Form.Control value={user.userID} disabled />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control value={user.username} disabled />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            value={user.email || ""}
                            onChange={(e) => handleOnChange("email", e.target.value)}
                            disabled={!editMode}
                            className={fieldErrors.email ? "is-invalid" : ""}
                        />
                        {fieldErrors.email && <div className="invalid-feedback d-block">{fieldErrors.email}</div>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            value={user.fullName || ""}
                            onChange={(e) => handleOnChange("fullName", e.target.value)}
                            disabled={!editMode}
                            className={fieldErrors.fullName ? "is-invalid" : ""}
                        />
                        {fieldErrors.fullName && <div className="invalid-feedback d-block">{fieldErrors.fullName}</div>}
                    </Form.Group>

                    {editMode ? (
                        <Button type="submit" variant="success" className="me-2" disabled={updating}>
                            {updating ? "Saving..." : "Save Changes"}
                        </Button>
                    ) : (
                        <button
                            type="button"
                            className="functionButton me-2 btn text-pink border-pink"
                            onClick={() => {
                                setEditMode(true);
                                setEditError("");
                                setEditSuccess("");
                                setFieldErrors({ email: "", fullName: "" });
                            }}
                        >
                            Edit Profile
                        </button>
                    )}

                    <Button
                        className="btn bg-cyan-blue border-0 ms-2"
                        onClick={() => {
                            // reset password form and messages when opening
                            setPasswordData({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
                            setPasswordError("");
                            setPasswordSuccess("");
                            setPasswordFieldErrors({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
                            setShowPasswordModal(true);
                        }}
                    >
                        Change Password
                    </Button>

                    <Button
                        className="functionButton bg-pink border-0 ms-2"
                        onClick={openDeleteModal}
                    >
                        Delete Profile
                    </Button>
                </Form>
            </Card>

            {/* Change Password Modal */}
            <Modal show={showPasswordModal} onHide={() => { setShowPasswordModal(false); setPasswordError(""); setPasswordSuccess(""); setPasswordFieldErrors({ oldPassword: "", newPassword: "", confirmNewPassword: "" }); }}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {passwordSuccess && <div className="mb-3 text-success">{passwordSuccess}</div>}
                    {passwordError && <div className="mb-3 text-danger">{passwordError}</div>}
                    <Form onSubmit={handleChangePassword}>
                        <Form.Group className="mb-3">
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={passwordData.oldPassword}
                                onChange={(e) => handlePasswordFieldChange("oldPassword", e.target.value)}
                                className={passwordFieldErrors.oldPassword ? "is-invalid" : ""}
                            />
                            {passwordFieldErrors.oldPassword && <div className="invalid-feedback d-block">{passwordFieldErrors.oldPassword}</div>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={passwordData.newPassword}
                                onChange={(e) => handlePasswordFieldChange("newPassword", e.target.value)}
                                className={passwordFieldErrors.newPassword ? "is-invalid" : ""}
                            />
                            {passwordFieldErrors.newPassword && <div className="invalid-feedback d-block">{passwordFieldErrors.newPassword}</div>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={passwordData.confirmNewPassword}
                                onChange={(e) => handlePasswordFieldChange("confirmNewPassword", e.target.value)}
                                className={passwordFieldErrors.confirmNewPassword ? "is-invalid" : ""}
                            />
                            {passwordFieldErrors.confirmNewPassword && <div className="invalid-feedback d-block">{passwordFieldErrors.confirmNewPassword}</div>}
                        </Form.Group>

                        <Button type="submit" variant="success" className="w-100">
                            Update Password
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Delete Profile Modal */}
            <Modal
                show={showDeleteModal}
                onHide={() => {
                    setShowDeleteModal(false);
                    setDeleteSuccess("");
                    setPasswordInput("");
                    setDeleteInput("");
                    setDeleteFieldErrors({ key: "", password: "" });
                }}
            >
                <Modal.Header closeButton />
                <Modal.Title className="px-3 pt-3">Confirm Delete Profile</Modal.Title>
                <Modal.Body>
                    {deleteSuccess && <div className="mb-3 text-success">{deleteSuccess}</div>}

                    <p>
                        To confirm deletion, type the confirmation key exactly and enter your password.
                    </p>

                    <Form.Group className="mb-3">
                        <Form.Label>Confirmation Key</Form.Label>
                        <Form.Control value={deleteKey} readOnly />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Type Confirmation Key</Form.Label>
                        <Form.Control
                            value={deleteInput}
                            onChange={(e) => { setDeleteInput(e.target.value); setDeleteFieldErrors(prev => ({ ...prev, key: "" })); }}
                            placeholder="Enter the confirmation key"
                            className={deleteFieldErrors.key ? "is-invalid" : ""}
                        />
                        {deleteFieldErrors.key && <div className="invalid-feedback d-block">{deleteFieldErrors.key}</div>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            value={passwordInput}
                            onChange={(e) => { setPasswordInput(e.target.value); setDeleteFieldErrors(prev => ({ ...prev, password: "" })); }}
                            placeholder="Enter your password"
                            className={deleteFieldErrors.password ? "is-invalid" : ""}
                        />
                        {deleteFieldErrors.password && <div className="invalid-feedback d-block">{deleteFieldErrors.password}</div>}
                        <Form.Check
                            type="checkbox"
                            label="Show password"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                        />
                    </Form.Group>


                    <div className="d-flex gap-2">
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setDeleteInput("");
                                setDeleteKey(generateKey(15));
                                setDeleteFieldErrors({ key: "", password: "" });
                            }}
                        >
                            Regenerate Key
                        </Button>
                        <Button
                            className="btn bg-pink border-0"
                            onClick={handleConfirmDelete}
                            disabled={deleting || !deleteInput || !passwordInput}
                        >
                            {deleting ? "Deleting..." : "Confirm Delete"}
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Profile;
