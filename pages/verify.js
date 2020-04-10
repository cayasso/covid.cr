import { Fragment, useEffect, useState, useRef } from 'react'
import { useSnackbar } from 'notistack'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import FormGroup from '@material-ui/core/FormGroup'
import { useRouter } from 'next/router'
import PinInput from 'react-pin-input'
import Layout from '../components/layout'
import Button from '../components/button'
import useUser from '../hooks/user'
import useCountDown from '../hooks/countdown'
import * as storage from '../lib/storage'
import { getSession } from '../lib/auth'
import { secondsToTime } from '../lib/utils'

const WAIT_TIME = 60 * 1000 * 5 // 5 mins

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    textDecoration: 'none',
  },
  inline: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

const Verify = ({ user }) => {
  const { enqueueSnackbar: notify } = useSnackbar()
  const { signin, sendCode } = useUser()
  const [loading, setLoading] = useState(false)
  const [parameters, setParameters] = useState({})
  const [delta, setDelta] = useState(0)
  const router = useRouter()
  const styles = useStyles()
  const theme = useTheme()
  const input = useRef()

  const { phone, code } = parameters

  useEffect(() => {
    const { query = {} } = router

    let verification = { ...query }

    if (!query.phone) {
      verification = storage.get('verify', {})
    } else if (query.phone && query.updated && query.code) {
      verification = { ...query, updated: Number.parseInt(query.updated, 10) }
    }

    updateParameters(verification)
    router.push('/verify', '/verify', { shallow: true })
    setDelta(verification.updated + WAIT_TIME - Date.now())
  }, [])

  useEffect(() => {
    if (parameters.updated) {
      setDelta(parameters.updated + WAIT_TIME - Date.now())
    }
  }, [parameters.updated])

  const { time, start } = useCountDown(delta)

  useEffect(() => {
    if (delta) start(delta)
  }, [delta])

  useEffect(() => {
    if (user) router.replace('/dashboard')
  }, [user])

  const updateParameters = (data) => {
    setParameters(data)
    storage.set('verify', data)
  }

  const onSubmit = async (code) => {
    try {
      input.current.clear()
      setLoading(true)
      await signin(phone, code)
      setParameters({})
      router.replace('/dashboard')
    } catch (error) {
      console.log(error)
      notify('Código de acceso inválido', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const resend = async () => {
    try {
      const { updated } = await sendCode(phone)
      updateParameters({ phone, updated })
      notify(`Tu código de acceso ha sido enviado a ${phone}`, { variant: 'success' })
    } catch (error) {
      console.log(error)
      notify(error.message, { variant: 'error' })
    }
  }

  return (
    <Layout user={user} loading={user} my={6} onBack={() => router.push('/signin')}>
      <Typography variant="h1" gutterBottom>
        Ingrese su código de acceso
      </Typography>

      {code ? (
        <Fragment>
          <Typography
            style={{ fontWeight: 500 }}
            className={styles.margin}
            color="secondary"
            gutterBottom
          >
            Nuestro registro nos indica que ya te hemos enviado un código de acceso que termina en{' '}
            <strong>{code}</strong>.
          </Typography>
          <Typography className={styles.margin} color="textSecondary" gutterBottom>
            Por favor ingresa los <strong>6 dígitos</strong> de tu código de acceso.
          </Typography>
        </Fragment>
      ) : (
        <Typography className={styles.margin} gutterBottom>
          Te hemos enviado un mensaje de texto a <strong>{phone}</strong> con un código de acceso de
          6 dígitos. Por favor ingresa tu código para continuar.
        </Typography>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <FormGroup className={styles.inline}>
          <PinInput
            ref={input}
            length={6}
            disabled={loading}
            initialValue=""
            type="numeric"
            inputStyle={{
              shadow: 'none',
              width: '50px',
              height: '60px',
              borderRadius: 8,
              backgroundColor: theme.palette.common.white,
              border: `2px solid ${theme.palette.text.primary}`,
              fontSize: '1.4rem',
              margin: 2,
            }}
            inputFocusStyle={{ border: `2px solid ${theme.palette.primary.main}` }}
            onComplete={onSubmit}
          />
          {loading && <CircularProgress size={40} color="primary" style={{ margin: 16 }} />}
        </FormGroup>

        <Button disabled={time > 0} fullWidth={false} size="small" variant="text" onClick={resend}>
          Reenviar código{' '}
          {time && time > 0
            ? `(${secondsToTime(time * 0.001)}` + (time < 60 ? 's' : 'min') + ')'
            : ''}
        </Button>

        {(!code || !code.includes('****')) && (
          <Typography align="center">
            Debido a la saturación de las redes, el mensaje podría tardar unos minutos en llegar. Te
            pedimos tener paciencia.
          </Typography>
        )}
      </div>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  return { props: { ...session } }
}

export default Verify
