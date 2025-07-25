import React from 'react';

interface ToggleButton {
    modalOpen: boolean;
    setModalOpen: (modalOpen: boolean) => void;
    children: React.ReactNode;
}

const Modal: React.FC<ToggleButton> = ({modalOpen , setModalOpen, children}) => {
    return (
        <div>
            <dialog id="my_modal_3" className={`modal ${ modalOpen ? "modal-open":""}`}>
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>{setModalOpen(false)}}>✕</button>
                    </form>
                    {children}
                </div>
            </dialog>
        </div>
    );
};

export default Modal;
