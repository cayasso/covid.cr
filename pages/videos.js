import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Link from '@material-ui/core/Link'
import Layout from '../components/layout'
import { getSession } from '../lib/auth'

const useStyles = makeStyles((theme) => ({
  card: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 12,
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
}))

const Videos = ({ user }) => {
  const router = useRouter()
  const styles = useStyles()

  return (
    <Layout user={user} backLabel="Volver" onBack={() => router.back()}>
      <Typography variant="h1" gutterBottom>
        Informese sobre el COVID-19
      </Typography>

      <Typography variant="body2" color="textSecondary" gutterBottom>
        Aqui encontrarás una amplia lista de videos informativos relacionados con el COVID-19
        producidos por la Dirección de Comunicación Organizacional de la CCSS.
      </Typography>

      <Card elevation={1} className={styles.card}>
        <CardContent>
          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Las hienas
            </Typography>
            <Typography variant="caption">Quédate a esa distancia</Typography>
            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/23/23.jpg"
              title="Las hienas"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/23/23.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/23/23.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/23/23.ogv"
                type="video/ogg"
              />
            </video>
          </div>
          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              ¿Puede una gripe matar a una persona?
            </Typography>
            <Typography variant="caption">Dr. Marzo Boza Hernández</Typography>
            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/19/19.jpg"
              title="¿Puede una gripe matar a una persona?"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/19/19.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/19/19.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/19/19.ogv"
                type="video/ogg"
              />
            </video>
          </div>
          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Síntomas del COVID-19
            </Typography>
            <Typography variant="caption">Cuídese usted y a su familia</Typography>
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
              Salud para Todos
            </Typography>
            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/01/01.png"
              title="Salud para Todos"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/01/01.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/01/01.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/01/01.ogv"
                type="video/ogg"
              />
            </video>
          </div>
          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Colocación del equipo de protección personal
            </Typography>
            <Typography variant="caption">Video explicativo</Typography>
            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/epp/epp.jpg"
              title="Equipo de protección personal"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/epp/epp.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/epp/epp.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/epp/epp.ogv"
                type="video/ogg"
              />
            </video>
          </div>
          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Guerreros
            </Typography>
            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/02/02.png"
              title="Guerreros"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/02/02.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/02/02.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/02/02.ogv"
                type="video/ogg"
              />
            </video>
          </div>

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Héroes silenciosos
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/03/03.png"
              title="Héroes silenciosos"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/03/03.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/03/03.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/03/03.ogv"
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
              Protéjase del COVID-19
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/05/05.png"
              title="Protéjase del COVID-19"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/05/05.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/05/05.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/05/05.ogv"
                type="video/ogg"
              />
            </video>
          </div>

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Libérese de los microbios
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/06/06.png"
              title="Libérese de los microbios"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/06/06.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/06/06.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/06/06.ogv"
                type="video/ogg"
              />
            </video>
          </div>

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Hábitos indispensables
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/07/07.png"
              title="Hábitos indispensables"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/07/07.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/07/07.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/07/07.ogv"
                type="video/ogg"
              />
            </video>
          </div>

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Detengamos el contagio
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/08/08.png"
              title="Detengamos el contagio"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/08/08.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/08/08.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/08/08.ogv"
                type="video/ogg"
              />
            </video>
          </div>

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              ¿Qué son los coronavirus?
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/09/09.png"
              title="¿Qué son los coronavirus?"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/09/09.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/09/09.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/09/09.ogv"
                type="video/ogg"
              />
            </video>
          </div>

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Protocolo del estornudo
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/10/10.png"
              title="Protocolo del estornudo"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/10/10.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/10/10.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/10/10.ogv"
                type="video/ogg"
              />
            </video>
          </div>

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Correcto lavado de manos
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/11/11.png"
              title="Correecto lavado de manos"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/11/11.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/11/11.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/11/11.ogv"
                type="video/ogg"
              />
            </video>
          </div>

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Active su escudo [LESCO]
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/12/12.jpg"
              title="Active su escudo verisón Lesco"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/12/12.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/12/12.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/12/12.ogv"
                type="video/ogg"
              />
            </video>
          </div>

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Cuidadores de menores
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/13/13.jpg"
              title="Cuidadores de menores"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/13/13.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/13/13.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/13/13.ogv"
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

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Embarazadas
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/15/15.jpg"
              title="Embarazadas"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/15/15.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/15/15.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/15/15.ogv"
                type="video/ogg"
              />
            </video>
          </div>

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Pacientes cardiacos
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/16/16.jpg"
              title="Pacientes cardiacos"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/16/16.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/16/16.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/16/16.ogv"
                type="video/ogg"
              />
            </video>
          </div>

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Enfermedades respiratorias
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/17/17.jpg"
              title="Enfermedades respiratorias"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/17/17.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/17/17.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/17/17.ogv"
                type="video/ogg"
              />
            </video>
          </div>

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Ciudadano de Oro
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/21/21.jpg"
              title="Ciudadano de Oro"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/21/21.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/21/21.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/21/21.ogv"
                type="video/ogg"
              />
            </video>
          </div>

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Mensaje de Josué
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/22/22.jpg"
              title="Mensaje de Josué"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/22/22.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/22/22.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/22/22.ogv"
                type="video/ogg"
              />
            </video>
          </div>

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Readecuación del CENARE
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/cenare/cenare.jpg"
              title="Proceso de readecuación del CENARE"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/cenare/cenare.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/cenare/cenare.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/cenare/cenare.ogv"
                type="video/ogg"
              />
            </video>
          </div>

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Consejos para personas enfermas
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/pantallas/01/01.jpg"
              title="Consejos para personas enfermas"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/pantallas/01/01.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/pantallas/01/01.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/pantallas/01/01.ogv"
                type="video/ogg"
              />
            </video>
          </div>

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Cuidadores de adulto mayor y enfermos
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/pantallas/02/02.jpg"
              title="Cuidadores de adulto mayor y enfermos"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/pantallas/02/02.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/pantallas/02/02.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/pantallas/02/02.ogv"
                type="video/ogg"
              />
            </video>
          </div>

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Medidas en hogar para cuidadores
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/pantallas/03/03.jpg"
              title="Medidas en hogar para cuidadores"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/pantallas/03/03.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/pantallas/03/03.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/pantallas/03/03.ogv"
                type="video/ogg"
              />
            </video>
          </div>

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              ¿Dónde debe permanecer una persona enferma en el hogar?
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/pantallas/04/04.jpg"
              title="Consejos para personas enfermas"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/pantallas/04/04.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/pantallas/04/04.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/pantallas/04/04.ogv"
                type="video/ogg"
              />
            </video>
          </div>

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Visitas, usuarios de consulta externa y acompañantes
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/pantallas/05/05.jpg"
              title="Cuidadores de adulto mayor y enfermos"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/pantallas/05/05.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/pantallas/05/05.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/pantallas/05/05.ogv"
                type="video/ogg"
              />
            </video>
          </div>

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Juanka Galindo
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/01/01.jpg"
              title="Juanka Galindo"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/01/01.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/01/01.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/01/01.ogv"
                type="video/ogg"
              />
            </video>
          </div>

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Maricruz Leiva
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/02/02.jpg"
              title="Maricruz Leiva"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/02/02.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/02/02.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/02/02.ogv"
                type="video/ogg"
              />
            </video>
          </div>

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Abel Pacheco
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/03/03.jpg"
              title="Abel Pacheco"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/03/03.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/03/03.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/03/03.ogv"
                type="video/ogg"
              />
            </video>
          </div>

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Ítalo Marenco/Andrés Zamora
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/04/04.jpg"
              title="Ítalo y Andrés"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/04/04.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/04/04.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/04/04.ogv"
                type="video/ogg"
              />
            </video>
          </div>

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Marcelo Castro
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/05/05.jpg"
              title="Marcelo Castro"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/05/05.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/05/05.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/05/05.ogv"
                type="video/ogg"
              />
            </video>
          </div>

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Maribel Guardia
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/06/06.jpg"
              title="Maribel Guardia"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/06/06.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/06/06.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/06/06.ogv"
                type="video/ogg"
              />
            </video>
          </div>

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Alexis Rojas
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/07/07.jpg"
              title="Alexis Rojas"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/07/07.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/07/07.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/07/07.ogv"
                type="video/ogg"
              />
            </video>
          </div>

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              El Galán
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/08/08.jpg"
              title="El Galán"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/08/08.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/08/08.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/08/08.ogv"
                type="video/ogg"
              />
            </video>
          </div>

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Gustavo López
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/09/09.jpg"
              title="Gustavo López"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/09/09.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/09/09.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/09/09.ogv"
                type="video/ogg"
              />
            </video>
          </div>

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Monserrat del Castillo
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/10/10.jpg"
              title="Monserrat del Castillo"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/10/10.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/10/10.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/10/10.ogv"
                type="video/ogg"
              />
            </video>
          </div>

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Verónica y Patricia
            </Typography>

            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/11/11.jpg"
              title="Verónica González/Patricia Figueroa"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/11/11.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/11/11.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/11/11.ogv"
                type="video/ogg"
              />
            </video>
          </div>

          <div className={styles.multimedia}>
            <Typography variant="h5" className={styles.title}>
              Guisele Guzmán
            </Typography>
            <video
              className={styles.video}
              preload="none"
              controls="controls"
              poster="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/12/12.jpg"
              title="Guisele Guzmán"
            >
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/12/12.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/12/12.webm"
                type="video/webm"
              />
              <source
                src="https://www.ccss.sa.cr/web/coronavirus/videos/personajes/12/12.ogv"
                type="video/ogg"
              />
            </video>
          </div>
        </CardContent>
      </Card>

      <Typography gutterBottom>
        Para más información puede dirigirse al sitio oficial del Ministerio de Salud{' '}
        <Link
          rel="noopener"
          target="_blank"
          color="primary"
          href="https://www.ministeriodesalud.go.cr"
        >
          https://www.ministeriodesalud.go.cr
        </Link>
        .
      </Typography>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  return { props: { ...session } }
}

export default Videos
