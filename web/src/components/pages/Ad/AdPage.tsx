import { Box, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'
import Confetti from 'react-confetti'
import { useEnv } from '../../../context/EnvContext'
import { useState, useEffect } from 'react'

const Error = () => {
  return (
    <Typography variant="body1" color="error">
      No se pudo cargar la imagen.
    </Typography>
  )
}

const Ad = ({
  showConfetti,
  imageUrl,
  apiUrl,
}: {
  showConfetti: boolean
  imageUrl: string
  apiUrl: string
}) => {
  return (
    <>
      {showConfetti && <Confetti />}
      <Typography variant="h4" gutterBottom>
        Anuncio publicado exitosamente
      </Typography>
      <img
        src={`${apiUrl}${imageUrl}`}
        alt="Advertisement"
        style={{ width: '100%', maxWidth: '1800px' }}
      />
    </>
  )
}

const AdPage = () => {
  const { apiUrl } = useEnv()
  const location = useLocation()
  const [showConfetti, setShowConfetti] = useState(true)

  const queryParams = new URLSearchParams(location.search)
  const imageUrl = queryParams.get('imageUrl') || null

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Box sx={{ mt: 4, textAlign: 'center' }}>
      {imageUrl && apiUrl && (
        <Ad showConfetti={showConfetti} imageUrl={imageUrl} apiUrl={apiUrl} />
      )}
      {!(imageUrl && apiUrl) && <Error />}
    </Box>
  )
}

export default AdPage
