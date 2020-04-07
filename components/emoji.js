import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import SmileIcon from './smile-icon'
import SadIcon from './sad-icon'
import NeutralIcon from './neutral-icon'
import SickIcon from './sick-icon'

const icons = {
  smile: SmileIcon,
  neutral: NeutralIcon,
  sad: SadIcon,
  sick: SickIcon
}

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: theme.palette.common.white,
    boxShadow: '0 1px 3px rgba(0,0,0,.1)',
    borderRadius: 12,
    border: '3px solid #FFF'
  },
  active: {
    // backgroundColor: '#e8eaf6',
    // padding: 8
    // border: `2px solid #CCC`,
    borderColor: theme.palette.primary.main
  },
  icon: {
    width: 48,
    height: 48
  },
  activeIcon: {
    // width: 64,
    // height: 64
  }
}))

const Emoji = ({ type = 'smile', active = false, label, ...props }) => {
  const theme = useTheme()
  const styles = useStyles()
  const Icon = icons[type]

  return (
    <div className={clsx(styles.container, active ? styles.active : null)} {...props}>
      <Icon
        className={styles.icon}
        fill={active ? theme.palette.primary.main : 'rgba(0, 0, 0, 0.34)'}
      />
      {label && (
        <strong style={{ color: active ? theme.palette.primary.main : 'rgba(0, 0, 0, 0.34)' }}>
          {label}
        </strong>
      )}
    </div>
  )
}

export default Emoji
