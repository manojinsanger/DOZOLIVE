// import React, {
//     createContext,
//     useContext,
//     useState,
//     useRef,
//     useEffect,
//   } from 'react';
//   import CustomToast from '@/components/toast/CustomToast';
  
//   const ToastContext = createContext();
  
//   export const ToastProvider = ({children}) => {
//     const [toastConfig, setToastConfig] = useState({
//       visible: false,
//       type: 'info',
//       message: '',
//       duration: 3000,
//       isLoading: false,
//       loadingResult: undefined,
//     });
  
//     const nextToast = useRef(null); // 👈 Temporarily store next toast
  
//     const showToastInternal = config => {
//       setToastConfig({
//         visible: true,
//         ...config,
//       });
//     };
  
//     const showToast = (type, message, duration = 3000) => {
//       const newToast = {
//         type,
//         message,
//         duration,
//         isLoading: false,
//         loadingResult: undefined,
//       };
  
//       if (toastConfig.visible) {
//         // Toast already visible, hide it first
//         nextToast.current = newToast;
//         setToastConfig(prev => ({...prev, visible: false}));
//       } else {
//         showToastInternal(newToast);
//       }
//     };
  
//     const showLoading = (message = 'Loading...') => {
//       const loadingToast = {
//         type: 'loading',
//         message,
//         duration: 0,
//         isLoading: true,
//         loadingResult: undefined,
//       };
  
//       if (toastConfig.visible) {
//         nextToast.current = loadingToast;
//         setToastConfig(prev => ({...prev, visible: false}));
//       } else {
//         showToastInternal(loadingToast);
//       }
  
//       return success => {
//         setToastConfig(prev => ({
//           ...prev,
//           isLoading: false,
//           loadingResult: success,
//         }));
//       };
//     };
  
//     const hideToast = () => {
//       setToastConfig(prev => ({...prev, visible: false}));
//     };
  
//     const handleComplete = () => {
//       if (nextToast.current) {
//         const pendingToast = nextToast.current;
//         nextToast.current = null;
//         setTimeout(() => {
//           showToastInternal(pendingToast);
//         }, 10); // slight delay after hide to start new one smoothly
//       } else {
//         setToastConfig({
//           visible: false,
//           type: 'info',
//           message: '',
//           duration: 0,
//           isLoading: false,
//           loadingResult: undefined,
//         });
//       }
//     };
  
//     return (
//       <ToastContext.Provider value={{showToast, showLoading, hideToast}}>
//         {children}
//         <CustomToast
//           visible={toastConfig.visible}
//           type={toastConfig.type}
//           message={toastConfig.message}
//           duration={toastConfig.duration}
//           onComplete={handleComplete}
//           isLoading={toastConfig.isLoading}
//           loadingResult={toastConfig.loadingResult}
//         />
//       </ToastContext.Provider>
//     );
//   };
  
//   export const useToast = () => {
//     const context = useContext(ToastContext);
//     if (!context) {
//       throw new Error('useToast must be used within a ToastProvider');
//     }
//     return context;
//   };
import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
    ReactNode,
  } from 'react';
  import CustomToast from '@/components/toast/CustomToast';
  
  // Define the shape of the toast configuration
  interface ToastConfig {
    visible: boolean;
    type: 'info' | 'success' | 'error' | 'loading';
    message: string;
    duration: number;
    isLoading: boolean;
    loadingResult: boolean | undefined;
  }
  
  // Define the shape of the context value
  interface ToastContextType {
    showToast: (type: ToastConfig['type'], message: string, duration?: number) => void;
    showLoading: (message?: string) => (success: boolean) => void;
    hideToast: () => void;
  }
  
  // Create the context with a default value of undefined
  const ToastContext = createContext<ToastContextType | undefined>(undefined);
  
  interface ToastProviderProps {
    children: ReactNode;
  }
  
  export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toastConfig, setToastConfig] = useState<ToastConfig>({
      visible: false,
      type: 'info',
      message: '',
      duration: 3000,
      isLoading: false,
      loadingResult: undefined,
    });
  
    const nextToast = useRef<Omit<ToastConfig, 'visible'> | null>(null);
  
    const showToastInternal = (config: Omit<ToastConfig, 'visible'>) => {
      setToastConfig({
        visible: true,
        ...config,
      });
    };
  
    const showToast = (type: ToastConfig['type'], message: string, duration = 3000) => {
      const newToast: Omit<ToastConfig, 'visible'> = {
        type,
        message,
        duration,
        isLoading: false,
        loadingResult: undefined,
      };
  
      if (toastConfig.visible) {
        nextToast.current = newToast;
        setToastConfig(prev => ({ ...prev, visible: false }));
      } else {
        showToastInternal(newToast);
      }
    };
  
    const showLoading = (message = 'Loading...') => {
      const loadingToast: Omit<ToastConfig, 'visible'> = {
        type: 'loading',
        message,
        duration: 0,
        isLoading: true,
        loadingResult: undefined,
      };
  
      if (toastConfig.visible) {
        nextToast.current = loadingToast;
        setToastConfig(prev => ({ ...prev, visible: false }));
      } else {
        showToastInternal(loadingToast);
      }
  
      return (success: boolean) => {
        setToastConfig(prev => ({
          ...prev,
          isLoading: false,
          loadingResult: success,
        }));
      };
    };
  
    const hideToast = () => {
      setToastConfig(prev => ({ ...prev, visible: false }));
    };
  
    const handleComplete = () => {
      if (nextToast.current) {
        const pendingToast = nextToast.current;
        nextToast.current = null;
        setTimeout(() => {
          showToastInternal(pendingToast);
        }, 10);
      } else {
        setToastConfig({
          visible: false,
          type: 'info',
          message: '',
          duration: 0,
          isLoading: false,
          loadingResult: undefined,
        });
      }
    };
  
    return (
      <ToastContext.Provider value={{ showToast, showLoading, hideToast }}>
        {children}
        <CustomToast
          visible={toastConfig.visible}
          type={toastConfig.type}
          message={toastConfig.message}
          duration={toastConfig.duration}
          onComplete={handleComplete}
          isLoading={toastConfig.isLoading}
          loadingResult={toastConfig.loadingResult}
        />
      </ToastContext.Provider>
    );
  };
  
  export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
      throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
  };