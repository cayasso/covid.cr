import { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import { useTheme } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import Button from '../components/button'
import Link from '../components/link'
import { getSession } from '../lib/auth'

const Home = ({ user }) => {
  const theme = useTheme()
  const router = useRouter()

  return (
    <Layout user={user} noAppbar={!user} my={4} style={{ textAlign: 'center' }}>
      <img style={{ width: 150 }} src="/icon.png" alt="covid.cr logo" />

      <Typography style={{ fontSize: '3rem' }} variant="h1" gutterBottom>
        Autoevaluación de <span style={{ color: theme.palette.primary.main }}>COVID-19</span>
      </Typography>

      <Typography variant="h4" gutterBottom style={{ color: theme.palette.primary.main }}>
        ¡Quédate en casa para salvar vidas!
      </Typography>
      <br />
      <Typography variant="h5" gutterBottom>
        Esta aplicación te permite evaluar y dar seguimiento a tu salud y te brinda instrucciones y
        recomendaciones sobre el COVID-19.
      </Typography>

      {user ? (
        <Button onClick={() => router.push('/test')}>Evaluar mi salud</Button>
      ) : (
        <Fragment>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Button
              fullWidth={false}
              style={{ marginRight: 8, flexGrow: 4 }}
              onClick={() => router.push('/signin')}
            >
              Iniciar
            </Button>
          </div>
        </Fragment>
      )}

      <Typography>
        <Link href="/faq">Preguntas frecuentes</Link>
      </Typography>
    </Layout>
  )
}

export const getServerSideProps = async ctx => {
  const session = await getSession(ctx)
  return { props: { ...session } }
}

export default Home
