import { useTheme, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import * as cons from '../constants'
import ButtonLink from './button-link'

const useStyles = makeStyles(theme => ({
  card: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 12
  },
  multimedia: {
    marginBottom: 20
  },
  button: {
    marginLeft: 16,
    marginTop: 0,
    marginBottom: theme.spacing(2),
    color: theme.palette.common.white,
    borderColor: theme.palette.common.white,
    flexGrow: 1
  }
}))

const TestResult = ({ rating }) => {
  const theme = useTheme()
  const styles = useStyles()

  return (
    <Card
      elevation={1}
      className={styles.card}
      style={{ backgroundColor: cons.ratingColors[rating] }}
    >
      <CardContent>
        <Typography variant="h4" gutterBottom style={{ color: theme.palette.common.white }}>
          {cons.ratingMap[rating]}
        </Typography>
        {rating === 'high' && (
          <Typography
            gutterBottom
            style={{ color: theme.palette.common.white, fontWeight: 'bold' }}
          >
            De acuerdo a tu última evaluación, presentas síntomas sospechosos de COVID-19.
            <br />
            Debes llamar inmediatamente al <strong>1322</strong> para recibir asistencia.
          </Typography>
        )}

        {rating === 'medium' && (
          <Typography
            gutterBottom
            style={{ color: theme.palette.common.white, fontWeight: 'bold' }}
          >
            De acuerdo a la evaluación, pareces no tener síntomas de COVID-19 o tus síntomas no son
            suficientes para determinar que tengas COVID-19. Evalúa tus síntomas mínimo cada 24
            horas.
          </Typography>
        )}

        {rating === 'low' && (
          <Typography
            gutterBottom
            style={{ color: theme.palette.common.white, fontWeight: 'bold' }}
          >
            En este momento no tienes ningún síntoma de COVID-19. No bajes la guardia, sigue las
            recomendaciones indicadas abajo.
          </Typography>
        )}
      </CardContent>

      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <ButtonLink
          variant="outlined"
          className={styles.button}
          size="small"
          fullWidth={false}
          href="/results"
        >
          Ver historial
        </ButtonLink>

        <ButtonLink
          className={styles.button}
          size="small"
          fullWidth={false}
          href="/test"
          prefetch="none"
        >
          Reevaluar síntomas
        </ButtonLink>
      </div>
    </Card>
  )
}

export default TestResult
