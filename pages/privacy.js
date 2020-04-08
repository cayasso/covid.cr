import Typography from '@material-ui/core/Typography'
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import Email from '../components/email'
import { getSession } from '../lib/auth'

const Home = ({ user }) => {
  const router = useRouter()

  return (
    <Layout my={4} user={user} onBack={() => router.push('/')} style={{ textAlign: 'left' }}>
      <Typography style={{ fontSize: '3rem' }} variant="h1" gutterBottom>
        Política de privacidad
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
        Al acceder o utilizar esta Aplicación, usted acepta las condiciones, la recopilación y el
        uso de la información acordados en esta Política de Privacidad de acuerdo a la legislación
        costarricense, y específicamente a la ley N° 8968 y reconoce que ha leído y entendido los
        alcances de dicha política.
      </Typography>
      <br />
      <Typography gutterBottom>
        <strong>
          SI NO ESTÁ DE ACUERDO CON ESTA POLÍTICA DE PRIVACIDAD, POR FAVOR NO ACCEDA NI UTILICE
          NUESTRA APLICACIÓN.
        </strong>
      </Typography>
      <br />
      <Typography variant="h5" gutterBottom>
        Condiciones generales
      </Typography>
      <Typography gutterBottom>
        1. El objetivo de la siguiente Política de Privacidad es informar a todos los usuarios
        acerca de la forma en que procesamos y tratamos los datos e información que nos brindan a
        través de la Aplicación COVID.CR accesible mediante el sitio web covid.cr.
        <br />
        <br />
        2. La base de datos en la cual se registran los usuarios se identifica como COVID, cuyo
        responsable y destinatario final es LEKINOX S.A.
        <br />
        <br />
        3. LEKINOX manifiesta que reconoce como un derecho del usuario la actualización,
        rectificación, oposición o cancelación de aquella información que haya suministrado con
        antelación y se compromete a tener los procedimientos apropiados a efecto de ejecutar las
        actualizaciones y rectificaciones requeridas. De la misma forma, LEKINOX se compromete a
        suprimir de la base de datos al usuario que así lo solicite conforme a la ley.
      </Typography>
      <br />
      <Typography variant="h5" gutterBottom>
        Detalle de datos solicitados
      </Typography>
      <Typography variant="h6" gutterBottom>
        1. Datos personales
      </Typography>
      <Typography gutterBottom>
        1.1 Recopilamos su número de teléfono para:
        <br />
        &nbsp;&nbsp;- Validar su indentidad al ingresar al sitio, evitar el ingreso de datos falsos
        y evitar la duplicación en los datos que recopilamos.
        <br />
        <br />
        &nbsp;&nbsp;- Para contactarlo directamente en caso de que requiera asistencia médica de
        emergencia.
        <br />
        <br />
        &nbsp;&nbsp;- Para enviarle alertas de zonas de riesgo por COVID-19 o nuevas funcionalidades
        disponibles en la aplicación. Declaramos que no enviaremos ningún otro tipo de
        notificaciones que no sean las dispuestas anteriormente.
        <br />
        <br />
        &nbsp;&nbsp;- Y por último para garantizar una mayor seguridad evitando el uso de
        contraseñas.
        <br />
        <br />
        1.2 También recopilamos datos demográficos como sexo y edad para determinar el grupo de
        población a la que pertenece.
        <br />
        <br />
        1.3 Provincia, cantón y distrito como datos demográficos para determinar su localidad y
        generar datos estadísticos por zonas geográficas sin revelar su ubicación exacta,
        manteniendo su privacidad.
      </Typography>
      <br />
      <Typography variant="h6" gutterBottom>
        2. Datos sobre condiciones preexistentes de salud
      </Typography>
      <Typography gutterBottom>
        2.1 Preguntamos si tiene alguno de estas condiciones de salud, embarazo, diabetes,
        hipertensión, padecimientos pulmonares, enfermedad inmunológica, enfermedad renal o hepático
        crónica.
        <br />
        <br />
        2.2 Los datos anteriores nos ayudan a identificar si es parte de la población en alto riesgo
        por el COVID-19.
      </Typography>
      <br />
      <Typography variant="h5" gutterBottom>
        3. Datos de autoevaluación
      </Typography>
      <Typography gutterBottom>
        3.1 Preguntamos si tiene algunos de los siguientes síntomas: dificultad para respirar,
        fiebre, tos seca, dolor de garganta, secreción nazal, perdida de apetito, perdida del olfato
        o gusto, fatiga o dolor muscular.
        <br />
        <br />
        3.2 Con los datos anteriores determinamos su situación de salud de acuerdo a los síntomas
        para poder darle las recomendaciones e indicaciones puntuales a seguir.
      </Typography>
      <br />
      <Typography variant="h5" gutterBottom>
        4. Cookies
      </Typography>
      <Typography gutterBottom>
        4.1 Utilizamos cookies con la única finalidad de gestionar y mantener su sesión de usuario
        dentro de la Aplicación mediante un token encriptado que se envia en cada petición al
        servidor.
        <br />
        <br />
        4.2 Nuestras cookies se asocian únicamente a un usuario anónimo y su dispositivo y no
        proporcionan referencias que permitan conocer datos personales.
        <br />
        <br />
        4.3 También utilizamos el servicio de Google Analytics para reporte de información anónima
        mediante cookies a esta plataforma para así mantener métricas de las visitas a nuestro sitio
        y poder proporcionar información más útil a nuestros Usuarios como aspectos del servicios a
        mejorar.
      </Typography>

      <Typography variant="h4" gutterBottom>
        Principio de la calidad de la información
      </Typography>
      <Typography gutterBottom>
        1. Los datos que obtenemos son otorgados voluntariamente por usted, por lo que es su
        responsabilidad garantizar que sus datos de carácter personal sean correctos, estén
        completos y se mantengan actualizados.
        <br />
        <br />
        2. Usted podrá tener acceso a modificar sus datos mediante la aplicacioón y en cualquier
        momento también podrá solicitar la corrección, supresión o eliminación de los datos que ha
        suministrado enviando un correo a <Email email="team@covid.cr" />.
      </Typography>

      <Typography variant="h4" gutterBottom>
        Finalidad de los datos
      </Typography>
      <Typography gutterBottom>
        La información y datos recopilados serán utilizados específicamente para:
      </Typography>
      <Typography gutterBottom>
        1. Poder realizar su autoevaluación continua diaria de síntomas y así pueda darle
        seguimiento a su estado de salud.
        <br />
        <br />
        2. Proporcionar consejos prácticos, instrucciones y recomendaciones a seguir en función de
        su estado de salud.
        <br />
        <br />
        3. Elaborar mapas de calor o reportes estadísticos sobre la evolución del COVID-19 y así
        mantener informada a la problación.
        <br />
        <br />4 Para futuras investigaciones biomédicas, científicas o históricas conservando su
        anonimato y garantizando la no vinculación de datos directa con su persona.
      </Typography>

      <Typography variant="h4" gutterBottom>
        Acceso a los datos
      </Typography>
      <Typography gutterBottom>
        1. El acceso a los datos recopilados será exclusivo para las autoridades de salud en caso de
        que así lo dispongan para dar respuesta a alguna situación de emergencia.
        <br />
        <br />
        2. Se exceptúan los casos en que la información es requerida por autoridades judiciales o
        administrativas competentes. En tal situación, nos encontramos en obligación legal de
        cumplir con los requerimientos de estos entes.
      </Typography>

      <Typography variant="h4" gutterBottom>
        Conservación de datos
      </Typography>
      <Typography gutterBottom>
        1. Sus datos se conservarán durante el tiempo que sea necesario para poder gestionar las
        respuestas ante el COVID-19, según la evolución de la situación epidemiológica y de acuerdo
        con las instrucciones o directrices de las autoridades de salud.
        <br />
        <br />
        2. O bien hasta que usted solicite su formal desinscripción y remoción.
      </Typography>

      <Typography variant="h4" gutterBottom>
        Transmisión de datos a terceros
      </Typography>
      <Typography gutterBottom>
        1. No alquilamos, no vendemos ni entregamos sus datos personales a terceros, únicamente las
        autoridades de salud o del gobierno podrán tener acceso a dichos datos de acuerdo a las
        disposiciones de la ley.
        <br />
        <br />
        2. Asimismo, podemos compartir información anónima colectiva con terceros, para los fines
        mencionados en la sección de uso de datos de esta Política de Privacidad.
      </Typography>

      <Typography variant="h4" gutterBottom>
        Seguridad de los datos
      </Typography>
      <Typography gutterBottom>
        1. El almacenamiento y tratamiento de la información de cada usuario en nuestra base de
        datos se maneja mediante estrictos estándares de seguridad.
        <br />
        <br />
        2. Toda transmisión de datos se hace mediante conexiones encriptadas SSL mediante enlaces
        HTTPS, de esta manera garantizamos la confidencialidad de sus datos.
        <br />
        <br />
        3. El acceso a su cuenta se realiza a través de su teléfono sin la necesidad de una
        contraseña, lo que significa que el usuario simplemente provee su número de teléfono al cual
        le enviamos un SMS para validar su ingreso.
        <br />
        <br />
        4. Si bien utilizamos altos estándares de seguridad aceptables para proteger sus datos
        personales, no nos podemos responsabilizar de problemas de seguridad que resulte de la
        negligencia del usuario para salvaguardar el acceso a su cuenta.
      </Typography>
      <Typography variant="h4" gutterBottom>
        Proveedores de servicio
      </Typography>

      <Typography gutterBottom>
        1. COVID.CR emplea proveedores de servicio de tecnologías para garantizar el funcionamiento
        del servicio, estos proveedores están obligados a no divulgar, transferir o utilizar los
        datos a los que tengan acceso.
        <br />
        <br />
        2. A estos proveedores se les exigé los mayores estándares de seguridad, ya que realizan sus
        servicios en nombre y por cuenta de COVID.CR, siendo esta última la responsable siempre por
        el manejo de la información.
        <br />
        <br />
        3. Algunos de esos provedores de servicios son: sms506, Zeit.co, MongoDB Atlas, Google
        Analytics y Github.
      </Typography>

      <Typography variant="h4" gutterBottom>
        Acerca de estas condiciones
      </Typography>
      <Typography gutterBottom>
        A todos los efectos legales en relación a la Aplicación, será aplicable la legislación
        vigente en la República de Costa Rica.
        <br />
        <br />
        Si tiene alguna duda, aclaración o comentario con relación a esta política puede escribir al
        correo electrónico <Email email="team@covid.cr" />.
      </Typography>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  return { props: { ...session } }
}

export default Home
