export interface PrinterState {
  text: string
  flags: {
    operational: boolean
    printing: boolean
    cancelling: boolean
    pausing: boolean
    resuming: boolean
    finishing: boolean
    closedOrError: boolean
    error: boolean
    paused: boolean
    ready: boolean
    sdReady: boolean
  }
  error: string
}

export interface Temperature {
  actual: number
  target: number
}

export interface Temps {
  tool0: Temperature
  bed: Temperature
}

export interface PrinterData {
  state: PrinterState
  temps: Temps
}

export interface PrintJob {
  file: {
    name: string | null
    path: string | null
    size: number | null
    origin: string | null
    date: string | null
  }
  estimatedPrintTime: number | null
  lastPrintTime: number | null
  filament: {
    length: number | null
    volume: number | null
  }
  user: string | null
}

export interface PrintProgress {
  completion: number
  filepos: number
  printTime: number
  printTimeLeft: number
  printTimeLeftOrigin: string
}

export interface PrintFile {
  name: string
  path: string
  display: string
  origin: string
  size: number
  date: number
}
