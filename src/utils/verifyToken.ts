import { parseCookies } from "nookies"

export function verifyToken(ctx: any) {
  const { ['testlab.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
