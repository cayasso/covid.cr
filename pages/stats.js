import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'

import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts'

import Layout from '../components/layout'
import Card from '../components/card'
import { getSession } from '../lib/auth'
import { fetch } from '../lib/fetch'
import { formatDate } from '../lib/utils'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  label: {
    fontSize: '1rem',
  },
  card: {
    width: '46%',
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
  },
  container: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
}))

const Statistics = ({ user, report, history }) => {
  const router = useRouter()
  const styles = useStyles()

  const { confirmed = 0, active = 0, recovered = 0, deceased = 0 } = report || {}

  const gender = [
    { name: 'Mujeres', value: report.gender.F },
    { name: 'Hombres', value: report.gender.M },
  ]

  const GENDER_COLORS = ['#FE46A5', '#6200EA']

  const age = [
    { name: 'Menores', value: report.age.juveniles },
    { name: 'Adultos', value: report.age.adults },
    { name: 'Ancianos', value: report.age.elderlies },
  ]

  const location = [
    { name: 'San José', value: report.province['1'] },
    { name: 'Alajuela', value: report.province['2'] },
    { name: 'Cartago', value: report.province['3'] },
    { name: 'Heredia', value: report.province['4'] },
    { name: 'Guanacaste', value: report.province['5'] },
    { name: 'Puntarenas', value: report.province['6'] },
    { name: 'Limón', value: report.province['7'] },
  ]

  const NATIONALITY_COLORS = ['#6200EA', '#64B5F6']

  const nationality = [
    { name: 'Costarricenses', value: report.nationality.costarricans },
    { name: 'Extranjeros', value: report.nationality.foreigners },
  ]

  return (
    <Layout
      user={user}
      backLabel="Inicio"
      onBack={() => router.push(user ? '/dashboard' : '/')}
      my={1}
    >
      <Typography variant="h1" gutterBottom>
        Situación país
      </Typography>
      <div>
        <div className={styles.container}>
          <Card className={styles.card} title="Confirmados">
            <Typography variant="h3">{confirmed}</Typography>
          </Card>

          {
            // <Card title="Descartados">
            //   <Typography variant="h3">{discarded}</Typography>
            // </Card>
          }

          <Card className={styles.card} title="Activos">
            <Typography variant="h3" style={{ color: '#f1c40f' }}>
              {active}
            </Typography>
          </Card>

          <Card className={styles.card} title="Recuperados">
            <Typography variant="h3" style={{ color: '#2ecc71' }}>
              {recovered}
            </Typography>
          </Card>

          <Card className={styles.card} title="Fallecidos">
            <Typography variant="h3" style={{ color: '#e74c3c' }}>
              {deceased}
            </Typography>
          </Card>
        </div>

        {
          <Card title="Casos por día">
            <ResponsiveContainer height={300}>
              <LineChart
                data={[...history].reverse()}
                margin={{ left: 0, right: 16, top: 24, bottom: 24 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  textAnchor="middle"
                  tick={{ fontSize: 11, angle: -75 }}
                  tickMargin={16}
                  tickFormatter={(d) => {
                    // return formatDate(d, 'DD MMMM \\d\\e YYYY')
                    return formatDate(d)
                  }}
                />
                <YAxis dataKey="total" />
                <Tooltip label="date" />
                <Line dataKey="total" name="Confirmados" strokeWidth="2" />
                <Line dataKey="active" name="Activos" stroke="#f1c40f" strokeWidth="2" />
                <Line dataKey="recovered" name="Recuperados" stroke="#2ecc71" strokeWidth="2" />
                <Line dataKey="deceased" name="Fallecidos" stroke="#e74c3c" strokeWidth="2" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        }

        <Card title="Casos por género">
          <ResponsiveContainer height={300}>
            <PieChart>
              <Pie
                label
                data={gender}
                dataKey="value"
                stroke="transparent"
                paddingAngle={3}
                innerRadius={80}
              >
                {gender.map((entry, index) => (
                  <Cell key={entry.name} fill={GENDER_COLORS[index % GENDER_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Casos por edad">
          <ResponsiveContainer height={300}>
            <BarChart data={age.sort((a, b) => (a.value > b.value ? -1 : 1))} margin={{ top: 24 }}>
              <XAxis type="category" dataKey="name" tick={{ fontSize: 11 }} tickMargin={0} />
              <YAxis hide type="number" dataKey="value" label={{ dy: -90 }} />
              <Bar label={{ position: 'insideTop', dy: -24 }} dataKey="value" fill="#6200EA" />
              <Tooltip cursor={false} formatter={(value) => [value]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Casos por provincia">
          <ResponsiveContainer height={300}>
            <BarChart
              layout="vertical"
              data={location
                .filter((i) => i.value > 0)
                .sort((a, b) => (a.value > b.value ? -1 : 1))}
              margin={{ left: 32, right: 44, top: 8 }}
            >
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} tickMargin={10} />
              <XAxis hide type="number" dataKey="value" />
              <Bar label={{ position: 'insideRight', dx: 34 }} dataKey="value" fill="#6200EA" />
              <Tooltip cursor={false} formatter={(value) => [value]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Casos por nacionalidad">
          <ResponsiveContainer height={300}>
            <PieChart margin={{ left: 16, right: 16 }}>
              <Pie
                label
                data={nationality}
                dataKey="value"
                stroke="transparent"
                paddingAngle={3}
                innerRadius={80}
              >
                {nationality.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={NATIONALITY_COLORS[index % NATIONALITY_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip cursor={false} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  const { req } = ctx
  const protocol = req.protocol ? req.protocol : `http`
  const host = `${protocol}://${req.headers.host}`

  const [report, history] = await Promise.all([
    fetch(`${host}/api/cases`),
    fetch(`${host}/api/cases?history=1&summary=1`),
  ])

  return { props: { ...session, report, history } }
}

export default Statistics
