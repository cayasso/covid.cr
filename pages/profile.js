import { useEffect } from 'react'
import { isEmpty } from 'lodash'
import { useSnackbar } from 'notistack'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import FormGroup from '@material-ui/core/FormGroup'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Select from '../components/select'
import Layout from '../components/layout'
import Button from '../components/button'
import Input from '../components/input'
import { provincias, cantones, distritos, all } from '../lib/postal-codes'
import useUser from '../hooks/user'
import { getSession } from '../lib/auth'

const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  inline: {
    justifyContent: 'space-between',
    overflow: 'hidden'
  },
  inlineControl: {
    width: '48%'
  }
}))

const defaultValues = {
  age: '',
  sex: 'F',
  province: '',
  canton: '',
  district: ''
}

const Profile = ({ user }) => {
  const styles = useStyles()
  const router = useRouter()
  const { update } = useUser()
  const { enqueueSnackbar: notify } = useSnackbar()
  const { setValue, reset, watch, control, handleSubmit, errors } = useForm({
    mode: 'onChange',
    defaultValues
  })

  const { province, canton, district } = watch()
  const provinces = Object.keys(all)
  const cantons = province ? Object.keys(all[province] || {}) : []
  const districts = cantons.length > 0 ? Object.keys(all[province][canton] || {}) : []

  useEffect(() => {
    reset({
      age: user?.age || '',
      sex: user?.sex || '',
      province: user?.province || '',
      canton: user?.canton || '',
      district: user?.district || ''
    })
  }, [user])

  useEffect(() => {
    if (canton && !cantons.includes(canton)) {
      setValue('canton', '')
    }
  }, [cantons, canton])

  useEffect(() => {
    if (district && !districts.includes(district)) {
      setValue('district', '')
    }
  }, [districts, district])

  useEffect(() => {
    if (!user) router.replace('/signin')
  }, [user])

  const onSubmit = async data => {
    try {
      await update(data)
      router.push('/risk')
    } catch (error) {
      console.log(error)
      notify(error.message, { variant: 'error' })
    }
  }

  return (
    <Layout
      loading={!user}
      user={user}
      backLabel="Inicio"
      onBack={() => router.replace('/dashboard')}
      my={2}
    >
      <Typography variant="h1" gutterBottom>
        Perfil
      </Typography>
      <Typography className={styles.margin} color="textSecondary" gutterBottom>
        Por favor ingrese los siguientes datos, dichos datos nos permitirán generar reportes y
        estadísticas para mantener a la población informada sobre los síntomas del COVID-19.
      </Typography>
      <FormGroup row className={styles.inline}>
        <Input
          label="Edad"
          className={styles.inlineControl}
          error={Boolean(errors.age)}
          errorText={errors.age && errors.age.message}
          type="number"
          name="age"
          rules={{
            required: 'Requerido',
            min: {
              value: 15,
              message: 'El valor mínimo de edad es de 15'
            },
            max: {
              value: 99,
              message: 'El valor máximo de edad es de 99'
            }
          }}
          control={control}
        />
        <Select
          name="sex"
          label="Sexo"
          className={styles.inlineControl}
          rules={{ required: 'Requerido' }}
          control={control}
          error={Boolean(errors.sex)}
          errorText={errors.sex && errors.sex.message}
        >
          <option value="F">Femenino</option>
          <option value="M">Masculino</option>
        </Select>
      </FormGroup>

      <FormGroup row className={styles.inline}>
        <Select
          style={{ width: '32%' }}
          name="province"
          label="Provincia"
          rules={{ required: 'Requerido' }}
          control={control}
          error={Boolean(errors.province)}
          errorText={errors.province && errors.province.message}
        >
          {provinces.map(code => (
            <option key={code} value={code}>
              {provincias[code]}
            </option>
          ))}
        </Select>

        <Select
          name="canton"
          label="Cantón"
          rules={{ required: 'Requerido' }}
          control={control}
          style={{ marginBottom: 0, width: '32%' }}
          error={Boolean(errors.canton)}
          errorText={errors.canton && errors.canton.message}
        >
          {cantons.map(code => (
            <option key={code} value={code}>
              {cantones[code]}
            </option>
          ))}
        </Select>
        {
          <Select
            name="district"
            label="Distrito"
            style={{ width: '32%' }}
            rules={{ required: 'Requerido' }}
            control={control}
            error={Boolean(errors.district)}
            errorText={errors.district && errors.district.message}
          >
            {districts.map(code => (
              <option key={code} value={code}>
                {distritos[code]}
              </option>
            ))}
          </Select>
        }
        {
          //   <TextField
          //   disabled
          //   fullWidth
          //   value={province && canton && district ? codes[province][canton][district] : ''}
          //   label="Código postal"
          //   variant="outlined"
          // />
          // <InputLabel htmlFor="email">Email (Opcional)</InputLabel>
          // <TextField fullWidth variant="outlined" className={styles.margin} />
        }
      </FormGroup>

      <Button disabled={!isEmpty(errors)} type="submit" onClick={handleSubmit(onSubmit)}>
        {user?.age ? 'Siguiente' : 'Continuar'}
      </Button>
    </Layout>
  )
}

export const getServerSideProps = async ctx => {
  const session = await getSession(ctx)
  return { props: { ...session } }
}

export default Profile
