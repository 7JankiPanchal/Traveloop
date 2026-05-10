import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { hashPassword, createToken } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { 
      email, 
      password, 
      firstName, 
      lastName, 
      phoneNumber, 
      city, 
      country, 
      additionalInfo 
    } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    const hashedPassword = await hashPassword(password)
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        firstName,
        lastName,
        phoneNumber,
        city,
        country,
        additionalInfo,
      },
    })

    const token = await createToken({ userId: user.id, email: user.email })

    const response = NextResponse.json({ message: 'User created' }, { status: 201 })
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 2, // 2 hours
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
