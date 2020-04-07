import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import BaseButton from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  loader: {
    color: theme.palette.common.white
  }
}))

const Button = ({ loading = false, className, children, ...props }) => {
  const styles = useStyles()

  return (
    <BaseButton
      fullWidth
      size="large"
      color="primary"
      disableElevation
      variant="contained"
      className={clsx(styles.button, className)}
      {...props}
    >
      {loading ? <CircularProgress size={32} className={styles.loader} /> : children}
    </BaseButton>
  )
}

export default Button
