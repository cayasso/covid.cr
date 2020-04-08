import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import BaseAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import IconButton from '@material-ui/core/IconButton'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import ListItemText from '@material-ui/core/ListItemText'
import AccessibilityIcon from '@material-ui/icons/Accessibility'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import HealingIcon from '@material-ui/icons/Healing'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ShowChartIcon from '@material-ui/icons/ShowChart'
import BubbleChartIcon from '@material-ui/icons/BubbleChart'
import ShareIcon from '@material-ui/icons/Share'
import DashboardIcon from '@material-ui/icons/Dashboard'
import Divider from '@material-ui/core/Divider'
import AppsIcon from '@material-ui/icons/Apps'
import Button from './button'
import * as tokens from '../lib/tokens'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: -theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  icon: {
    marginRight: 16,
  },
  button: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
  },
}))

const isMissingData = (user = {}) => {
  return !(user.risk && user.symptoms)
}

const AppBar = ({ title = '', transparent, backLabel, user, onBack }) => {
  const styles = useStyles()
  const router = useRouter()
  const [anchorElement, setAnchorElement] = useState(null)
  const open = Boolean(anchorElement)
  const isSignedIn = Boolean(user)

  const { pathname: route } = router

  const onMenu = (event) => {
    setAnchorElement(event.currentTarget)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const onClose = () => {
    setAnchorElement(null)
  }

  const navigate = (to) => {
    router.push(to)
    onClose()
  }

  return (
    <div className={styles.root}>
      <BaseAppBar
        elevation={transparent ? 0 : 6}
        style={{ backgroundColor: transparent ? 'transparent' : 'rgba(255,255,255,0.98)' }}
        position="fixed"
      >
        <Toolbar>
          {Boolean(onBack) && (
            <Button
              fullWidth={false}
              variant="text"
              color="primary"
              aria-label="back"
              onClick={onBack}
              className={styles.button}
              startIcon={<ArrowBackIcon style={{ fontSize: 40 }} />}
            >
              {backLabel || 'Volver'}
            </Button>
          )}

          <Typography variant="h5" className={styles.title}>
            {title}
          </Typography>

          <Fragment>
            {' '}
            <IconButton
              edge="end"
              color="primary"
              aria-label="menu"
              onClick={onMenu}
              className={styles.menuButton}
            >
              <AppsIcon style={{ fontSize: 48 }} />
            </IconButton>
            <Menu
              id="appbar"
              keepMounted
              open={open}
              onClose={onClose}
              anchorEl={anchorElement}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              {!isSignedIn && route !== '/signin' && (
                <MenuItem onClick={() => navigate('/signin')}>
                  <VpnKeyIcon color="primary" className={styles.icon} />
                  <ListItemText primary="Ingresar" />
                </MenuItem>
              )}

              <MenuItem
                selected={route === '/dashboard'}
                disabled={!isSignedIn}
                onClick={() => navigate('/dashboard')}
              >
                <DashboardIcon disabled={!isSignedIn} color="primary" className={styles.icon} />
                <ListItemText disabled={!isSignedIn} primary="Dashboard" />
              </MenuItem>

              <MenuItem
                selected={route === '/profile'}
                disabled={!isSignedIn}
                onClick={() => navigate('/profile')}
              >
                <AccountCircleIcon disabled={!isSignedIn} color="primary" className={styles.icon} />
                <ListItemText disabled={!isSignedIn} primary="Datos de perfil" />
              </MenuItem>

              <MenuItem
                selected={route === '/test'}
                disabled={!isSignedIn}
                onClick={() => navigate('/test')}
              >
                <AccessibilityIcon disabled={!isSignedIn} color="primary" className={styles.icon} />
                <ListItemText disabled={!isSignedIn} primary="Evaluación de salud" />
              </MenuItem>

              {!isMissingData(user) && (
                <MenuItem selected={route === '/results'} onClick={() => navigate('/results')}>
                  <HealingIcon color="primary" className={styles.icon} />
                  <ListItemText primary="Historial de salud" />
                </MenuItem>
              )}

              <MenuItem disabled onClick={onClose}>
                <SupervisorAccountIcon disabled color="primary" className={styles.icon} />
                <ListItemText disabled primary="Familiares (pronto)" />
              </MenuItem>

              <Divider />
              <MenuItem selected={route === '/reports'} onClick={() => navigate('/reports')}>
                <BubbleChartIcon color="primary" className={styles.icon} />
                <ListItemText primary="Mi reporte de casos" />
              </MenuItem>

              <MenuItem selected={route === '/stats'} onClick={() => navigate('/stats')}>
                <ShowChartIcon color="primary" className={styles.icon} />
                <ListItemText primary="Casos en el país" />
              </MenuItem>

              <MenuItem selected={route === '/videos'} onClick={() => navigate('/videos')}>
                <PlayCircleOutlineIcon color="primary" className={styles.icon} />
                <ListItemText primary="Videos informativos" />
              </MenuItem>

              <MenuItem selected={route === '/share'} onClick={() => navigate('/share')}>
                <ShareIcon color="primary" className={styles.icon} />
                <ListItemText primary="Invita a otros" />
              </MenuItem>

              <MenuItem selected={route === '/faq'} onClick={() => navigate('/faq')}>
                <HelpOutlineIcon color="primary" className={styles.icon} />
                <ListItemText primary="Preguntas frecuentes" />
              </MenuItem>

              {isSignedIn && (
                <MenuItem
                  onClick={() => {
                    tokens.del()
                    setTimeout(() => {
                      window.location = '/'
                    }, 1000)
                  }}
                >
                  <ExitToAppIcon color="primary" className={styles.icon} />
                  <ListItemText primary="Salir" />
                </MenuItem>
              )}
            </Menu>
          </Fragment>
        </Toolbar>
      </BaseAppBar>
    </div>
  )
}

AppBar.defaultProps = {}

export default AppBar
