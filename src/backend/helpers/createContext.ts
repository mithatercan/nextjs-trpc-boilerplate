import prisma from '@backend/helpers/prisma'
import jwt from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'

export function createContext({
  req,
  res,
}: {
  req: NextApiRequest
  res: NextApiResponse
}) {
  let user = null

  if (req.cookies.ACCESS_TOKEN) {
    const token = req.cookies.ACCESS_TOKEN as string
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      username: string
    }

    prisma.user
      .findUnique({
        where: { username: decoded.username },
      })
      .then((result) => {
        user = result
      })
  }

  return {
    req,
    res,
    prisma,
    user: user ? user : null,
  }
}

export type Context = ReturnType<typeof createContext>
