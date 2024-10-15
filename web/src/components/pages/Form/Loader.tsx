import { CircularProgress } from '@mui/material'
import { LoaderMessage, StyledBackdrop } from './FormPage.styled'

interface LoaderProps {
  loading: boolean
  message: string
}

const Loader = ({ loading, message }: LoaderProps) => {
  return (
    <StyledBackdrop open={loading}>
      <LoaderMessage variant="h6">{message}</LoaderMessage>
      <CircularProgress color="inherit" />
    </StyledBackdrop>
  )
}

export default Loader
