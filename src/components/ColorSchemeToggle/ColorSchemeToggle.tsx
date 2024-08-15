import { useState } from 'react'
import { SegmentedControl, useMantineColorScheme } from '@mantine/core'
import { useTranslation } from 'react-i18next'

export function ColorSchemeToggle() {
  const { setColorScheme, colorScheme } = useMantineColorScheme()
  const [value, setValue] = useState(colorScheme)
  const { t } = useTranslation('common')

  const handleChangeTheme = (value: string | any) => {
    setValue(value)
    setColorScheme(value)
  }

  return (
    <SegmentedControl
      value={value}
      onChange={handleChangeTheme}
      data={[
        { label: t('light'), value: 'light' },
        { label: t('dark'), value: 'dark' },
        { label: t('auto'), value: 'auto' },
      ]}
    />
  )
}
