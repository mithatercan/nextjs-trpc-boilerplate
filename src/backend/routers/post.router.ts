import type { Context } from '@backend/helpers/createContext'
import { createRouter } from '@backend/helpers/createRouter'
import { z } from 'zod'

export const postRouter = createRouter()
  .query('_all', {
    async resolve({ ctx }: { ctx: Context }) {
      const posts = await ctx.prisma.post.findMany()
      if (posts) return posts
      return null
    },
  })

  .mutation('_add', {
    input: z.object({
      description: z.string().min(1),
    }),
    async resolve({
      ctx,
      input,
    }: {
      ctx: Context
      input: {
        description: string
      }
    }) {
      const post = await ctx.prisma.post.create({
        data: {
          ...input,
        },
      })
      if (post) return post
      return null
    },
  })

export type PostRouter = typeof postRouter
