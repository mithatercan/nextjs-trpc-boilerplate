import type { Context } from '@backend/helpers/createContext'
import { createRouter } from '@backend/helpers/createRouter'
import { TRPCError } from '@trpc/server'
import bcyrpt from 'bcrypt'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

const schema = z.object({
  username: z.string(),
  password: z.string(),
})

export const authRouter = createRouter()
  .mutation('_signin', {
    input: schema,
    async resolve({
      ctx,
      input,
    }: {
      ctx: Context
      input: {
        username: string
        password: string
      }
    }) {
      if (ctx.user) {
        return ctx.user
      }

      const user = await ctx.prisma.user.findUnique({
        where: { username: input.username },
      })

      if (user && bcyrpt.compareSync(input.password, user?.password)) {
        const token = jwt.sign(user, process.env.SECRET_KEY as string, {
          expiresIn: '1h',
        })

        ctx.res.setHeader(
          'Set-Cookie',
          cookie.serialize('ACCESS_TOKEN', token, {
            httpOnly: true,
            maxAge: 8 * 60 * 60,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
          })
        )

        return user
      }

      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Invalid credentials!',
      })
    },
  })

  .mutation('_signup', {
    input: schema,
    async resolve({ ctx, input }) {
      const foundUser = await ctx.prisma.user.findUnique({
        where: { username: input.username },
      })

      if (foundUser) {
        throw new Error('User already exists')
      }

      const user = await ctx.prisma.user.create({
        data: {
          username: input.username,
          password: bcyrpt.hashSync(input.password, 10),
        },
      })

      const token = jwt.sign(user, process.env.SECRET_KEY as string, {
        expiresIn: '1h',
      }) as string

      ctx.res.setHeader(
        'Set-Cookie',
        cookie.serialize('ACCESS_TOKEN', token, {
          httpOnly: true,
          maxAge: 8 * 60 * 60,
          path: '/',
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        })
      )

      return user
    },
  })

  .mutation('_signout', {
    resolve({ ctx }) {
      ctx.user = null
    },
  })
