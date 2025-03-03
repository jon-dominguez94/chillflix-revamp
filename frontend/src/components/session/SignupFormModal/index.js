import { useState } from "react";

import { Modal } from "../../../context/Modal";
import SignupForm from "./SignupForm";

const SignupFormModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="session-btn signup" onClick={() => setShowModal(true)}>S I G N U P</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupForm />
                </Modal>
            )}
        </>
    )
}

export default SignupFormModal
