import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import FormPage from './components/pages/Form/FormPage'
import AdPage from './components/pages/Ad/AdPage'
import NotFound from './components/pages/errors/NotFound'
import { CssBaseline, Container, GlobalStyles } from '@mui/material'
import { EnvProvider } from './context/EnvContext'

export const App = () => {
  return (
    <EnvProvider>
      <Router>
        <CssBaseline />
        <GlobalStyles
          styles={{
            body: {
              backgroundColor: '#F7F7FA',
              margin: 0,
              padding: 0,
              minHeight: '100vh',
            },
          }}
        />
        <Container>
          <Routes>
            <Route path="/" element={<FormPage />} />
            <Route path="/ad/:advertisementID" element={<AdPage />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Container>
      </Router>
    </EnvProvider>
  )
}

export default App
