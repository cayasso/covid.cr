import { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import Button from '../components/button'
import ButtonLink from '../components/button-link'
import Link from '../components/link'
import { getSession } from '../lib/auth'
import { fetch } from '../lib/fetch'

const useStyles = makeStyles((theme) => ({
  card: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 12,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#311B92',
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    minHeight: 120,
    borderRadius: 11,
    width: '48%',
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
  },

  title: {
    fontSize: '1.2rem',
  },
  multimedia: {
    marginBottom: 20,
  },
  video: {
    width: '100%',
  },

  lightText: {
    color: theme.palette.common.white,
  },
}))

const Home = ({ user, summary }) => {
  const theme = useTheme()
  const router = useRouter()
  const styles = useStyles()

  return (
    <Layout user={user} my={2}>
      <Typography component="div" align="center">
        <img style={{ width: 150 }} src="/icon.png" alt="covid.cr logo" />
      </Typography>

      <Typography style={{ fontSize: '3rem' }} variant="h1" gutterBottom align="center">
        Autoevaluación de <span style={{ color: theme.palette.primary.main }}>COVID-19</span>
      </Typography>

      <Typography
        variant="h4"
        gutterBottom
        style={{ color: theme.palette.primary.main }}
        align="center"
      >
        ¡Quédate en casa para salvar vidas!
      </Typography>
      <br />
      <Typography variant="h5" gutterBottom align="center">
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

      <br />
      <Typography variant="h2" gutterBottom>
        Situación país
      </Typography>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexFlow: 'wrap',
        }}
      >
        <div className={styles.box}>
          <Typography variant="h6" style={{ color: '#666' }}>
            Confirmados
          </Typography>
          <Typography variant="h3" component="h4" color="primary" style={{ marginTop: 0 }}>
            {summary.total}
          </Typography>
        </div>

        <div className={styles.box}>
          <Typography variant="h6" style={{ color: '#666' }}>
            Activos
          </Typography>
          <Typography variant="h3" component="h4" color="primary" style={{ marginTop: 0 }}>
            {summary.active}
          </Typography>
        </div>

        <div className={styles.box}>
          <Typography variant="h6" style={{ color: '#666' }}>
            Recuperados
          </Typography>
          <Typography variant="h3" component="h4" color="primary" style={{ marginTop: 0 }}>
            {summary.recovered}
          </Typography>
        </div>

        <div className={styles.box}>
          <Typography variant="h6" style={{ color: '#666' }}>
            Fallecidos
          </Typography>
          <Typography variant="h3" component="h4" color="primary" style={{ marginTop: 0 }}>
            {summary.deceased}
          </Typography>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ButtonLink
          variant="text"
          style={{ marginTop: 0, marginLeft: 16 }}
          size="small"
          fullWidth={false}
          prefetch="none"
          href="/reports"
        >
          Mis reportes
        </ButtonLink>
        <ButtonLink
          style={{ marginTop: 0, marginLeft: 16 }}
          size="small"
          fullWidth={false}
          href="/stats"
        >
          Ver detalles
        </ButtonLink>
      </div>

      <Typography variant="h2" gutterBottom>
        Recomendaciones
      </Typography>

      <Card
        elevation={1}
        className={styles.card}
        style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#311B92' }}
      >
        <br />
        <CardContent
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <img
            style={{ width: 60, objectFit: 'scale-down', marginRight: 20 }}
            src="/AA_Icon_Home.svg"
            title="Quédese en casa"
          />
          <Typography gutterBottom className={styles.lightText}>
            Quédate en casa.
          </Typography>
        </CardContent>
        <CardContent className={styles.cardContent}>
          <img
            style={{ width: 50, objectFit: 'scale-down', marginRight: 30 }}
            src="/AA_icon_WashHands.svg"
            title="Lávese las manos"
          />
          <Typography gutterBottom className={styles.lightText}>
            Lávate las manos frecuentemente con agua y con jabón.
          </Typography>
        </CardContent>
        <CardContent className={styles.cardContent}>
          <img
            style={{ width: 35, objectFit: 'scale-down', marginRight: 45 }}
            src="/AA_Icon_Sanitize.svg"
            title="Limpie y desinfecte a diario"
          />
          <Typography gutterBottom className={styles.lightText}>
            Limpia y desinfecta a diario los objetos y superficies de uso común.
          </Typography>
        </CardContent>
        <CardContent className={styles.cardContent}>
          <img
            style={{ width: 50, objectFit: 'scale-down', marginRight: 30 }}
            src="/AA_Icon_TouchFace.svg"
            title="Evite tocarse ojos, naríz, boca"
          />
          <Typography gutterBottom className={styles.lightText}>
            Evita tocarte ojos, naríz, boca y el contacto directo al saludar.
          </Typography>
        </CardContent>
        <CardContent className={styles.cardContent}>
          <img
            style={{ width: 50, objectFit: 'scale-down', marginRight: 30 }}
            src="/AA_Icon_CoverNose.svg"
            title="Al toser o estornudar cubrase con un pañuelo desechable o con el antebrazo"
          />

          <Typography gutterBottom className={styles.lightText}>
            Al toser o estornudar cúbrete con un pañuelo desechable o con el antebrazo.
          </Typography>
        </CardContent>
        <CardContent className={styles.cardContent}>
          <img
            style={{ width: 50, objectFit: 'scale-down', marginRight: 30 }}
            src="/AA_Icon_Mask.svg"
            title="Utilice cubrebocas"
          />
          <Typography gutterBottom className={styles.lightText}>
            Utiliza cubrebocas si has sido diagnosticado o cuidas enfermos de COVID-19 o
            recientemente has perdido el sentido del olfato o el gusto.
          </Typography>
        </CardContent>
        <CardContent className={styles.cardContent}>
          <img
            style={{ width: 50, objectFit: 'scale-down', marginRight: 30 }}
            src="/AA_Icon_SocialDistance.svg"
            title="Mantén la distancia"
          />
          <Typography gutterBottom className={styles.lightText}>
            Mantén la distancia con personas que presenten síntomas de gripe.
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h2" gutterBottom>
        Videos informativos
      </Typography>

      <Card elevation={1} className={styles.card}>
        <br />
        <div className={styles.multimedia}>
          <Typography variant="h5" className={styles.title}>
            Síntomas del COVID-19
          </Typography>
          <video
            className={styles.video}
            preload="none"
            controls="controls"
            poster="https://www.ccss.sa.cr/web/coronavirus/videos/20/20.jpg"
            title="Síntomas del COVID-19"
          >
            <source
              src="https://www.ccss.sa.cr/web/coronavirus/videos/20/20.mp4"
              type="video/mp4"
            />
            <source
              src="https://www.ccss.sa.cr/web/coronavirus/videos/20/20.webm"
              type="video/webm"
            />
            <source
              src="https://www.ccss.sa.cr/web/coronavirus/videos/20/20.ogv"
              type="video/ogg"
            />
          </video>
        </div>

        <div className={styles.multimedia}>
          <Typography variant="h5" className={styles.title}>
            Active su escudo
          </Typography>

          <video
            className={styles.video}
            preload="none"
            controls="controls"
            poster="https://www.ccss.sa.cr/web/coronavirus/videos/04/04.png"
            title="Active su escudo"
          >
            <source
              src="https://www.ccss.sa.cr/web/coronavirus/videos/04/04.mp4"
              type="video/mp4"
            />
            <source
              src="https://www.ccss.sa.cr/web/coronavirus/videos/04/04.webm"
              type="video/webm"
            />
            <source
              src="https://www.ccss.sa.cr/web/coronavirus/videos/04/04.ogv"
              type="video/ogg"
            />
          </video>
        </div>

        <div className={styles.multimedia}>
          <Typography variant="h5" className={styles.title}>
            Diabéticos e hipertensos
          </Typography>

          <video
            className={styles.video}
            preload="none"
            controls="controls"
            poster="https://www.ccss.sa.cr/web/coronavirus/videos/14/14.jpg"
            title="Diabéticos e hipertensos"
          >
            <source
              src="https://www.ccss.sa.cr/web/coronavirus/videos/14/14.mp4"
              type="video/mp4"
            />
            <source
              src="https://www.ccss.sa.cr/web/coronavirus/videos/14/14.webm"
              type="video/webm"
            />
            <source
              src="https://www.ccss.sa.cr/web/coronavirus/videos/14/14.ogv"
              type="video/ogg"
            />
          </video>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ButtonLink
            variant="text"
            style={{
              marginTop: 0,
              marginLeft: 16,
            }}
            size="small"
            fullWidth={false}
            href="/videos"
          >
            Ver más videos informativos
          </ButtonLink>
        </div>
      </Card>
      <br />
      <br />
      <Typography variant="h6" align="center">
        <Link href="/faq">Preguntas frecuentes</Link>
      </Typography>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  const { req } = ctx
  const protocol = req.protocol ? req.protocol : `http`
  const host = `${protocol}://${req.headers.host}`
  const summary = await fetch(`${host}/api/cases?summary=1`)

  return { props: { ...session, summary } }
}

export default Home
