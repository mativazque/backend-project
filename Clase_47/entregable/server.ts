import { serve } from "https://deno.land/std@0.52.0/http/server.ts";

const port = 4000
const server = serve({ port: port });

for await (const req of server) {
  req.respond({ body: "<h1>Hello Deno Server </h1>" })
}