import { useState, type FC } from 'react'
import { AppShell, Container, Grid, Stack, ActionIcon } from '@mantine/core'
import PrinterStatus from '@/components/PrinterStatus/PrinterStatus'
import WebcamStream from '@/components/WebcamStream/WebcamStream'
import TemperatureControl from '@/components/TemperatureControl/TemperatureControl'
import LanguageSelector from '@/components/LanguageSelector/LanguageSelector'
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle'
import Logo from '@/components/Logo'
import {
  IconLayoutSidebarLeftExpandFilled,
  IconLayoutSidebarRightExpandFilled,
} from '@tabler/icons-react'
import useIsMobile from '@/hooks/useIsMobile'
import ToolExtruder from '@/components/ToolExtruder'

const HomePage: FC = () => {
  const [opened, setOpened] = useState<boolean>(false)
  const isMobile = useIsMobile()

  const handleOpenSideBar = () => {
    setOpened(!opened)
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
