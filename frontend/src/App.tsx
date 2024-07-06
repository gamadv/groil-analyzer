import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { ThemeProvider } from './hooks/themeProvider'

import '@/styles/globals.css'

function App() {
  return (
    <>
      <ThemeProvider defaultTheme='dark' storageKey='groil-theme'>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}

export default App
