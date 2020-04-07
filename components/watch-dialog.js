import { useEffect, useState } from 'react'
import clsx from 'clsx'
import Button from '@material-ui/core/Button'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Dialog from '@material-ui/core/Dialog'
import FormGroup from '@material-ui/core/FormGroup'
import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import CircleCheckedFilled from '@material-ui/icons/CheckCircle'
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked'

const useStyles = makeStyles(theme => ({
  content: {
    backgroundColor: '#f5f5f8',
    padding: '0 8px'
  },
  icon: {
    fontSize: 24,
    fill: '#CCC'
  },
  checkedIcon: {
    fill: theme.palette.primary.main
  },
  text: {
    marginRight: '0.2rem'
  },
  formControl: {
    marginRight: 0,
    marginLeft: 0,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 6,
    width: '100%',
    padding: '8px 0',
    boxShadow: '0 1px 3px rgba(0,0,0,.1)',
    backgroundColor: '#FFF'
  },
  label: {
    width: '100%',
    paddingRight: 16,
    alignContent: 'center',
    alignItems: 'center'
  },
  labelConainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: '900'
  },
  aside: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

const CantonDialog = ({ title, data, source, open, onAction, ...props }) => {
  const theme = useTheme()
  const styles = useStyles()
  const [selected, setSelected] = useState([])

  useEffect(() => {
    if (!open) {
      setSelected(props.selected)
    }
  }, [props.selected, open])

  const onChange = (e, checked) => {
    const { value } = e.target

    if (checked) {
      if (!selected.includes(value)) {
        setSelected(s => [...s, value])
      }
    } else {
      setSelected(s => s.filter(v => value !== v))
    }
  }

  const renderItem = code => {
    const checked = selected.includes(code)

    return (
      <FormControlLabel
        key={code}
        classes={{ label: styles.label }}
        className={styles.formControl}
        control={
          <Checkbox
            color="primary"
            onChange={onChange}
            value={code}
            checked={checked}
            icon={<CircleUnchecked className={styles.icon} />}
            checkedIcon={<CircleCheckedFilled className={clsx(styles.icon, styles.checkedIcon)} />}
            {...props}
          />
        }
        label={
          <span className={styles.labelConainer}>
            <Typography align="center">{source[code]}</Typography>
            <span className={styles.aside}>
              <strong style={{ color: theme.palette.primary.main }}>{data[code]}</strong>
              <Typography variant="caption" color="textSecondary" align="center">
                casos
              </Typography>
            </span>
          </span>
        }
      />
    )
  }

  return (
    <Dialog
      maxWidth="xs"
      disableBackdropClick
      disableEscapeKeyDown
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...props}
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent className={styles.content} dividers>
        <FormGroup aria-label="position" row>
          {Object.keys(source).map(renderItem)}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => onAction(false, selected)} color="primary">
          Cancel
        </Button>
        <Button onClick={() => onAction(true, selected)} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}

CantonDialog.defaultProps = {
  onAction: () => {},
  selected: []
}

export default CantonDialog
