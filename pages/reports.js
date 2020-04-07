import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router'
import WatchDialog from '../components/watch-dialog'
import Layout from '../components/layout'
import Case from '../components/case'
import useUser from '../hooks/user'
import { getSession } from '../lib/auth'
import * as storage from '../lib/storage'
import { fetch } from '../lib/fetch'
import { cantones, provincias } from '../lib/postal-codes'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    height: '100%',
    minHeight: 160,
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 12,
  },
  cardContent: {
    height: '100%',
    display: 'flex',
    border: '1px dashed ' + theme.palette.primary.main,
    borderRadius: 12,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  button: {
    color: theme.palette.primary.main,
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
}))

const sort = (cases) => (a, b) => {
  return cases[b] - cases[a]
}

const getTotals = ({ canton = {}, province = {}, country = {} } = {}) => {
  const totalProvinceCases = Object.keys(province).reduce((acc, code) => province[code] + acc, 0)
  const totalCantonCases = Object.keys(canton).reduce((acc, code) => canton[code] + acc, 0)
  const totalCountryCases = Object.values(country).reduce((acc, value) => {
    return value + acc
  }, 0)

  return [totalProvinceCases, totalCantonCases, totalCountryCases]
}

const Reports = ({ user, report, countries }) => {
  const styles = useStyles()
  const router = useRouter()
  const { update } = useUser()

  const [cantonDialog, setCantonDialog] = useState(false)
  const [provinceDialog, setProvinceDialog] = useState(false)
  const [countryDialog, setCountryDialog] = useState(false)
  const [selected, setSelected] = useState([])

  useEffect(() => {
    if (!user) {
      const favorites = storage.get('favorites', ['CR'])
      setSelected([...new Set(['CR', ...favorites])])
      return
    }

    user.favorites = user.favorites || []
    const favorites = ['CR']
    if (user.province) favorites.push(user.province)
    if (user.canton) favorites.push(user.canton)
    setSelected([...new Set([...favorites, ...user.favorites])])
  }, [user])

  const onAction = (ok, data) => {
    if (ok) {
      setSelected(data)
      onUpdate(data)
    }

    setCantonDialog(false)
    setProvinceDialog(false)
    setCountryDialog(false)
  }

  const onUpdate = async (favorites) => {
    storage.set('favorites', favorites)

    if (user) {
      await update({ favorites })
    }
  }

  const onRemove = (code) => {
    const favorites = selected.filter((s) => s !== code) || []
    setSelected(favorites)
    onUpdate(favorites)
  }

  const { cantons, provinces, selectedCountries } = selected.reduce(
    (acc, code) => {
      if (code.length === 1) acc.provinces.push(code)
      else if (code.length === 2) acc.selectedCountries.push(code)
      else acc.cantons.push(code)
      return acc
    },
    { provinces: [], cantons: [], selectedCountries: [] }
  )

  const { labels: countryLabels, values: countryValues } = countries.reduce(
    (acc, country) => {
      if (!country.code || !country.name || !('total' in country)) return acc
      acc.labels[country.code] = country.name
      acc.values[country.code] = country.total
      return acc
    },
    { labels: {}, values: {} }
  )

  const [totalProvinceCases, totalCantonCases, totalCountryCases] = getTotals({
    ...report,
    country: countryValues,
  })

  const renderProvince = (code) => {
    return (
      <Case
        key={code}
        code={code}
        user={user}
        total={totalProvinceCases}
        disabled={user && user.province === code}
        labels={provincias}
        cases={report.province}
        onRemove={onRemove}
      />
    )
  }

  const renderCanton = (code) => {
    return (
      <Case
        user={user}
        key={code}
        total={totalCantonCases}
        disabled={user && user.canton === code}
        code={code}
        labels={cantones}
        cases={report.canton}
        onRemove={onRemove}
      />
    )
  }

  const renderCountry = (code) => {
    return (
      <Case
        user={user}
        key={code}
        code={code}
        total={totalCountryCases}
        labels={countryLabels}
        cases={countryValues}
        onRemove={onRemove}
      />
    )
  }

  return (
    <Layout
      user={user}
      backLabel="Inicio"
      onBack={() => router.push(user ? '/dashboard' : '/')}
      my={0}
    >
      <Typography variant="h1" gutterBottom>
        Reporte de casos
      </Typography>
      <Typography color="textSecondary" gutterBottom>
        Aquí puedes darle seguimiento a los casos COVID-19 por provincias, cantones y por países.
      </Typography>
      <br />
      <Grid container className={styles.root}>
        <Grid item xs={12}>
          <Typography variant="h2" color="textSecondary">
            Mis provincias
          </Typography>
          <Divider />
          <br />
          <Grid container justify="space-between" spacing={2}>
            {provinces.sort(sort(report.province)).map(renderProvince)}
            <Grid xs={6} item>
              <Card elevation={0} className={styles.card}>
                <CardContent className={styles.cardContent}>
                  <Button onClick={() => setProvinceDialog(true)} className={styles.button}>
                    <AddIcon style={{ fontSize: 48 }} />
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <br />
          <Typography variant="h2" color="textSecondary">
            Mis cantones
          </Typography>
          <Divider />
          <br />
          <Grid container justify="space-between" spacing={2}>
            {cantons.sort(sort(report.canton)).map(renderCanton)}
            <Grid xs={6} item>
              <Card elevation={0} className={styles.card}>
                <CardContent className={styles.cardContent}>
                  <Button onClick={() => setCantonDialog(true)} className={styles.button}>
                    <AddIcon style={{ fontSize: 48 }} />
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <br />
          <Typography variant="h2" color="textSecondary">
            Mis países
          </Typography>
          <Divider />
          <br />
          <Grid container justify="space-between" spacing={2}>
            {selectedCountries.map(renderCountry)}
            <Grid xs={6} item>
              <Card elevation={0} className={styles.card}>
                <CardContent className={styles.cardContent}>
                  <Button onClick={() => setCountryDialog(true)} className={styles.button}>
                    <AddIcon style={{ fontSize: 48 }} />
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <WatchDialog
        title="Provincias"
        data={report.province}
        source={provincias}
        selected={selected}
        open={provinceDialog}
        onAction={onAction}
      />
      <WatchDialog
        title="Cantones"
        data={report.canton}
        source={cantones}
        selected={selected}
        open={cantonDialog}
        onAction={onAction}
      />
      {
        <WatchDialog
          title="Países"
          data={countryValues}
          source={countryLabels}
          selected={selected}
          open={countryDialog}
          onAction={onAction}
        />
      }
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  const { req } = ctx
  const protocol = req.protocol ? req.protocol : `http`
  const host = `${protocol}://${req.headers.host}`

  const [report, countries] = await Promise.all([
    fetch(`${host}/api/cases`),
    fetch(`${host}/api/cases?country=ALL`),
  ])

  return { props: { ...session, report, countries } }
}

export default Reports
