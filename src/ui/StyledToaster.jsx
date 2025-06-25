import { Toaster } from 'react-hot-toast';

const StyledToaster = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'var(--color-grey-0)',
          color: 'var(--color-grey-900)',
          border: '1px solid var(--color-grey-200)',
          padding: '1rem',
          fontSize: '1.4rem',
          fontWeight: 500,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          borderRadius: '0.75rem',
        },
        success: {
          iconTheme: {
            primary: 'var(--color-green-700)',
            secondary: 'var(--color-green-100)',
          },
          style: {
            borderLeft: '5px solid var(--color-green-700)',
          },
        },
        error: {
          iconTheme: {
            primary: 'var(--color-red-700)',
            secondary: 'var(--color-red-100)',
          },
          style: {
            borderLeft: '5px solid var(--color-red-700)',
          },
        },
        loading: {
          iconTheme: {
            primary: 'var(--color-indigo-700)',
            secondary: 'var(--color-indigo-100)',
          },
          style: {
            borderLeft: '5px solid var(--color-indigo-700)',
          },
        },
      }}
    />
  );
};

export default StyledToaster;
