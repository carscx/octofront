import { useState, useEffect } from 'react'

// Definimos un tipo para el hook
type UseIsMobile = () => boolean

const useIsMobile: UseIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // Agregamos un listener para el evento 'resize' que actualizará el estado
    window.addEventListener('resize', handleResize)

    // Limpieza del listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return isMobile
}

export default useIsMobile
