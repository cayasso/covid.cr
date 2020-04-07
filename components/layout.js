import { Fragment } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import AppBard from './appbar'
import Loader from './loader'

const Layout = ({ user, loading, title, backLabel, noAppbar, onBack, children, ...props }) => {
  return (
    <Fragment>
      {!noAppbar && !loading && (
        <AppBard
          user={user}
          title={title}
          loading={loading}
          backLabel={backLabel}
          onBack={onBack}
        />
      )}
      <Container maxWidth="sm" style={{ paddingTop: noAppbar ? 20 : 90 }}>
        <Box my={2} mx={1} {...props}>
          {loading ? <Loader /> : children}
        </Box>
      </Container>

      <footer style={{ marginTop: 'calc(5% + 60px)', bottom: 0, paddingBottom: 16 }}>
        <Typography variant="body2" gutterBottom align="center">
          Hecho con{' '}
          <span role="img" aria-label="amor">
            ❤️
          </span>{' '}
          para{' '}
          <span role="img" aria-label="Costa Rica">
            🇨🇷
          </span>{' '}
          por Lekinox S.A.
        </Typography>
      </footer>
    </Fragment>
  )
}

Layout.defaultProps = {
  noAppbar: false
}

export default Layout
