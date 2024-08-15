import { createContext, useContext, ReactNode } from 'react'
// import { usePrinterState } from '@/hooks/usePrinterState'
// import { useJobState } from '@/hooks/useJobState'
import { useTool } from '@/hooks/useTool'
import { useSetBedTemperature } from '@/hooks/useSetBedTemperature'

interface PrinterContextProps {
  // printerState: any
  // jobState: any
  setToolTemperature: (temperature: number) => Promise<any>
  setBedTemperature: (temperature: number) => Promise<any>
  // error: string | null
  // stopPrinterInterval: () => void
  // stopJobInterval: () => void
  // hasPrinterError: boolean
  // hasJobError: boolean
  // retryPrinter: () => void
  // retryJob: () => void
  // printerLoading: boolean
  // jobLoading: boolean
  getToolStatus: () => Promise<any>
  dataTool: any
}

const PrinterContext = createContext<PrinterContextProps | undefined>(undefined)

export const PrinterProvider = ({ children }: { children: ReactNode }) => {
  // const {
  //   printerState,
  //   error: printerError,
  //   stopInterval: stopPrinterInterval,
  //   hasError: hasPrinterError,
  //   retry: retryPrinter,
  //   loading: printerLoading,
  // } = usePrinterState()
  // const {
  //   jobState,
  //   error: jobError,
  //   stopInterval: stopJobInterval,
  //   hasError: hasJobError,
  //   retry: retryJob,
  //   loading: jobLoading,
  // } = useJobState()
  const { setToolTemperature, getToolStatus, dataTool } = useTool()
  const { setBedTemperature } = useSetBedTemperature()

  // const error = printerError || jobError

  return (
    <PrinterContext.Provider
      value={{
        // printerState,
        // jobState,
        setToolTemperature,
        setBedTemperature,
        // error,
        // stopPrinterInterval,
        // stopJobInterval,
        // hasPrinterError,
        // hasJobError,
        // retryPrinter,
        // retryJob,
        // printerLoading,
        // jobLoading,
        getToolStatus,
        dataTool,
      }}
    >
      {children}
    </PrinterContext.Provider>
  )
}

export const usePrinterContext = () => {
  const context = useContext(PrinterContext)
  if (context === undefined) {
    throw new Error('usePrinterContext must be used within a PrinterProvider')
  }
  return context
}
