import http from 'http'

type Next = () => Promise<void>

type MiddleWare = (ctx: Context, next: Next) => Promise<void>

class Context {
  request: http.IncomingMessage

  response: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage
  }

  constructor(
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage> & {
      req: http.IncomingMessage
    }
  ) {
    this.request = req
    this.response = res
    return this
  }

  set body(value: any) {
    this.response.end(value)
  }
}

class Koa {
  middlewares = []

  constructor() {
    return this
  }

  use = middleware => {
    this.middlewares.push(middleware)
  }

  listen = (port?: number, hostname?: string) => {
    const middleFunc = this.#compose(this.middlewares)
    const server = http.createServer((req, res) => {
      const ctx = new Context(req, res)
      middleFunc(ctx)
    })
    server.listen(port, hostname)
  }

  #compose = (middlewares: MiddleWare[]) => {
    return ctx => {
      const next = middlewares.reduceRight(
        (nextFunc: Next, middleware) => {
          return async () => {
            await middleware(ctx, nextFunc)
          }
        },
        async () => {}
      )
      return next()
    }
  }
}

export default Koa
