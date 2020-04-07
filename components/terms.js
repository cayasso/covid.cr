import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Link from './link'

const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))

const TermLinks = () => {
  const styles = useStyles()

  return (
    <Typography className={styles.margin} variant="body2" color="textSecondary" align="center">
      {'Al continuar con el uso de esta apliacación acepto los '}
      <Link href="/terms">términos de uso</Link>
      {' y '}
      <Link href="/privacy">privacidad</Link>.
    </Typography>
  )
}

export default TermLinks
