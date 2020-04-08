import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Link from './link'

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

const TermLinks = (props) => {
  const styles = useStyles()

  return (
    <Typography className={styles.margin} color="textSecondary" {...props}>
      {'Al continuar con el uso de esta apliacación acepto los '}
      <Link rel="noopener" target="_blank" href="/terms">
        Términos de Uso
      </Link>
      {' y '}
      <Link rel="noopener" target="_blank" href="/privacy">
        Política de Privacidad
      </Link>
      .
    </Typography>
  )
}

export default TermLinks
