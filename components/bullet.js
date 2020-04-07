import { makeStyles } from '@material-ui/core/styles'
import Badge from '@material-ui/core/Badge'

const useStyles = makeStyles(theme => ({
  badge: {
    marginRight: theme.spacing(3),
    position: 'relative',
    fontSize: '1.3rem',
    fontWeight: '500',
    width: 28,
    height: 28,
    borderRadius: 50,
    transform: 'scale(1) translate(0, 0%)',
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main
  }
}))

const Bullet = ({ children, ...props }) => {
  const styles = useStyles()
  return <Badge badgeContent={children} classes={styles} {...props} />
}

export default Bullet
