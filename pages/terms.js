import Typography from '@material-ui/core/Typography'
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import Link from '../components/link'
import Email from '../components/email'
import { getSession } from '../lib/auth'

const Home = ({ user }) => {
  const router = useRouter()

  return (
    <Layout my={4} user={user} onBack={() => router.push('/')} style={{ textAlign: 'left' }}>
      <Typography style={{ fontSize: '3rem' }} variant="h1" gutterBottom>
        Términos de uso
      </Typography>

      <Typography gutterBottom>Última actualización: 8 de abril de 2020</Typography>
      <br />

      <Typography gutterBottom>
        <strong>COVID.CR</strong> (en adelante <strong>Aplicación</strong>) es operado y controlado
        por LEKINOX S.A. (en adelante <strong>LEKINOX</strong>) empresa costarricense con cédula
        jurídica tres - ciento uno - setecientos sesenta y cuatro mil ochocientos noventa y cuatro
        cuyo domicilio social está ubicado en Costa Rica, Heredia, La Aurora, Residencial Jeréz 109.
      </Typography>
      <br />
      <Typography gutterBottom>
        Estos Términos de Uso se aplican para todos los usuarios que utilicen COVID.CR.
      </Typography>

      <br />
      <Typography variant="h4" gutterBottom>
        1. Aceptación
      </Typography>
      <Typography gutterBottom>
        Las presentes condiciones regulan el acceso o uso que los usuarios hagan de la Aplicación
        COVID.CR. Al utilizar COVID.CR usted acepta en su totalidad y se obliga a cumplir los
        Términos de Uso, así como nuestra <Link href="/privacy">Política de Privacidad</Link>.
        <br />
        <br />
        Nos reservamos el derecho a modificar estos Términos de Uso cuando lo estimemos necesario.
        <br />
        <br />
        Estos Términos de Uso se limitan solamente a la Aplicación COVID.CR.
      </Typography>

      <Typography variant="h4" gutterBottom>
        2. Descripción de la Aplicación
      </Typography>
      <Typography gutterBottom>
        COVID.CR es una herramienta tecnológica que permite a los ciudadanos realizar
        autoevaluaciones y dar seguimiento a posibles síntomas de COVID-19 y a la vez brinda
        instrucciones y recomendaciones según los resultados obtenidos.
        <br />
        <br />
        También tiene como objetivo evitar la saturación en las líneas de consultas y emergencias
        dispuestas por las autoridades de salud.
        <br />
        <br />
        Por último en base a los datos obtenidos proveer mapas de calor de síntomas por sectores
        para mantener a los ciudadanos informados de los lugares de riesgo y avance del COVID-19 en
        nuestro país.
      </Typography>

      <Typography variant="h4" gutterBottom>
        3. Requisitos de uso
      </Typography>

      <Typography gutterBottom>
        Para utilizar la Aplicación los Usuarios deben registrarse mediante la verificación de su
        número de teléfono móvil.
        <br />
        <br />
        Al ingresar en la Aplicación el Usuario debe respetar los Téminos de Uso dispuestos en este
        documento al igual que las <Link href="/privacy">Políticas de Privacidad</Link>.
        <br />
        <br />
        El usuario es responsable de mantener sus datos actualizados.
        <br />
        <br />
        El registro del Usuario y la posterior utilización de la Aplicación es totalmente gratuito y
        voluntario.
      </Typography>

      <Typography variant="h4" gutterBottom>
        4. Información contenida de la Aplicación
      </Typography>

      <Typography gutterBottom>
        El contenido y/o el uso de la Aplicación está orientada exclusivamente a mantener informado
        a todas los ciudadanos sobre el virus COVID-19.
        <br />
        <br />
        Las recomendaciones, lineamientos, sugerencias o guías que puedan encontrarse en la
        Aplicación no constituyen una opinión médica ni deben utilizarse para realizar un
        diagnóstico ni iniciar un tratamiento médico sin la consulta de un profesional de la salud.{' '}
        <br />
        <br />
        <strong>La Aplicación no sustituye la opinión médica.</strong>
      </Typography>

      <Typography variant="h4" gutterBottom>
        5. Seguridad y Privacidad
      </Typography>

      <Typography gutterBottom>
        Las <Link href="/privacy">Políticas de Privacidad</Link> explican el tratamiento de los
        datos personales y la protección de la privacidad al usar nuestra Aplicación. Si utiliza
        nuestros Servicios, acepta que COVID.CR use dichos datos de conformidad con su{' '}
        <Link href="/privacy">Política de Privacidad</Link>.
        <br />
        <br />
        En caso de considerar que existe algún problema de privacidad puede comunicarse con nosotros
        al correo electrónico <Email email="team@covid.cr" />, explicando el problema y aportando la
        prueba correspondiente.
      </Typography>

      <Typography variant="h4" gutterBottom>
        6. Utilización de la Aplicación
      </Typography>

      <Typography gutterBottom>
        El Usuario se compromete a no usar los Servicios con fines fraudulentos así como a no llevar
        a cabo conducta alguna que pudiera dañar la imagen, los intereses y los derechos de COVID.CR
        o de terceros. Asimismo, el Usuario se compromete a no realizar acto alguno con objeto de
        dañar, inutilizar o sobrecargar el servicio de la Aplicación.
        <br />
        <br />
        Nos reservamos en todo momento, la facultad de decidir sobre la continuidad del servicio de
        COVID.CR.
      </Typography>

      <Typography variant="h4" gutterBottom>
        7. Elaces a otros sitios
      </Typography>

      <Typography gutterBottom>
        En la Aplicación podrían encontrarse enlaces a sitios web de terceros. No nos hacemos
        responsables del contenido de dichos sitios web. Además, la existencia de un vínculo entre
        la Aplicación y cualquier sitio de terceros de ninguna manera implica que aprobamos el
        contenido de dicho sitio, o, asimismo, cualquier uso que dicho contenido pueda tener.
      </Typography>

      <Typography variant="h4" gutterBottom>
        8. Responsabilidad
      </Typography>

      <Typography gutterBottom>
        La Aplicación se licencia en forma gratuita bajo la modalidad de Código Abierto (Open
        Source) a los Usuarios con la finalidad de coadyuvar a evitar la propagación del virus y
        mantener informada a la población.
        <br />
        <br />
        En consecuencia, LEKINOX no será responsable de los problemas de acceso o disponibilidad de
        COVID.CR y/o sus servicios, ni de los perjuicios que se pudieran causar por ello, cuando
        éstos procedan de factores ajenos a su ámbito de control.
        <br />
        <br />
        Igualmente, LEKINOX no se hace responsable de los fallos, incompatibilidades y/o daños de
        tus terminales o dispositivos que, en su caso, se pudiesen derivar del uso de la Aplicación.
      </Typography>

      <Typography variant="h4" gutterBottom>
        9. Acerca de estas condiciones
      </Typography>

      <Typography gutterBottom>
        A todos los efectos legales en relación a la Aplicación, será aplicable la legislación
        vigente en la República de Costa Rica.
        <br />
        <br />
        Cualquier litigio que se derive de estas condiciones o de los Servicios o que esté
        relacionado con los mismos, se regirá por las leyes de la República de Costa Rica,
        sometiéndose las partes a la jurisdicción exclusiva de los Tribunales del Primer Circuito
        Judicial de San José, Costa Rica.
        <br />
        <br />
        Si tiene alguna duda, aclaración o comentario con relación a estos terminos puede escribir
        al correo electrónico <Email email="team@covid.cr" />.
      </Typography>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  return { props: { ...session } }
}

export default Home
