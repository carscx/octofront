import React from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, Button, Group, Avatar, Text } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation('common')

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language)
  }

  const getFlagIcon = (language: string) => {
    switch (language) {
      case 'en':
        return '🇺🇸'
      case 'es':
        return '🇪🇸'
      default:
        return '🌐'
    }
  }

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button style={{ marginTop: '9px' }} variant="outline">
          <Group>
            <span>{getFlagIcon(i18n.language)}</span>
            <Text>{i18n.language === 'en' ? 'English' : 'Español'}</Text>
            <IconChevronDown size={16} />
          </Group>
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item onClick={() => changeLanguage('en')}>
          <Group>
            <Avatar
              size={20}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"
              alt="English"
            />
            <Text>English</Text>
          </Group>
        </Menu.Item>
        <Menu.Item onClick={() => changeLanguage('es')}>
          <Group>
            <Avatar
              size={20}
              src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg"
              alt="Español"
            />
            <Text>Español</Text>
          </Group>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default LanguageSelector
