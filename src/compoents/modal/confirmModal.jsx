import Modal from "./modal";

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText, cancelText}){
    if(!isOpen) return null;

    return(
       <Modal isOpen={isOpen} onClose={onClose}>
          <div className="flex flex-col gap-5">
            <div >
                <h1 className="text-2xl font-bold text-white">{title}</h1>
                <p className="text-[#94A3B8] mt-2">{message}</p>
            </div>
            <div className="flex gap-2">
                <button
                 onClick={onClose}
                 className="
                    px-5 py-2
                    rounded-xl
                    border
                    border-[#22313A]
                    text-white
                    hover:border-red-400
                    hover:text-red-400
                    transition
                    ">
                        {cancelText}
                </button>

                <button 
                    onClick={onConfirm}
                    className="
              px-5 py-2
              rounded-xl
              bg-red-500
              hover:bg-red-600
              text-white
              transition
            ">  
            {confirmText}
            </button>
            </div>

          </div>
       </Modal> 
    )
}