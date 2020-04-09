import Typography from '@material-ui/core/Typography'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import Email from '../components/email'
import { getSession } from '../lib/auth'

const useStyles = makeStyles((theme) => ({
  panel: {
    borderRadius: 8,
    marginBottom: theme.spacing(2),
    '::before': {
      height: 0,
    },
    '&:last-child': {
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
    },
  },
}))

const Home = ({ user }) => {
  const router = useRouter()
  const styles = useStyles()

  console.log('ROUTER', router)

  return (
    <Layout
      my={4}
      backLabel="Inicio"
      user={user}
      onBack={() => router.push(user ? '/dashboard' : '/')}
      style={{ textAlign: 'left' }}
    >
      <Typography style={{ fontSize: '3rem' }} variant="h1" gutterBottom>
        Preguntas frecuentes
      </Typography>

      <ExpansionPanel className={styles.panel}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
          <Typography variant="h6">¿Qué es COVID.CR?</Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Typography>
            Es una herramienta tecnológica que permite a los ciudadanos realizar autoevaluaciones y
            dar seguimiento a posibles síntomas de COVID-19 y a la vez brinda instrucciones y
            recomendaciones según los resultados obtenidos.
            <br />
            <br />
            También tiene como objetivo evitar la saturación en las líneas de consultas y
            emergencias dispuestas por las autoridades de salud.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel className={styles.panel}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
          <Typography variant="h6">
            ¿Sustituye la aplicación del EDUS dispuesta por la CCSS?
          </Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Typography>
            No. COVID.CR no sustituye las herramientas dispuestas por las autoridades para
            seguimiento del virus, mas bien lo complementa y{' '}
            <strong>
              recomendamos a todas las personas seguir utilizando el EDUS como herramienta oficial
              de comunicacion con las autoridades de salud
            </strong>
            .
            <br />
            <br />
            Si bien es cierto ambas herramientas permiten el seguimiento de las personas con
            síntomas de COVID-19. La aplicación COVID.CR proporciona otras funcionalidades como
            seguimiento de reportes oficiales, gráficos diarios de la situación de casos en el país,
            videos informativos, entre otros, todo en una misma plataforma para que podamos
            mantenernos informados lo mejor posible en esta situación de emergencia.
            <br />
            <br />Y muy pronto (cuando tengamos más datos) ofreceremos un mapa de calor por cantón
            de los síntomas para que las personas puedan tener un mejor panorama de la evolución del
            virus sin exponer la privacidad de las personas.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel className={styles.panel}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
          <Typography variant="h6">¿La aplicación solicita datos personales?</Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Typography>
            Sí. La aplicación solicita el número de <strong>teléfono</strong> móvil para el ingreso
            mediante un código de acceso que se envia por mensaje de texto (SMS).
            <br />
            <br />
            Aparte del teléfono también se solicita datos demográficos como <strong>
              edad
            </strong>, <strong>sexo</strong>, <strong>provincia</strong>, <strong>cantón</strong> y{' '}
            <strong>distrito</strong>, estos para generar reportes y gráficos de interes público.
            <br />
            <br />Y finalmente la aplicación recopila los{' '}
            <strong>datos de las autoevaluaciones</strong> para que las personas puedan darle
            seguimiento a su estado de salud y obtengan recomendaciones puntuales en base a sus
            resultados.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel className={styles.panel}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
          <Typography variant="h6">
            ¿Por qué necesitan mi número de teléfono para ingresar?
          </Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Typography>
            La aplicación solicita el número de <strong>teléfono</strong> móvil para validar que la
            persona que ingresa sea real y así evitar la creación de cuentas y datos falsos.
            <br />
            <br />
            También el número de teléfono se utiliza en caso de que la persona necesite ser
            contactada de emergencia por las autoridades de salud.
            <br />
            <br />Y como medida para garantizar mayor seguridad sin uso de contraseñas.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel className={styles.panel}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
          <Typography variant="h6">
            ¿La aplicación rastrea mi ubicación cada véz que lo utilizo?
          </Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Typography>
            No. No recolectamos datos de geolocalización (GPS) o ningún dato que permita establecer
            la ubicación exacta de las personas esto para resguardar, respetar y asegurar la
            privacidad de cada persona.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel className={styles.panel}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
          <Typography variant="h6">
            ¿Que debo hacer si tengo más preguntas sobre mi estado de salud?
          </Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Typography>
            Si tienes preguntas relacionados a tu estado de salud, te recomendamos que llames al
            número <strong>1322</strong>.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel className={styles.panel}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
          <Typography variant="h6">
            ¿Para qué se utiliza la información y datos recopilados?
          </Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Typography>
            Mediante las autoevaluaciónes podremos:
            <br />
            <br />- Proporcionar consejos prácticos, instrucciones y recomendaciones a seguir en
            función de tu estado de salud.
            <br />
            <br />- Elaborar mapas o reportes estadísticos sobre la evolución de la enfermedad y así
            mantener informada a la problación.
            <br />
            <br />- Para futuras investigaciones biomédicas, científicas o históricas conservando su
            anonimato.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel className={styles.panel}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
          <Typography variant="h6">¿Se entregarán mis datos a terceras empresas?</Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Typography>
            Absolutamente No. No vendemos ni entregamos tus datos a terceros, únicamente las
            autoridades de salud o del gobierno podrán tener acceso a los datos.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel className={styles.panel}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
          <Typography variant="h6">¿Por cuánto tiempo se conservarán mis datos?</Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Typography>
            Sus datos se conservarán durante el tiempo que sea necesario para poder gestionar las
            respuestas ante el COVID19, según la evolución de la situación epidemiológica y de
            acuerdo con las instrucciones o directrices de las autoridades de salud.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel className={styles.panel}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
          <Typography variant="h6">
            ¿Tengo preguntas sobre el app, cómo me puedo contactar con ustedes?
          </Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Typography>
            Puede escribanos al <Email email="covidcrapp@gmail.com" />.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  return { props: { ...session } }
}

export default Home
