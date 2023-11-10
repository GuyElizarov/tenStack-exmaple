import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import './assets/styles/main.scss'
import { RouterProvider } from 'react-router-dom'
import { router } from './routs'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import { theme } from './theme/theme'


ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ChakraProvider>
)
