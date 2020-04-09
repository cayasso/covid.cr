import { Fragment } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import MuiLink from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import AppBard from './appbar'
import Loader from './loader'
import Link from './link'

const Layout = ({
  transparentBar,
  user,
  loading,
  title,
  backLabel,
  noAppbar,
  onBack,
  children,
  ...props
}) => {
  return (
    <Fragment>
      {!noAppbar && !loading && (
        <AppBard
          user={user}
          title={title}
          loading={loading}
          backLabel={backLabel}
          onBack={onBack}
          transparent={transparentBar}
        />
      )}
      <Container maxWidth="sm" style={{ paddingTop: noAppbar ? 20 : 90 }}>
        <Box my={2} mx={1} {...props}>
          {loading ? <Loader /> : children}
        </Box>
      </Container>

      <footer style={{ marginTop: 'calc(5% + 60px)', bottom: 0, paddingBottom: 16 }}>
        <Typography variant="body2" gutterBottom align="center">
          <Link href="/terms">Términos de Uso</Link>
          {' | '}
          <Link href="/privacy">Política de Privacidad</Link>
          {' | '}
          <Link href="/faq">Preguntas frecuentes</Link>
          <br />
          <br />
          Hecho con{' '}
          <span role="img" aria-label="amor">
            ❤️
          </span>{' '}
          para{' '}
          <span role="img" aria-label="Costa Rica">
            🇨🇷
          </span>{' '}
          <MuiLink href="https://github.com/cayasso/covid.cr">Github</MuiLink>
        </Typography>
      </footer>
    </Fragment>
  )
}

Layout.defaultProps = {
  noAppbar: false,
}

export default Layout
