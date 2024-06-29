import { NextPageContext } from 'next'
import { parseCookies } from 'nookies'

export function verifyToken(ctx: Pick<NextPageContext, 'req'>) {
  const { ['testlab.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      token,
    },
  }
}
