import { useState } from "react";

import { Modal } from "../../../context/Modal";
import LoginForm from "./LoginForm";

const LoginFormModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="session-btn signin" onClick={() => setShowModal(true)}>Sign In</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                </Modal>
            )}
        </>
    );
};

export default LoginFormModal;
