import NextLink from 'next/link'
import { useTheme } from '@material-ui/core/styles'
const Link = ({ as, href, ...props }) => {
  const theme = useTheme()

  return (
    <NextLink href={href} as={as}>
      <a style={{ textDecoration: 'none', color: theme.palette.primary.main }} {...props} />
    </NextLink>
  )
}

export default Link
