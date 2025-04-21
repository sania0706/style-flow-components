
import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from './theme-provider';

interface ThemeSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether to show the theme name labels */
  showLabels?: boolean;
}

/**
 * Theme Switcher component for toggling between light, dark, and system themes
 */
const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  showLabels = true,
  className,
  ...props
}) => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={cn('flex items-center space-x-1 rounded-md border p-1', className)}
      {...props}
    >
      <button
        onClick={() => setTheme('light')}
        className={cn(
          'inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
          theme === 'light'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
        )}
        aria-label="Light theme"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={showLabels ? 'mr-1' : ''}
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
        {showLabels && 'Light'}
      </button>

      <button
        onClick={() => setTheme('dark')}
        className={cn(
          'inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
          theme === 'dark'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
        )}
        aria-label="Dark theme"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={showLabels ? 'mr-1' : ''}
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
        {showLabels && 'Dark'}
      </button>

      <button
        onClick={() => setTheme('system')}
        className={cn(
          'inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
          theme === 'system'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
        )}
        aria-label="System theme"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={showLabels ? 'mr-1' : ''}
        >
          <rect width="16" height="12" x="4" y="6" rx="2" />
          <path d="M2 10h20" />
          <path d="M6 14h12" />
          <path d="M12 18v2" />
          <path d="M9 22h6" />
        </svg>
        {showLabels && 'System'}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
