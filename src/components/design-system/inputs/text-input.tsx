
import React, { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, X } from 'lucide-react';
import { Helper } from '../typography/typography';

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label text for the input */
  label: string;
  /** Help text displayed below the input */
  helpText?: string;
  /** Error message displayed when input is invalid */
  error?: string;
  /** Whether to display the input as being in an error state */
  isError?: boolean;
  /** Leading icon element */
  leadingIcon?: React.ReactNode;
  /** Trailing icon element */
  trailingIcon?: React.ReactNode;
  /** Whether to show a clear button when input has content */
  clearable?: boolean;
  /** Callback for when the clear button is pressed */
  onClear?: () => void;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is required */
  required?: boolean;
  /** Size variant of the input */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to fill the width of its container */
  fullWidth?: boolean;
  /** Additional classNames to apply to the input container */
  containerClassName?: string;
}

/**
 * Text Input component for collecting user provided text information
 */
const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      helpText,
      error,
      isError,
      className,
      containerClassName,
      leadingIcon,
      trailingIcon,
      clearable = false,
      onClear,
      value,
      size = 'md',
      required = false,
      fullWidth = false,
      type = 'text',
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const [localValue, setLocalValue] = useState(value || '');
    
    // Handle input value changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalValue(e.target.value);
      if (props.onChange) {
        props.onChange(e);
      }
    };

    // Handle clearing the input
    const handleClear = () => {
      setLocalValue('');
      if (onClear) {
        onClear();
      }
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    // Determine input type
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
    
    // Determine if we should show the clear button
    const shouldShowClear = clearable && localValue && !disabled && typeof localValue === 'string' && localValue.length > 0;

    // Dynamic classes based on component props
    const sizeClasses = {
      sm: 'h-8 text-xs px-2 py-1',
      md: 'h-10 text-sm px-3 py-2',
      lg: 'h-12 text-base px-4 py-2.5',
    };

    const inputId = props.id || `text-input-${label.replace(/\s+/g, '-').toLowerCase()}`;
    const hasError = isError || !!error;
    const hasLeadingIcon = !!leadingIcon;
    const hasTrailingAction = (isPassword || shouldShowClear) && !trailingIcon;
    const hasTrailingIcon = !!trailingIcon;

    return (
      <div className={cn('flex flex-col space-y-1.5', fullWidth ? 'w-full' : 'w-fit', containerClassName)}>
        <label 
          htmlFor={inputId}
          className={cn(
            'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            hasError ? 'text-destructive' : 'text-foreground'
          )}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
        
        <div className={cn('relative', fullWidth && 'w-full')}>
          {hasLeadingIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leadingIcon}
            </div>
          )}
          
          <input
            id={inputId}
            type={inputType}
            value={value !== undefined ? value : localValue}
            onChange={handleChange}
            disabled={disabled}
            className={cn(
              'flex w-full rounded-md border bg-background text-foreground shadow-sm transition-colors',
              'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
              'file:border-0 file:bg-transparent file:font-medium',
              'placeholder:text-muted-foreground',
              sizeClasses[size],
              {
                'border-destructive ring-destructive': hasError,
                'border-input': !hasError,
                'pl-9': hasLeadingIcon,
                'pr-9': hasTrailingIcon || hasTrailingAction,
                'opacity-50 cursor-not-allowed': disabled,
              },
              className
            )}
            aria-invalid={hasError}
            aria-describedby={helpText ? `${inputId}-description` : undefined}
            ref={ref}
            required={required}
            {...props}
          />
          
          {hasTrailingAction ? (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {isPassword ? (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-muted-foreground hover:text-foreground focus:outline-none"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              ) : shouldShowClear ? (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-muted-foreground hover:text-foreground focus:outline-none"
                  tabIndex={-1}
                  aria-label="Clear input"
                >
                  <X size={16} />
                </button>
              ) : null}
            </div>
          ) : hasTrailingIcon ? (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {trailingIcon}
            </div>
          ) : null}
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

TextInput.displayName = 'TextInput';

export default TextInput;
