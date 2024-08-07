import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { NavigationProgress } from '@mantine/nprogress';
import { Router } from './Router';
import { theme } from './theme';
import { AuthProvider } from '@/context/AuthContext';
import '@/i18n/config';
import '@mantine/charts/styles.css';
import '@mantine/nprogress/styles.css';

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <NavigationProgress />
      <AuthProvider>
        <Router />
      </AuthProvider>
    </MantineProvider>
  );
}
