import { forwardRef } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import clsx from 'clsx'
import Button from './button'

const NextComposed = forwardRef((props, ref) => {
  const { as, href, ...other } = props

  return (
    <NextLink href={href} as={as}>
      <a ref={ref} {...other} />
    </NextLink>
  )
})

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function Link(props) {
  const {
    href,
    activeClassName = 'active',
    className: classNameProps,
    innerRef,
    naked,
    ...other
  } = props

  const router = useRouter()
  const pathname = typeof href === 'string' ? href : href.pathname
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName
  })

  if (naked) {
    return <NextComposed className={className} ref={innerRef} href={href} {...other} />
  }

  return (
    <Button component={NextComposed} className={className} ref={innerRef} href={href} {...other} />
  )
}

export default forwardRef((props, ref) => <Link {...props} innerRef={ref} />)
