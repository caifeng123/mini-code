import http from 'http';

type Next = () => Promise<void>;

type MiddleWare = (ctx: Context, next: Next) => Promise<void>;

class Context {
  request: http.IncomingMessage;

  response: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  };

  body: any;

  constructor(
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage> & {
      req: http.IncomingMessage;
    }
  ) {
    this.request = req;
    this.response = res;
    return this;
  }
}

class Koa {
  middlewares = [];

  constructor() {
    return this;
  }

  use = middleware => {
    this.middlewares.push(middleware);
  };

  listen = (port?: number, hostname?: string) => {
    const middleFunc = this.#compose(this.middlewares);
    const server = http.createServer(async (req, res) => {
      const ctx = new Context(req, res);
      try {
        await middleFunc(ctx);
        ctx.response.end(ctx.body);
      } catch (error) {
        console.error(error);
        ctx.response.statusCode = 500;
        ctx.response.end('Internel Server Error');
      }
    });
    server.listen(port, hostname);
  };

  #compose = (middlewares: MiddleWare[]) => {
    return ctx => {
      const next = middlewares.reduceRight(
        (nextFunc: Next, middleware) => {
          return async () => {
            await middleware(ctx, nextFunc);
          };
        },
        async () => {}
      );
      return next();
    };
  };
}

module.exports = Koa;
