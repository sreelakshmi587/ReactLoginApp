import React, { useContext, createContext } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastDispatchContext = createContext();

export const useToastDispatch = () => {

  const context = useContext(ToastDispatchContext);
  return context;
}

export const ToastContext = ({ children }) => {

    const showToast = ({text, type, timeout, toastId}) => {

        const toastObj = {            
            position: "top-center",
            autoClose: timeout === undefined ? 5000 : timeout,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            toastId: toastId,            
        }

        switch (type) {
            case "warning":
                toast.warn(text, toastObj)
                break;
            case "info":
                toast.info(text, toastObj)
                break;
            case "error":
                toast.error(text, toastObj)
                break;
            case "success":
                toast.success(text, toastObj)
                break;
            default:
                break;
        }
        
    };
  
    return (
      <ToastDispatchContext.Provider value={showToast}>
            {children}
            <ToastContainer/>
      </ToastDispatchContext.Provider>
    )
  }