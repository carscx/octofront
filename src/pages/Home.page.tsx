import { AppShell, Burger, Container } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import PrinterStatus from '@/components/PrinterStatus/PrinterStatus'
import WebcamStream from '@/components/WebcamStream/WebcamStream'
import TemperatureControl from '@/components/TemperatureControl/TemperatureControl'

export function HomePage() {
  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div>Logo</div>
      </AppShell.Header>

      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

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
