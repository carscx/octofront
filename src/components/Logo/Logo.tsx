import { type FC } from 'react'
import OctofrontLogo from './OctofrontLogo'
import { useNavigate } from 'react-router-dom'
import styles from './Logo.module.scss'

const Logo: FC = () => {
  const navigate = useNavigate()

  const handleGoToHome = () => {
    navigate('/')
  }

  return (
    <div onClick={handleGoToHome} className={styles.logo}>
      <OctofrontLogo />
      <h1 className={styles.title}>OctoFront</h1>
    </div>
  )
}

export default Logo
