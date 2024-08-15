import { useState, type FC } from 'react'
import { AppShell, Container, Grid, Stack, ActionIcon, Box } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import {
  IconLayoutSidebarLeftExpandFilled,
  IconLayoutSidebarRightExpandFilled,
  IconLogout,
} from '@tabler/icons-react'
import useIsMobile from '@/hooks/useIsMobile'
import PrinterStatus from '@/components/PrinterStatus/PrinterStatus'
import WebcamStream from '@/components/WebcamStream/WebcamStream'
// import TemperatureControl from '@/components/TemperatureControl/TemperatureControl'
import LanguageSelector from '@/components/LanguageSelector/LanguageSelector'
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle'
import Logo from '@/components/Logo'
// import ToolExtruder from '@/components/ToolExtruder'

const HomePage: FC = () => {
  const [opened, setOpened] = useState<boolean>(true)
  const isMobile = useIsMobile()
  const navigate = useNavigate()

  const handleOpenSideBar = () => {
    setOpened(!opened)
  }

  const goToLogout = () => {
    console.log('Logout')
    navigate('/logout')
  }

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened, desktop: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Grid justify="flex-start" align="stretch">
          <Grid.Col span="content">
            <Logo />
          </Grid.Col>
          <Grid.Col span={'content'} mt="xs" p="lg">
            <ActionIcon variant="outline" aria-label="SidebarButton" onClick={handleOpenSideBar}>
              {opened ? (
                <IconLayoutSidebarRightExpandFilled
                  style={{ width: '70%', height: '70%' }}
                  stroke={1.5}
                />
              ) : (
                <IconLayoutSidebarLeftExpandFilled
                  style={{ width: '70%', height: '70%' }}
                  stroke={1.5}
                />
              )}
            </ActionIcon>
          </Grid.Col>
        </Grid>
      </AppShell.Header>
      <AppShell.Navbar
        p="md"
        hiddenFrom={isMobile ? 'sm' : undefined}
        visibleFrom={isMobile ? undefined : 'sm'}
      >
        <Stack gap="md">
          <LanguageSelector />
          <ColorSchemeToggle />
        </Stack>
        <Stack style={{ marginTop: 'auto' }}>
          <Box
            style={{ display: 'flex', gap: 20, alignItems: 'center', cursor: 'pointer' }}
            onClick={goToLogout}
          >
            <ActionIcon size={42} variant="filled" aria-label="Logout">
              <IconLogout />
            </ActionIcon>
            <p>Logout</p>
          </Box>
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>
        <Container size="lg">
          <PrinterStatus />
          <WebcamStream />
          {/* <PrinterStatus />
          <TemperatureControl />
          <ToolExtruder /> */}
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}

export default HomePage
