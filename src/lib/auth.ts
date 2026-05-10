import { V4 } from 'paseto'
import { createPrivateKey, createPublicKey } from 'crypto'
import bcrypt from 'bcryptjs'

const PRIVATE_KEY_B64 = process.env.PASETO_PRIVATE_KEY
const PUBLIC_KEY_B64 = process.env.PASETO_PUBLIC_KEY

function getKeys() {
  if (!PRIVATE_KEY_B64 || !PUBLIC_KEY_B64) {
    throw new Error('PASETO keys are not defined in environment')
  }
  
  const privateKey = createPrivateKey(Buffer.from(PRIVATE_KEY_B64, 'base64').toString())
  const publicKey = createPublicKey(Buffer.from(PUBLIC_KEY_B64, 'base64').toString())
  
  return { privateKey, publicKey }
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 12)
}

export async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash)
}

export async function createToken(payload: any) {
  const { privateKey } = getKeys()
  return await V4.sign(payload, privateKey, { expiresIn: '2h' })
}

export async function verifyToken(token: string) {
  const { publicKey } = getKeys()
  try {
    return await V4.verify(token, publicKey)
  } catch (e) {
    return null
  }
}
