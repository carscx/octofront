import { useState } from 'react'
import { AppShell } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import useIsMobile from '@/hooks/useIsMobile'
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import MainContent from '@/components/MainContent'

const HomePage = () => {
  const isMobile = useIsMobile()
  const [opened, setOpened] = useState<boolean>(!isMobile)
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
        <Header opened={opened} handleOpenSideBar={handleOpenSideBar} />
      </AppShell.Header>
      <AppShell.Navbar>
        <NavBar goToLogout={goToLogout} isMobile={isMobile} opened={opened} />
      </AppShell.Navbar>
      <AppShell.Main>
        <MainContent />
      </AppShell.Main>
    </AppShell>
  )
}

export default HomePage
