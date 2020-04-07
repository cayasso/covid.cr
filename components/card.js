import { makeStyles } from '@material-ui/core/styles'
import BaseCard from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    // minWidth: '40%',
    flexGrow: 1,
    padding: '0',
    margin: '24px 8px'
    // backgroundColor: '#e8eaf6',
    // border: '1px solid #AAA'
  }
})

const Card = ({ title, children, ...props }) => {
  const classes = useStyles()

  return (
    <BaseCard elevation={1} className={classes.root} {...props}>
      <CardContent style={{ textAlign: 'center' }}>
        {title && (
          <Typography variant="h6" style={{ color: '#666' }} gutterBottom>
            {title}
          </Typography>
        )}

        {children}
      </CardContent>
    </BaseCard>
  )
}

export default Card
