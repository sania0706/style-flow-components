
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, Info, AlertTriangle, XCircle, X } from 'lucide-react';
import { Body, BodySmall } from '../typography/typography';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Type of alert that defines its appearance */
  variant?: AlertVariant;
  /** Title text for the alert */
  title?: string;
  /** Whether this alert can be dismissed by the user */
  dismissible?: boolean;
  /** Callback fired when this alert is dismissed */
  onDismiss?: () => void;
  /** Whether to fill the width of its container */
  fullWidth?: boolean;
  /** Whether the alert has a border */
  bordered?: boolean;
  /** Icon to display in the alert. If not provided, a default icon will be used based on variant */
  icon?: React.ReactNode;
  /** Additional content to display in the alert */
  children: React.ReactNode;
}

/**
 * Alert component for displaying important messages or feedback
 */
const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  dismissible = false,
  onDismiss,
  fullWidth = true,
  bordered = true,
  icon,
  children,
  className,
  ...props
}) => {
  // Get the appropriate icon based on variant
  const getDefaultIcon = () => {
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
  
  // Variant styles for different alert types
  const variantStyles = {
    info: {
      background: 'bg-info/10',
      border: 'border-info',
      icon: 'text-info',
    },
    success: {
      background: 'bg-success/10',
      border: 'border-success',
      icon: 'text-success',
    },
    warning: {
      background: 'bg-warning/10',
      border: 'border-warning',
      icon: 'text-warning',
    },
    error: {
      background: 'bg-destructive/10',
      border: 'border-destructive',
      icon: 'text-destructive',
    },
  };

  return (
    <div
      role="alert"
      className={cn(
        'relative rounded-lg p-4',
        variantStyles[variant].background,
        {
          'border': bordered,
          [variantStyles[variant].border]: bordered,
          'w-full': fullWidth,
          'inline-block': !fullWidth,
        },
        className
      )}
      {...props}
    >
      <div className="flex">
        {(icon || getDefaultIcon()) && (
          <div className="flex-shrink-0 mr-3">
            {icon || getDefaultIcon()}
          </div>
        )}
        <div className="flex-1">
          {title && <Body weight="medium" className="mb-1">{title}</Body>}
          <BodySmall>{children}</BodySmall>
        </div>
        {dismissible && (
          <div className="flex-shrink-0 ml-3">
            <button
              type="button"
              onClick={onDismiss}
              className="inline-flex rounded-md p-1.5 hover:bg-background/20 focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;
