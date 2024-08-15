import { type FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  TextInput,
  Alert,
  Container,
  Anchor,
  Paper,
  Group,
  Checkbox,
  Box,
  Center,
} from '@mantine/core'
import { useLogin } from '@/hooks/useLogin'
import { useAuth } from '@/context/AuthContext'
import Logo from '@/components/Logo'
import { useTranslation } from 'react-i18next'
import LanguageSelector from '@/components/LanguageSelector/LanguageSelector'
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle'

const LoginPage: FC = () => {
  const { t } = useTranslation('login')
  const { login: authenticate } = useAuth()
  const { login, loading, error } = useLogin()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberValue, setRememberValue] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const response = await login(username, password)
      authenticate(response.session, username, rememberValue)
      navigate('/')
    } catch (err) {
      console.log('Error: ', err)
    }
  }

  return (
    <Container size={420} my={40}>
      <Logo />
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Box mb="md">
          <Center>
            <LanguageSelector />
          </Center>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextInput
            label={t('username')}
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
            required
          />
          <TextInput
            label={t('password')}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            required
          />
          {error && (
            <Alert mt="md" color="red">
              {error}
            </Alert>
          )}
          <Group mt="md">
            <Checkbox
              checked={rememberValue}
              onChange={(event) => setRememberValue(event.currentTarget.checked)}
              label={t('rememberMe')}
            />
            <Anchor
              size="sm"
              href="https://community.octoprint.org/t/i-forgot-my-octoprint-password-how-can-i-reset-it/215"
              target="_blank"
              underline="hover"
            >
              {t('forgotPassword')}
            </Anchor>
          </Group>
          <Button fullWidth type="submit" loading={loading} mt="xl">
            {t('login')}
          </Button>
        </form>
        <Center mt="xl">
          <ColorSchemeToggle />
        </Center>
      </Paper>
    </Container>
  )
}

export default LoginPage
