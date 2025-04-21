
import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { CheckCircle, Info, AlertTriangle, XCircle, X } from 'lucide-react';
import { Body, BodySmall } from '../typography/typography';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface ToastProps {
  /** Unique identifier for this toast */
  id: string;
  /** Title text for the toast */
  title?: string;
  /** Main message text for the toast */
  message: string;
  /** Type of toast that defines its appearance */
  variant?: ToastVariant;
  /** Duration in milliseconds before auto-dismissing (0 for no auto-dismiss) */
  duration?: number;
  /** Whether this toast can be dismissed by the user */
  dismissible?: boolean;
  /** Custom action button to display in the toast */
  action?: React.ReactNode;
  /** Callback fired when this toast is dismissed */
  onDismiss?: (id: string) => void;
  /** Position on screen where toasts appear */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
}

/**
 * Individual Toast component that displays a notification message
 */
const Toast: React.FC<ToastProps> = ({
  id,
  title,
  message,
  variant = 'info',
  duration = 5000,
  dismissible = true,
  action,
  onDismiss,
  position = 'bottom-right',
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  // Get the appropriate icon based on variant
  const getIcon = () => {
    switch (variant) {
      case 'info':
        return <Info className="h-5 w-5 text-info" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return <Info className="h-5 w-5 text-info" />;
    }
  };

  // Auto-dismiss toast after duration
  useEffect(() => {
    if (duration === 0) return;
    
    const timer = setTimeout(() => {
      handleDismiss();
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration]);

  // Handle dismissal animation and callback
  const handleDismiss = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onDismiss) onDismiss(id);
    }, 300); // Match animation duration
  }, [id, onDismiss]);

  // Don't render if not visible
  if (!isVisible) return null;

  const variantStyles = {
    info: 'border-info bg-info/10',
    success: 'border-success bg-success/10',
    warning: 'border-warning bg-warning/10',
    error: 'border-destructive bg-destructive/10',
  };

  return (
    <div
      role="alert"
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
      className={cn(
        'pointer-events-auto relative flex w-full max-w-md overflow-hidden rounded-lg border shadow-lg',
        'transition-all duration-300 ease-in-out',
        {
          'animate-fade-in': !isLeaving,
          'animate-fade-out': isLeaving,
        },
        variantStyles[variant]
      )}
    >
      <div className="flex w-full items-center gap-3 p-4">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1 mr-2">
          {title && <Body weight="medium" className="mb-0.5">{title}</Body>}
          <BodySmall color="muted">{message}</BodySmall>
        </div>
        {action && (
          <div className="flex-shrink-0 ml-auto mr-2">
            {action}
          </div>
        )}
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className="flex-shrink-0 ml-1 rounded-full p-1 hover:bg-background/10 focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

// Toast Container for layout positioning
interface ToastContainerProps {
  children: React.ReactNode;
  position: ToastProps['position'];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ children, position = 'bottom-right' }) => {
  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'top-center': 'top-0 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
  };

  return (
    <div 
      className={cn(
        'fixed z-50 flex flex-col gap-2 p-4 pointer-events-none max-h-screen overflow-hidden',
        positionClasses[position || 'bottom-right']
      )}
    >
      {children}
    </div>
  );
};

// Toast context for managing toasts globally
interface ToastContextType {
  addToast: (toast: Omit<ToastProps, 'id'>) => string;
  removeToast: (id: string) => void;
  removeAllToasts: () => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

// Toast provider component
export const ToastProvider: React.FC<{
  children: React.ReactNode;
  position?: ToastProps['position'];
}> = ({ children, position = 'bottom-right' }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  
  // Add a new toast
  const addToast = useCallback((toast: Omit<ToastProps, 'id'>): string => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    setToasts(prev => [...prev, { id, ...toast }]);
    return id;
  }, []);
  
  // Remove a toast by ID
  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);
  
  // Remove all toasts
  const removeAllToasts = useCallback(() => {
    setToasts([]);
  }, []);
  
  // Create portal container for toasts
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  
  useEffect(() => {
    // Create toast container element if it doesn't exist
    let element = document.getElementById('toast-container');
    if (!element) {
      element = document.createElement('div');
      element.id = 'toast-container';
      document.body.appendChild(element);
    }
    setPortalElement(element);
    
    return () => {
      // Clean up on unmount
      if (element && element.parentElement) {
        element.parentElement.removeChild(element);
      }
    };
  }, []);
  
  return (
    <ToastContext.Provider value={{ addToast, removeToast, removeAllToasts }}>
      {children}
      {portalElement && createPortal(
        <ToastContainer position={position}>
          {toasts.map(toast => (
            <Toast
              key={toast.id}
              {...toast}
              onDismiss={removeToast}
              position={position}
            />
          ))}
        </ToastContainer>,
        portalElement
      )}
    </ToastContext.Provider>
  );
};

// Hook for using toasts in components
export const useToast = (): ToastContextType => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Helper function for displaying a toast without using the hook
let toastContext: ToastContextType | null = null;

export const setToastContext = (context: ToastContextType) => {
  toastContext = context;
};

export const toast = {
  show: (props: Omit<ToastProps, 'id'>) => {
    if (!toastContext) {
      console.error('Toast context not initialized. Make sure ToastProvider is rendered and setToastContext has been called.');
      return '';
    }
    return toastContext.addToast(props);
  },
  info: (message: string, options?: Omit<ToastProps, 'id' | 'message' | 'variant'>) => {
    if (!toastContext) return '';
    return toastContext.addToast({ message, variant: 'info', ...options });
  },
  success: (message: string, options?: Omit<ToastProps, 'id' | 'message' | 'variant'>) => {
    if (!toastContext) return '';
    return toastContext.addToast({ message, variant: 'success', ...options });
  },
  warning: (message: string, options?: Omit<ToastProps, 'id' | 'message' | 'variant'>) => {
    if (!toastContext) return '';
    return toastContext.addToast({ message, variant: 'warning', ...options });
  },
  error: (message: string, options?: Omit<ToastProps, 'id' | 'message' | 'variant'>) => {
    if (!toastContext) return '';
    return toastContext.addToast({ message, variant: 'error', ...options });
  },
  dismiss: (id: string) => {
    if (!toastContext) return;
    toastContext.removeToast(id);
  },
  dismissAll: () => {
    if (!toastContext) return;
    toastContext.removeAllToasts();
  }
};

export default Toast;
