import { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import Button from '../components/button'
// import TermLinks from '../components/terms'
import useUser from '../hooks/user'
import { getSession } from '../lib/auth'

const useStyles = makeStyles(theme => ({
  code: {
    width: '30%',
    marginRight: theme.spacing(2)
  },
  margin: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  inline: {
    justifyContent: 'space-between'
  },
  number: {
    width: '65%'
  }
}))

const Login = ({ user }) => {
  const { enqueueSnackbar: notify } = useSnackbar()
  const { sendCode, getCode } = useUser()
  const router = useRouter()
  const styles = useStyles()
  const [prefix] = useState('+506')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    try {
      setLoading(true)
      const query = { phone: prefix + phone }
      const { updated, code } = await getCode(query)

      if (code) {
        query.code = code
        query.updated = updated
      } else {
        await sendCode(prefix + phone)
      }

      router.push({ pathname: '/verify', query })
    } catch (error) {
      console.log(error)
      notify(error.message, { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const onChange = e => {
    setPhone(e.target.value)
  }

  useEffect(() => {
    if (user) router.replace('/dashboard')
  }, [user])

  return (
    <Layout backLabel="Inicio" user={user} loading={user} mx={1} onBack={() => router.push('/')}>
      <Typography variant="h1" gutterBottom>
        Ingresa tu teléfono móvil
      </Typography>
      <Typography className={styles.margin} color="textSecondary" gutterBottom>
        Solicitamos tu teléfono móvil con el único propósito de validar que eres una persona real y
        evitar el ingreso de datos falsos.
      </Typography>
      <FormGroup>
        <FormGroup className={styles.inline} row>
          <TextField
            disabled
            fullWidth
            variant="outlined"
            defaultValue={prefix}
            className={styles.code}
          />
          <TextField className={styles.number} variant="outlined" onChange={onChange} />
        </FormGroup>
      </FormGroup>
      <Button disabled={loading} loading={loading} onClick={onSubmit}>
        Validar
      </Button>
      {
        // <TermLinks />
      }
    </Layout>
  )
}

export const getServerSideProps = async ctx => {
  const session = await getSession(ctx)
  return { props: { ...session } }
}

export default Login
