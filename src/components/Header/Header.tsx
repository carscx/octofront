import { FC } from 'react'
import { Grid, ActionIcon } from '@mantine/core'
import {
  IconLayoutSidebarLeftExpandFilled,
  IconLayoutSidebarRightExpandFilled,
} from '@tabler/icons-react'
import Logo from '@/components/Logo'

interface HeaderProps {
  opened: boolean
  handleOpenSideBar: () => void
}

const Header: FC<HeaderProps> = ({ opened, handleOpenSideBar }) => {
  return (
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
  )
}

export default Header
