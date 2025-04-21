
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { Helper } from '../typography/typography';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label for the checkbox */
  label?: string;
  /** Help text displayed below the checkbox */
  helpText?: string;
  /** Error message displayed when checkbox is invalid */
  error?: string;
  /** Whether to display the checkbox as being in an error state */
  isError?: boolean;
  /** Size variant of the checkbox */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the checkbox is indeterminate */
  indeterminate?: boolean;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Whether the checkbox is required */
  required?: boolean;
}

/**
 * Checkbox component for binary choices or multiple selections
 */
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      label,
      helpText,
      error,
      isError,
      size = 'md',
      checked,
      indeterminate = false,
      disabled = false,
      required = false,
      onChange,
      ...props
    },
    ref
  ) => {
    // Create ref to control checkbox if not provided
    const innerRef = React.useRef<HTMLInputElement>(null);
    const resolvedRef = (ref || innerRef) as React.MutableRefObject<HTMLInputElement | null>;
    
    // Set indeterminate prop (which isn't a standard HTML attribute)
    React.useEffect(() => {
      if (resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, resolvedRef]);

    const inputId = props.id || `checkbox-${label?.replace(/\s+/g, '-').toLowerCase() || Math.random().toString(36).substring(2, 9)}`;
    const hasError = isError || !!error;
    
    // Size classes for the checkbox
    const sizeClasses = {
      sm: {
        checkbox: 'h-3.5 w-3.5',
        checkIcon: 'h-2.5 w-2.5',
        text: 'text-xs',
        wrapper: 'gap-1.5'
      },
      md: {
        checkbox: 'h-4 w-4',
        checkIcon: 'h-3 w-3',
        text: 'text-sm',
        wrapper: 'gap-2'
      },
      lg: {
        checkbox: 'h-5 w-5',
        checkIcon: 'h-4 w-4',
        text: 'text-base',
        wrapper: 'gap-2.5'
      },
    };

    return (
      <div className="flex flex-col space-y-1.5">
        <div className={cn('flex items-center', sizeClasses[size].wrapper)}>
          <div className="relative flex items-center">
            <input
              id={inputId}
              type="checkbox"
              ref={resolvedRef}
              checked={checked}
              disabled={disabled}
              required={required}
              onChange={onChange}
              className={cn(
                'peer appearance-none rounded-sm border border-input ring-offset-background',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                sizeClasses[size].checkbox,
                {
                  'border-destructive': hasError,
                  'opacity-50 cursor-not-allowed': disabled,
                },
                className
              )}
              aria-invalid={hasError}
              aria-describedby={helpText ? `${inputId}-description` : undefined}
              {...props}
            />
            <Check
              className={cn(
                'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-foreground opacity-0',
                'peer-checked:opacity-100 transition-opacity',
                sizeClasses[size].checkIcon
              )}
            />
            <div
              className={cn(
                'pointer-events-none absolute left-0 top-0',
                'h-full w-full rounded-sm border-primary',
                'peer-checked:bg-primary',
                {
                  'border-destructive peer-checked:bg-destructive': hasError,
                  'opacity-50': disabled,
                }
              )}
            />
          </div>
          {label && (
            <label
              htmlFor={inputId}
              className={cn(
                'font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                sizeClasses[size].text,
                hasError ? 'text-destructive' : 'text-foreground'
              )}
            >
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </label>
          )}
        </div>
        
        {(helpText || error) && (
          <Helper
            id={helpText ? `${inputId}-description` : undefined}
            className={cn('text-xs', hasError ? 'text-destructive' : 'text-muted-foreground')}
          >
            {error || helpText}
          </Helper>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
