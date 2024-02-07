import {useRef, forwardRef, useImperativeHandle, useState} from 'react';
import '../index.css';

const Modal = forwardRef(function Modal({onClose}, ref) {
    const dialogRef = useRef(null);
    const [message, setMessage] = useState('');

    useImperativeHandle(ref, () => {
        return {
            open(mode, msg) {
                setMessage(msg);
                dialogRef.current.showModal()
            },
            close() {
                dialogRef.current.close();        
            }
        }
    }, []);

    return (
        <dialog className="modal" ref={dialogRef}>
            <form method='dialog' onSubmit={onClose}>
                <div>{message}</div>
                <button className='close-modal-btn' type='submit'>Close</button>
            </form>
        </dialog>
    )
});

export default Modal;