import { useEffect, useRef } from "react";

const useOutsideClick = (Callback, listenCapture = true) => {
    const overlayRef = useRef();

    useEffect(() => {

        function handleOutsideClick(e) {
            if (overlayRef.current && !overlayRef.current.contains(e.target)) {
                console.log("clicked outside");
                Callback();
            }
        }

        document.addEventListener("click", handleOutsideClick, listenCapture);
        
        return () => {
            document.removeEventListener("click", handleOutsideClick, listenCapture);
        };

    }, [Callback, listenCapture]);

    return overlayRef;
}

export default useOutsideClick