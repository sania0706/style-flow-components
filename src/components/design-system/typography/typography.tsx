
import React from 'react';
import { cn } from '@/lib/utils';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body-lg' | 'body' | 'body-sm' | 'caption' | 'helper' | 'code';
  as?: React.ElementType;
  color?: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'destructive' | 'info';
  truncate?: boolean;
  weight?: 'default' | 'light' | 'medium' | 'semibold' | 'bold';
  children: React.ReactNode;
}

/**
 * Typography component for consistent text styling across the application
 * 
 * @param variant - The typography style variant to apply
 * @param as - The HTML element to render as (default based on variant)
 * @param color - Text color variation
 * @param truncate - Whether to truncate text with ellipsis
 * @param weight - Font weight override
 * @param className - Additional CSS classes to apply
 */
const Typography = ({
  variant = 'body',
  as,
  color = 'default',
  truncate = false,
  weight = 'default',
  className,
  children,
  ...props
}: TypographyProps) => {
  // Map variants to their default HTML elements
  const variantElementMap: Record<TypographyProps['variant'] & string, React.ElementType> = {
    'display': 'h1',
    'h1': 'h1',
    'h2': 'h2',
    'h3': 'h3',
    'h4': 'h4',
    'h5': 'h5',
    'h6': 'h6',
    'body-lg': 'p',
    'body': 'p',
    'body-sm': 'p',
    'caption': 'span',
    'helper': 'span',
    'code': 'code',
  };

  // Determine which element to render
  const Element = as || variantElementMap[variant];

  // Handle font weight class
  const weightClasses: Record<string, string> = {
    'default': '', // Will use the variant's default weight
    'light': 'font-light',
    'medium': 'font-medium',
    'semibold': 'font-semibold',
    'bold': 'font-bold',
  };

  // Handle color classes
  const colorClasses: Record<string, string> = {
    'default': '',
    'muted': 'text-muted-foreground',
    'primary': 'text-primary',
    'success': 'text-success',
    'warning': 'text-warning',
    'destructive': 'text-destructive',
    'info': 'text-info',
  };

  // Base classes for the variant
  const baseClasses = cn(
    // Font size, line height, weight, and letter spacing from the variant
    `text-${variant} leading-${variant} font-${variant} tracking-${variant}`,
    // Color
    colorClasses[color],
    // Weight override if specified
    weightClasses[weight],
    // Truncation
    truncate && 'truncate',
    // Additional classes
    className
  );

  return (
    <Element className={baseClasses} {...props}>
      {children}
    </Element>
  );
};

// Export named components for ease of use
export const Display = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="display" {...props} />
);

export const H1 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h1" {...props} />
);

export const H2 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h2" {...props} />
);

export const H3 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h3" {...props} />
);

export const H4 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h4" {...props} />
);

export const H5 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h5" {...props} />
);

export const H6 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h6" {...props} />
);

export const BodyLarge = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="body-lg" {...props} />
);

export const Body = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="body" {...props} />
);

export const BodySmall = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="body-sm" {...props} />
);

export const Caption = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="caption" {...props} />
);

export const Helper = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="helper" color="muted" {...props} />
);

export const Code = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="code" as="code" {...props} />
);

export default Typography;
