import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Typography from '@material-ui/core/Typography'
import Button from '../components/button'
import Question from '../components/question'
import Layout from '../components/layout'
import useUser from '../hooks/user'
import { getSession } from '../lib/auth'
import * as cons from '../constants'

const hasEvaluation = (user = {}) => {
  return user.risk && user.history && user.history.length > 0
}

const Risk = ({ user }) => {
  const router = useRouter()
  const { update } = useUser()
  const [data, setData] = useState([])

  useEffect(() => {
    if (!user) {
      router.replace('/signin')
    } else if (user && user.risk) {
      setData(user.risk)
    }
  }, [user])

  const onSubmit = async () => {
    await update({ risk: data })

    if (hasEvaluation(user)) {
      router.push('/dashboard')
    } else {
      router.push('/test')
    }
  }

  const onChange = (event, active) => {
    const key = event.target.value

    if (active) {
      if (!data.includes(key)) setData((data) => [...data, key])
    } else {
      setData((data) => data.filter((r) => r !== key))
    }
  }

  const renderItem = (item) => {
    if (!user || (user.sex !== 'F' && item.value === 'pregnant')) {
      return null
    }

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

  return (
    <Layout loading={!user} user={user} onBack={() => router.push('/dashboard')}>
      <Typography variant="h1" gutterBottom>
        Antecedentes
      </Typography>
      <Typography variant="h4">¿Tienes alguna de estas condiciones?</Typography>
      {cons.conditions.map(renderItem)}
      <Typography variant="h4">¿Has estado en alguno de estas situaciones de riesgo?</Typography>
      {cons.contacts.map(renderItem)}
      <Button onClick={onSubmit}>{hasEvaluation(user) ? 'Guardar' : 'Siguiente'}</Button>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  return { props: { ...session } }
}

export default Risk
