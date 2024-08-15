import { FC } from 'react'
import { Stack, ActionIcon, Box } from '@mantine/core'
import LanguageSelector from '@/components/LanguageSelector/LanguageSelector'
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle'
import { IconLogout } from '@tabler/icons-react'

interface NavBarProps {
  goToLogout: () => void
  isMobile: boolean
  opened: boolean
}

const NavBar: FC<NavBarProps> = ({ goToLogout, isMobile, opened }) => {
  return (
    <Stack
      p="md"
      hiddenFrom={isMobile ? 'sm' : undefined}
      visibleFrom={isMobile ? undefined : 'sm'}
      style={{ height: '100%' }}
    >
      <Stack gap="md">
        <LanguageSelector />
        <ColorSchemeToggle />
      </Stack>
      <Stack style={{ marginTop: 'auto' }}>
        <Box
          style={{
            display: 'flex',
            gap: 20,
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={goToLogout}
        >
          <ActionIcon size={42} variant="filled" aria-label="Logout">
            <IconLogout />
          </ActionIcon>
          <p>Logout</p>
        </Box>
      </Stack>
    </Stack>
  )
}

export default NavBar
