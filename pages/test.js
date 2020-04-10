import { Fragment, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Typography from '@material-ui/core/Typography'
import Layout from '../components/layout'
import Question from '../components/question'
import Button from '../components/button'
import Rate from '../components/rate'
import useUser from '../hooks/user'
import { getSession } from '../lib/auth'
import * as cons from '../constants'

const isMissingData = (user = {}) => {
  return !(user.age && user.sex && user.province && user.canton && user.district)
}

const Symptoms = ({ user }) => {
  const router = useRouter()
  const { update } = useUser()
  const [data, setData] = useState([])
  const [feeling, setFeeling] = useState('')

  useEffect(() => {
    if (user) {
      if (user.symptoms) {
        setData(user.symptoms)
      }

      setFeeling(user.feeling)
    }
  }, [user])

  useEffect(() => {
    // if (loading) return

    if (!user) {
      router.replace('/signin')
    } else if (isMissingData(user)) {
      router.replace('/profile')
    }
  }, [user])

  // if (!user || loading || !isMissingData(user)) return <Loader />

  const onSubmit = async () => {
    const noSymptoms = data.length === 0
    if (noSymptoms) {
      await update({ feeling: 'good', symptoms: data })
    } else {
      await update({ feeling, symptoms: data })
    }

    router.push('/results')
  }

  const onChange = (event, active) => {
    const key = event.target.value

    if (active) {
      if (!data.includes(key)) {
        setData((data) => [...data, key])
      }
    } else {
      setData((data) => data.filter((r) => r !== key))
    }
  }

  const renderItem = (item) => {
    return (
      <Question
        key={item.value}
        text={item.label}
        value={item.value}
        onChange={onChange}
        checked={data.includes(item.value)}
      />
    )
  }

  const noSymptoms = data.length === 0

  return (
    <Layout
      loading={!user || isMissingData(user)}
      backLabel="Inicio"
      user={user}
      onBack={() => router.back()}
    >
      <Typography variant="h1" gutterBottom>
        Autoevaluación
      </Typography>
      <Typography variant="h4">¿Tienes alguno de estos síntomas?</Typography>
      {cons.symptoms.map(renderItem)}

      {!noSymptoms && (
        <Fragment>
          <Typography variant="h4">¿Cómo te sientes físicamente?</Typography>
          <Rate value={feeling} onChange={setFeeling} />
        </Fragment>
      )}
      <Button onClick={onSubmit}>Enviar</Button>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  return { props: { ...session } }
}

export default Symptoms
