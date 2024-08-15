import { useState, useEffect } from 'react'

export const useValidTemperature = (temperatures: Array<number | undefined>) => {
  const [validTemperatures, setValidTemperatures] =
    useState<Array<number | undefined>>(temperatures)

  useEffect(() => {
    const hasChanged = temperatures.some((temp, index) => {
      return temp !== 0 && temp !== validTemperatures[index]
    })

    if (hasChanged) {
      const updatedTemperatures = temperatures.map((temp, index) => {
        if (temp === 0 && validTemperatures[index] !== undefined) {
          return validTemperatures[index]
        }
        return temp
      })

      setValidTemperatures(updatedTemperatures)
    }
  }, [temperatures, validTemperatures])

  return validTemperatures
}
