const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_URL_OCTOPRINT,
    websocketUrl: import.meta.env.VITE_WEBSOCKET_URL_OCTOPRINT,
    apiKey: import.meta.env.VITE_API_KEY_OCTOPRINT,
    webcamUrl: import.meta.env.VITE_WEBCAM_URL_OCTOPRINT,
    username: 'ender',
    password: 'ender',
  },
}

export default config
