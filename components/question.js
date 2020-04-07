import clsx from 'clsx'
import Typography from '@material-ui/core/Typography'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import FormGroup from '@material-ui/core/FormGroup'
import Checkbox from '@material-ui/core/Checkbox'
import CircleCheckedFilled from '@material-ui/icons/CheckCircle'
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked'

const useStyles = makeStyles(theme => ({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(1.8),
    marginBottom: theme.spacing(1.8),
    flexWrap: 'unset',
    boxShadow: '0 1px 3px rgba(0,0,0,.1)',
    backgroundColor: '#FFF',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1.6),
    paddingBottom: theme.spacing(1.2),
    borderRadius: 12,
    border: '3px solid #FFF'
  },
  icon: {
    fontSize: 28,
    fill: '#ededed'
  },
  checkedIcon: {
    fill: theme.palette.primary.main
  },
  text: {
    marginRight: '0.2rem'
  }
}))

const Question = ({ text, onChange, ...props }) => {
  const theme = useTheme()
  const styles = useStyles()
  const event = { target: { value: props.value } }

  return (
    <FormGroup
      row
      onClick={() => onChange(event, !props.checked)}
      className={styles.container}
      style={{ borderColor: props.checked ? theme.palette.primary.main : '#FFF' }}
    >
      <Typography className={styles.text} gutterBottom>
        {text}
      </Typography>

      <Checkbox
        color="primary"
        icon={<CircleUnchecked className={styles.icon} />}
        checkedIcon={<CircleCheckedFilled className={clsx(styles.icon, styles.checkedIcon)} />}
        {...props}
      />
    </FormGroup>
  )
}

export default Question
