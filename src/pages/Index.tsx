
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@/components/design-system/theme/theme-provider';
import { ToastProvider, useToast, setToastContext } from '@/components/design-system/feedback/toast';
import Typography, {
  Display,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Body,
  BodyLarge,
  BodySmall,
  Caption,
  Helper,
  Code
} from '@/components/design-system/typography/typography';
import TextInput from '@/components/design-system/inputs/text-input';
import Checkbox from '@/components/design-system/inputs/checkbox';
import Alert from '@/components/design-system/feedback/alert';
import ThemeSwitcher from '@/components/design-system/theme/theme-switcher';
import { Search } from 'lucide-react';

const ToastDemo: React.FC = () => {
  const { addToast } = useToast();
  
  const showToast = (variant: 'info' | 'success' | 'warning' | 'error') => {
    addToast({
      title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Toast`,
      message: `This is an example of a ${variant} toast notification.`,
      variant,
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => showToast('info')}
        className="rounded-md bg-info px-4 py-2 text-white hover:bg-info/90"
      >
        Show Info Toast
      </button>
      <button
        onClick={() => showToast('success')}
        className="rounded-md bg-success px-4 py-2 text-white hover:bg-success/90"
      >
        Show Success Toast
      </button>
      <button
        onClick={() => showToast('warning')}
        className="rounded-md bg-warning px-4 py-2 text-white hover:bg-warning/90"
      >
        Show Warning Toast
      </button>
      <button
        onClick={() => showToast('error')}
        className="rounded-md bg-destructive px-4 py-2 text-white hover:bg-destructive/90"
      >
        Show Error Toast
      </button>
    </div>
  );
};

const Index: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isAlertsVisible, setIsAlertsVisible] = useState({
    info: true,
    success: true,
    warning: true,
    error: true,
  });

  // Initialize toast context once ToastProvider is mounted
  const toastRef = React.useRef(null);
  
  useEffect(() => {
    if (toastRef.current) {
      setToastContext(toastRef.current);
    }
  }, []);

  return (
    <ThemeProvider defaultTheme="system">
      <ToastProvider position="bottom-right">
        <div className="min-h-screen w-full bg-background p-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 flex items-center justify-between">
              <H1 color="primary">Design System</H1>
              <ThemeSwitcher />
            </div>
            
            <section className="mb-16">
              <H2 className="mb-4">Typography</H2>
              <div className="space-y-4 rounded-lg border bg-card p-6">
                <Display>Display - The largest text style</Display>
                <H1>Heading 1 - Main page title</H1>
                <H2>Heading 2 - Section title</H2>
                <H3>Heading 3 - Subsection title</H3>
                <H4>Heading 4 - Small section title</H4>
                <H5>Heading 5 - Small title</H5>
                <H6>Heading 6 - Smallest title</H6>
                <div className="space-y-2">
                  <BodyLarge>Body Large - Larger body text for emphasis</BodyLarge>
                  <Body>Body - Standard body text for paragraphs</Body>
                  <BodySmall>Body Small - Smaller text for less emphasis</BodySmall>
                  <Caption>Caption - For image captions and metadata</Caption>
                  <Helper>Helper Text - For form field guidance and notes</Helper>
                  <Code>{'code { font-family: monospace; }'}</Code>
                </div>
                
                <div className="mt-4 space-y-2">
                  <H4>Text Colors</H4>
                  <div className="space-y-1">
                    <Body>Default text color</Body>
                    <Body color="muted">Muted text for less emphasis</Body>
                    <Body color="primary">Primary text for emphasis</Body>
                    <Body color="success">Success text</Body>
                    <Body color="warning">Warning text</Body>
                    <Body color="destructive">Destructive/Error text</Body>
                    <Body color="info">Info text</Body>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="mb-16">
              <H2 className="mb-4">Data Entry Components</H2>
              
              <H3 className="mb-4">Text Input</H3>
              <div className="space-y-6 rounded-lg border bg-card p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <TextInput 
                    label="Name" 
                    placeholder="Enter your name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    helpText="Your full name as it appears on your ID"
                    fullWidth
                  />
                  
                  <TextInput 
                    label="Password" 
                    type="password" 
                    placeholder="Enter your password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    helpText="Minimum 8 characters required"
                    fullWidth
                  />
                  
                  <TextInput 
                    label="Search" 
                    placeholder="Search..." 
                    leadingIcon={<Search size={16} />}
                    fullWidth
                  />
                  
                  <TextInput 
                    label="Email with Error" 
                    placeholder="Enter your email" 
                    type="email" 
                    isError={isError} 
                    error="Please enter a valid email address"
                    fullWidth
                  />
                  
                  <TextInput 
                    label="Username" 
                    placeholder="Enter your username" 
                    clearable
                    fullWidth
                  />
                  
                  <TextInput 
                    label="Disabled Input" 
                    placeholder="This input is disabled" 
                    disabled
                    fullWidth
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <TextInput 
                    label="Small Input" 
                    size="sm" 
                    placeholder="Small size" 
                    fullWidth
                  />
                  
                  <TextInput 
                    label="Medium Input" 
                    size="md" 
                    placeholder="Medium size" 
                    fullWidth
                  />
                  
                  <TextInput 
                    label="Large Input" 
                    size="lg" 
                    placeholder="Large size" 
                    fullWidth
                  />
                </div>
              </div>
              
              <H3 className="mb-4 mt-8">Checkbox</H3>
              <div className="space-y-6 rounded-lg border bg-card p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Checkbox 
                    label="Default Checkbox" 
                    checked={isChecked} 
                    onChange={() => setIsChecked(!isChecked)} 
                  />
                  
                  <Checkbox 
                    label="Checkbox with Help Text" 
                    helpText="Additional information about this option" 
                  />
                  
                  <Checkbox 
                    label="Error State" 
                    isError
                    error="This field is required" 
                  />
                  
                  <Checkbox 
                    label="Disabled Checkbox" 
                    disabled 
                  />
                </div>
                
                <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
                  <Checkbox label="Small Checkbox" size="sm" />
                  <Checkbox label="Medium Checkbox" size="md" />
                  <Checkbox label="Large Checkbox" size="lg" />
                </div>
              </div>
            </section>
            
            <section className="mb-16">
              <H2 className="mb-4">Feedback Components</H2>
              
              <H3 className="mb-4">Toast / Snackbar</H3>
              <div className="rounded-lg border bg-card p-6">
                <div className="space-y-4">
                  <Body className="mb-2">
                    Click the buttons below to display different types of toast notifications:
                  </Body>
                  <ToastDemo />
                </div>
              </div>
              
              <H3 className="mb-4 mt-8">Alert</H3>
              <div className="space-y-4 rounded-lg border bg-card p-6">
                {isAlertsVisible.info && (
                  <Alert 
                    variant="info" 
                    title="Information"
                    dismissible
                    onDismiss={() => setIsAlertsVisible({ ...isAlertsVisible, info: false })}
                  >
                    This is an informational alert that provides neutral context.
                  </Alert>
                )}
                
                {isAlertsVisible.success && (
                  <Alert 
                    variant="success" 
                    title="Success"
                    dismissible
                    onDismiss={() => setIsAlertsVisible({ ...isAlertsVisible, success: false })}
                  >
                    Your changes have been saved successfully.
                  </Alert>
                )}
                
                {isAlertsVisible.warning && (
                  <Alert 
                    variant="warning" 
                    title="Warning"
                    dismissible
                    onDismiss={() => setIsAlertsVisible({ ...isAlertsVisible, warning: false })}
                  >
                    This action cannot be undone. Please proceed with caution.
                  </Alert>
                )}
                
                {isAlertsVisible.error && (
                  <Alert 
                    variant="error" 
                    title="Error"
                    dismissible
                    onDismiss={() => setIsAlertsVisible({ ...isAlertsVisible, error: false })}
                  >
                    An error occurred while processing your request.
                  </Alert>
                )}
                
                <button
                  onClick={() => setIsAlertsVisible({ info: true, success: true, warning: true, error: true })}
                  className="mt-4 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
                >
                  Reset Alerts
                </button>
              </div>
            </section>
          </div>
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default Index;
