import { Fragment, useEffect } from 'react'
import cslx from 'clsx'
import { useRouter } from 'next/router'
import formatDate from 'date-fns/format'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import Layout from '../components/layout'
import Bullet from '../components/bullet'
import ButtonLink from '../components/button-link'
import Link from '../components/link'
import { getSession } from '../lib/auth'
import getRating from '../lib/rating'
import * as cons from '../constants'

const useStyles = makeStyles(theme => ({
  line: {
    display: 'flex',
    margin: '30px 0'
  },
  card: {
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 12
  },
  hero: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  button: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(2),
    color: theme.palette.common.white,
    borderColor: theme.palette.common.white
  }
}))

const isMissingData = (user = {}) => {
  return !(user.risk && user.symptoms)
}

const Result = ({ user }) => {
  const theme = useTheme()
  const router = useRouter()
  const styles = useStyles()

  useEffect(() => {
    if (!user) {
      router.replace('/signin')
    } else if (isMissingData(user)) {
      router.replace('/dashboard')
    }
  }, [user])

  return (
    <Layout
      loading={!user || isMissingData(user)}
      user={user}
      backLabel="Inicio"
      onBack={() => router.replace('/dashboard')}
    >
      <Typography variant="h1" gutterBottom>
        Resultados de tu evaluación
      </Typography>

      <Typography gutterBottom color="textSecondary">
        Los resultados a continuación no constituyen un diagnóstico médico solo las autoridades de
        salud pueden determinar tu estado de salud real.
      </Typography>

      {user && user.rating === 'high' && (
        <Fragment>
          <Card
            elevation={1}
            className={styles.card}
            style={{ backgroundColor: cons.ratingColors[user.rating] }}
          >
            <CardContent>
              <Typography variant="h4" gutterBottom style={{ color: theme.palette.common.white }}>
                Riesgo Alto
              </Typography>
              <Typography
                gutterBottom
                style={{ color: theme.palette.common.white, fontWeight: 'bold' }}
              >
                De acuerdo a la evaluación, presentas síntomas sospechosos de COVID-19. Siga las
                siguientes recomendaciones.
              </Typography>
            </CardContent>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <ButtonLink
                size="small"
                fullWidth={false}
                color="primary"
                className={styles.button}
                href="/test"
              >
                Reevaluar síntomas
              </ButtonLink>
            </div>
          </Card>

          <Card elevation={1} className={cslx(styles.card, styles.hero)}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Recomendaciones
              </Typography>
              <Typography className={styles.line} gutterBottom>
                <Bullet>1</Bullet>
                <span>
                  <strong>Llame inmediatamente al 1322 para recibir asistencia.</strong>
                </span>
              </Typography>
              <Typography className={styles.line} gutterBottom>
                <Bullet>2</Bullet>
                <span>
                  Mantén estrictamente las medidas de prevención de contagio dispuestas por las
                  autoridades de salud.
                </span>
              </Typography>
              <Typography gutterBottom className={styles.line}>
                <Bullet>3</Bullet>
                <span>
                  Mantén el distanciamiento físico como medida para evitar exponerte o exponer a
                  otros.
                </span>
              </Typography>
              <Typography gutterBottom className={styles.line}>
                <Bullet>4</Bullet>
                <span>Utiliza cubrebocas para no exponer a otras personas.</span>
              </Typography>
              <Typography className={styles.line} gutterBottom>
                <Bullet>5</Bullet>
                <span>Conserva la calma.</span>
              </Typography>
            </CardContent>
          </Card>
        </Fragment>
      )}

      {user && user.rating === 'medium' && (
        <Fragment>
          <Card
            elevation={1}
            className={styles.card}
            style={{ backgroundColor: cons.ratingColors[user.rating] }}
          >
            <CardContent>
              <Typography variant="h4" gutterBottom style={{ color: theme.palette.common.white }}>
                Riesgo Medio
              </Typography>
              <Typography gutterBottom style={{ color: theme.palette.common.white }}>
                <strong>
                  De acuerdo a la evaluación, pareces no tener síntomas de COVID-19 o tus síntomas
                  no son suficientes para determinar que tengas COVID-19.
                </strong>
              </Typography>
            </CardContent>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <ButtonLink
                size="small"
                fullWidth={false}
                color="primary"
                className={styles.button}
                href="/test"
              >
                Reevaluar síntomas
              </ButtonLink>
            </div>
          </Card>

          <Card elevation={1} className={cslx(styles.card, styles.hero)}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Recomendaciones
              </Typography>
              <Typography gutterBottom className={styles.line}>
                <Bullet>1</Bullet>
                <span>Permanezca en casa y siga monitoreando tus síntomas.</span>
              </Typography>
              <Typography gutterBottom className={styles.line}>
                <Bullet>2</Bullet>
                <span>
                  Mantén las medidas de protección y contención dispuestas por las autoridades de
                  salud.
                </span>
              </Typography>
              <Typography gutterBottom className={styles.line}>
                <Bullet>3</Bullet>
                <span>
                  Si los síntomas que tienes persisten o no mejoran en 12 horas, vuelve a realizar
                  esta evaluación y si los síntomas empeoran llame al <strong>1322</strong> para
                  recibir ayuda.
                </span>
              </Typography>
              <Typography gutterBottom className={styles.line}>
                <Bullet>4</Bullet>
                <span>Mantén el distanciamiento físico como medida para evitar exponerte.</span>
              </Typography>
              {user.symptoms.includes('anosmia') && (
                <Typography gutterBottom className={styles.line}>
                  <Bullet>5</Bullet>
                  <span>
                    <strong style={{ color: 'red ' }}>Importante:</strong> Utiliza{' '}
                    <strong>cubrebocas</strong> ya que dentro de tus síntomas, reportas haber
                    perdido el sentido del olfato o del gusto. Las autoridades de salud han emitido
                    esta recomendación importante.{' '}
                    <Link
                      style={{ color: 'red' }}
                      href="https://www.youtube.com/watch?v=OVjENDhFH1w"
                    >
                      Ver noticia
                    </Link>
                  </span>
                </Typography>
              )}
            </CardContent>
          </Card>
        </Fragment>
      )}

      {user && user.rating === 'low' && (
        <Fragment>
          <Card
            elevation={1}
            className={styles.card}
            style={{ backgroundColor: cons.ratingColors[user.rating] }}
          >
            <CardContent>
              <Typography variant="h4" gutterBottom style={{ color: theme.palette.common.white }}>
                Riesgo Bajo
              </Typography>
              <Typography
                gutterBottom
                style={{ color: theme.palette.common.white, fontWeight: 'bold' }}
              >
                En este momento pareces no tener síntomas de COVID-19. Sigue las recomendaciones a
                continuación para evitar exponerte.
              </Typography>
            </CardContent>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <ButtonLink
                size="small"
                fullWidth={false}
                color="primary"
                className={styles.button}
                href="/test"
              >
                Reevaluar síntomas
              </ButtonLink>
            </div>
          </Card>

          <Card elevation={1} className={cslx(styles.card, styles.hero)}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Recomendaciones
              </Typography>
              <Typography className={styles.line} gutterBottom>
                <Bullet>1</Bullet>
                <span>
                  <strong>Permanezca en casa.</strong>
                </span>
              </Typography>
              <Typography className={styles.line} gutterBottom>
                <Bullet>2</Bullet>
                <span>
                  Mantén las medidas de protección y contención dispuestas por las autoridades de
                  salud.
                </span>
              </Typography>
              <Typography gutterBottom className={styles.line}>
                <Bullet>3</Bullet>
                <span>Mantén el distanciamiento físico como medida para evitar exponerte.</span>
              </Typography>

              {user.symptoms.includes('anosmia') && (
                <Typography gutterBottom className={styles.line}>
                  <Bullet>4</Bullet>
                  <span>
                    <strong style={{ color: 'red ' }}>Importante:</strong> Utiliza{' '}
                    <strong>cubrebocas</strong> ya que dentro de tus síntomas, reportas haber
                    perdido el sentido del olfato o del gusto. Las autoridades de salud han emitido
                    esta recomendación importante.{' '}
                    <Link
                      style={{ color: 'red' }}
                      href="https://www.youtube.com/watch?v=OVjENDhFH1w"
                    >
                      Ver noticia
                    </Link>
                  </span>
                </Typography>
              )}
            </CardContent>
          </Card>
        </Fragment>
      )}

      <Typography variant="h2" gutterBottom>
        Historial
      </Typography>

      {user &&
        user.history &&
        user.history
          .sort((a, b) => b.time - a.time)
          .map((item, index) => {
            const { rating } = getRating({ ...user, ...item })

            return (
              <Card key={item.time} elevation={1} className={styles.card}>
                <CardContent>
                  <div
                    style={{
                      float: 'right',
                      backgroundColor: cons.ratingColors[rating],
                      height: 18,
                      width: 18,
                      marginTop: 8,
                      borderRadius: 20
                    }}
                  ></div>
                  <Typography variant="h5" gutterBottom>
                    {cons.ratingMap[rating]}
                    <Typography variant="body2" component="strong" color="primary" gutterBottom>
                      {index === 0 ? ' (RECIENTE)' : ''}
                    </Typography>
                  </Typography>
                  <br />

                  {item.symptoms.length > 0 ? (
                    <Fragment>
                      {item.symptoms.map(symptom => {
                        return (
                          <Typography key={symptom} color="textSecondary" gutterBottom>
                            {cons.symptomsMap[symptom]}{' '}
                            <strong style={{ color: cons.ratingColors[rating] }}>✔</strong>
                          </Typography>
                        )
                      })}
                      <Typography color="textSecondary" gutterBottom>
                        ¿Cómo te sientes físicamente?{' '}
                        <strong style={{ color: cons.ratingColors[rating] }}>
                          {cons.feelingMap[item.feeling]}
                        </strong>
                      </Typography>
                    </Fragment>
                  ) : (
                    <Typography gutterBottom>No tienes síntomas</Typography>
                  )}
                  <Typography variant="body2" gutterBottom align="right">
                    {formatDate(new Date(item.time), 'dd/MM/yyyy h:m aa')}
                  </Typography>
                </CardContent>
              </Card>
            )
          })}
    </Layout>
  )
}

export const getServerSideProps = async ctx => {
  const session = await getSession(ctx)
  return { props: { ...session } }
}

export default Result
