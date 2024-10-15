import { styled } from '@mui/material/styles'
import { Backdrop, Box, Button, TextField, Typography } from '@mui/material'

export const FormContainer = styled(Box)`
  background-color: #fff;
  margin-bottom: 20px;
  padding: 20px;
`

export const FormHeader = styled(Box)`
  width: 100%;
  border-bottom: 2px solid lightgrey;
  margin-bottom: 20px;
`

export const StyledBackdrop = styled(Backdrop)`
  z-index: ${(props) => props.theme.zIndex.drawer + 1};
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const LoaderMessage = styled(Typography)`
  margin-bottom: 24px;
`

export const StyledTextField = styled(TextField)`
  flex-basis: 100%;

  @media (min-width: 600px) {
    flex-basis: 50%;
  }

  @media (min-width: 900px) {
    flex-basis: 20%;
  }

  margin-bottom: 24px;
`
export const SubmitButton = styled(Button)`
  margin-top: 16px;
  position: relative;
`

export const InputContainer = styled(Box)`
  display: flex;
  flex-direction: column;
`

export const FlexWrapBox = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`

export const PageHeader = styled(Typography)`
  margin: 24px 0px;
`
