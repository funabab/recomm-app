import * as jose from 'jose'

const AES_SECRET = process.env.AES_ENCRYPTION_SECRET as string

export async function encyptedJWTPayload<T extends jose.JWTPayload>(
  payload: T
) {
  const secret = new TextEncoder().encode(AES_SECRET)
  const algorithm = 'A128CBC-HS256'

  const jwt = await new jose.EncryptJWT(payload).setProtectedHeader({
    alg: 'dir',
    enc: algorithm,
  })

  return jwt.encrypt(secret)
}

export async function decryptJWTPayload<T>(jwt: string) {
  const secret = new TextEncoder().encode(AES_SECRET)
  const { payload } = await jose.jwtDecrypt(jwt, secret)
  return payload as T
}
