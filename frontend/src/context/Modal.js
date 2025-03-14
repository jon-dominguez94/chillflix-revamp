import { createContext, useContext, useRef, useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = createContext();

export const ModalProvider = ({children}) => {
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(modalRef.current)
    }, []);

    return (
        <>
            <ModalContext.Provider value={value}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef}></div>
        </>
    )
}

export const Modal = ({ onClose, children }) => {
    const modalNode = useContext(ModalContext);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <div id="modal">
            <div id="modal-background" onClick={onClose}></div>
            <div id="modal-content">
                {children}
            </div>
        </div>,
        modalNode
    )
}
