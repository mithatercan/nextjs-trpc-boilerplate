import { createContext } from '@backend/helpers/createContext'
import { appRouter } from '@backend/routers/_app.router'
import * as trpcNext from '@trpc/server/adapters/next'

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
})
