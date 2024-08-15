import { useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import { MantineProvider } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { NavigationProgress } from '@mantine/nprogress'
import { Notifications } from '@mantine/notifications'
import { AuthProvider } from '@/context/AuthContext'
import '@/i18n/config'
import '@mantine/core/styles.css'
import '@mantine/charts/styles.css'
import '@mantine/nprogress/styles.css'
import '@mantine/notifications/styles.css'
import { Router } from './Router'
import { theme } from './theme'

export default function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng')
    if (savedLanguage && i18n.language !== savedLanguage) {
      i18n.changeLanguage(savedLanguage)
    }
  }, [i18n])

  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <I18nextProvider i18n={i18n} defaultNS={'translation'}>
        <NavigationProgress />
        <Notifications />
        <AuthProvider>
          <Router />
        </AuthProvider>
      </I18nextProvider>
    </MantineProvider>
  )
}
