import { useTheme, makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import BaseCard from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { round } from '../lib/utils'

const useStyles = makeStyles(theme => ({
  paper: {
    height: '100%',
    minHeight: 160,
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 12
  },
  iconButton: {
    color: theme.palette.primary.main
  }
}))

const Case = ({ disabled, total, code, cases, labels, onRemove }) => {
  const styles = useStyles()
  const theme = useTheme()

  return (
    <Grid xs={6} item>
      <BaseCard elevation={1} className={styles.paper}>
        <CardContent
          style={{
            height: '100%',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h5" style={{ color: theme.palette.primary.main }} gutterBottom>
            {labels[code]}
          </Typography>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="h3" component="h4" style={{ fontSize: 48, margin: 0 }}>
              {cases[code]}
            </Typography>
            <Typography variant="subtitle1" style={{ color: '#999', margin: 0, fontWeight: '600' }}>
              Casos
            </Typography>
          </div>
        </CardContent>
        <CardActions style={{ justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <DonutLargeIcon color="primary" style={{ fontSize: 28, marginRight: 8 }} />

            <Typography variant="subtitle1" style={{ color: '#666', margin: 0, fontWeight: '600' }}>
              {round((100 / total) * cases[code])}%
            </Typography>
          </div>

          <IconButton
            disabled={disabled}
            edge="end"
            size="small"
            aria-label="menu"
            onClick={() => onRemove(code)}
            className={styles.iconButton}
          >
            <DeleteIcon size="small" style={{ fontSize: 28 }} />
          </IconButton>
        </CardActions>
      </BaseCard>
    </Grid>
  )
}

export default Case
