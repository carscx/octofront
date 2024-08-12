import { type FC } from 'react'
import { AppShell, Burger, Container, Grid, rem, Box, Stack, Affix } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import PrinterStatus from '@/components/PrinterStatus/PrinterStatus'
import WebcamStream from '@/components/WebcamStream/WebcamStream'
import TemperatureControl from '@/components/TemperatureControl/TemperatureControl'
import LanguageSelector from '@/components/LanguageSelector/LanguageSelector'
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle'
import Logo from '@/components/Logo'
// import styles from './HomePage.module.scss'

const HomePage: FC = () => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Grid justify="flex-start" align="stretch">
          <Grid.Col span={'content'} mt="xs" p="lg">
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
          </Grid.Col>
          <Grid.Col span="content">
            <Logo />
          </Grid.Col>
        </Grid>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Stack gap="md">
          <LanguageSelector />
          <ColorSchemeToggle />
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>
        <Container size="lg">
          <PrinterStatus />
          <WebcamStream />
          <TemperatureControl />
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}

export default HomePage
