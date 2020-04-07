import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FormGroup from '@material-ui/core/FormGroup'
import * as cons from '../constants'
import Emoji from './emoji'

const useStyles = makeStyles(() => ({
  inline: {
    flexWrap: 'unset',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}))

const Rate = ({ value, onChange }) => {
  const styles = useStyles()
  const [rate, setRate] = useState('')

  useEffect(() => {
    setRate(value)
  }, [value])

  const renderItem = item => (
    <Emoji
      key={item.type}
      active={rate === item.value}
      onClick={() => {
        setRate(item.value)
        onChange(item.value)
      }}
      {...item}
    />
  )

  return (
    <FormGroup row className={styles.inline}>
      {cons.emojis.map(renderItem)}
    </FormGroup>
  )
}

export default Rate
