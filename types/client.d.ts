declare type TokenPayload = {
  accessToken: string
  expireDate: string
}

declare type PageProps = {
  onSignIn: (payload: TokenPayload) => void
}
