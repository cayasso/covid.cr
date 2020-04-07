import { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import FormGroup from '@material-ui/core/FormGroup'
import CardMedia from '@material-ui/core/CardMedia'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Button from '../components/button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { useRouter } from 'next/router'

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon
} from 'react-share'

import Layout from '../components/layout'
import { getHost } from '../lib/utils'
import { getSession } from '../lib/auth'

const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  inline: {
    justifyContent: 'space-between'
  },
  card: {
    borderRadius: 12
  }
}))

const Invite = ({ user }) => {
  const router = useRouter()
  const styles = useStyles()
  const [copied, setCopied] = useState(false)
  const [shareUrl, setShareURL] = useState('')

  useEffect(() => {
    const host = getHost()
    setShareURL(host)
  }, [])

  return (
    <Layout user={user} mx={1} onBack={() => router.push(user ? '/dashboard' : '/')}>
      <Typography variant="h1" gutterBottom>
        Invita a otros
      </Typography>
      <CardMedia
        component="img"
        className={styles.media}
        image="/undraw_connection_b38q.svg"
        title="Contemplative Reptile"
      />

      <Typography className={styles.margin} gutterBottom>
        Comparte esta herramienta con otras personas. Todos unidos podemos hacerle frente al
        COVID-19.
      </Typography>

      <Card elevation={1} className={styles.card}>
        <CardContent>
          <Typography className={styles.margin} color="textSecondary" gutterBottom>
            Mediante redes sociales.
          </Typography>

          <FormGroup className={styles.inline} row>
            <WhatsappShareButton
              url={shareUrl}
              title={`Les comparto esta nueva aplicación web que permite evaluar su nivel de riesgo de contagio por coronavirus ${shareUrl}`}
              separator=":: "
            >
              <WhatsappIcon size={50} round />
            </WhatsappShareButton>

            <TwitterShareButton
              url={shareUrl}
              title={`Les comparto esta nueva aplicación web que permite evaluar su nivel de riesgo de contagio por coronavirus ${shareUrl} @cayasso #COVID19 #COVID_19 #coronavirus #QuedateEnCasa #CuarentenaCoronavirus #CovidCR #Covid19CR`}
            >
              <TwitterIcon size={50} round />
            </TwitterShareButton>

            <FacebookShareButton
              url={shareUrl}
              quote={`Les comparto esta nueva aplicación web que permite evaluar su nivel de riesgo de contagio por coronavirus ${shareUrl} @cayasso #COVID19 #COVID_19 #coronavirus #QuedateEnCasa #CuarentenaCoronavirus #CovidCR #Covid19CR`}
            >
              <FacebookIcon size={50} round />
            </FacebookShareButton>

            <LinkedinShareButton url={shareUrl}>
              <LinkedinIcon size={50} round />
            </LinkedinShareButton>

            <EmailShareButton
              url={shareUrl}
              subject={`Unete a COVID.CR y evalua tu nivel de riesgo COVID-19`}
              body={`COVID.CR (${shareUrl}) es una nueva herramienta web que te permite evaluar y dar seguimiento a tu estado de salud y te brinda instrucciones y recomendaciones sobre el COVID-19.`}
            >
              <EmailIcon size={50} round />
            </EmailShareButton>
          </FormGroup>

          <Typography className={styles.margin} color="textSecondary" gutterBottom>
            Puedes copiar el siguiente link para invitar a otros.
          </Typography>

          <FormGroup style={{ alignItems: 'center' }} row>
            <Typography variant="h6" style={{ marginRight: 20 }}>
              {shareUrl}
            </Typography>

            <CopyToClipboard text={shareUrl} onCopy={() => setCopied(true)}>
              <Button fullWidth={false} variant="outlined" size="small" color="primary">
                Copiar enlace
              </Button>
            </CopyToClipboard>
            {copied && <Typography style={{ marginLeft: 20 }}>Copiado</Typography>}
          </FormGroup>
        </CardContent>
      </Card>
    </Layout>
  )
}

export const getServerSideProps = async ctx => {
  const session = await getSession(ctx)
  return { props: { ...session } }
}

export default Invite
