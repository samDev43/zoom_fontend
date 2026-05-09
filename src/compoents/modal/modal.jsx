

export default function Modal({ isOpen, onClose, children }){
    if(!isOpen) return null;

    return(
        <div
            onClick={onClose}
            className="
                fixed
                inset-0
                z-50
                bg-black/40
                backdrop-blur-sm
                flex
                items-center
                justify-center
                p-4
            ">
                <div 
                onClick={(e) => e.stopPropagation()}
                className="
                    w-full
                    max-w-md
                    rounded-3xl
                    bg-[#111C22]
                    border
                    border-[#22313A]
                    shadow-2xl
                    shadow-black/40
                    p-6
                    animate-in
                    fade-in
                    zoom-in-95
                    duration-200
                    ">
                    {children}
                </div>
        </div>
    )
}