import http, { IncomingMessage, ServerResponse } from "http";

export const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {

    res.setHeader("Content-Type", "application/json");

    if (req.url === "/" && req.method === "GET") {
      res.writeHead(200);

      res.end(
        JSON.stringify({
          mensaje: "Servidor HTTP funcionando correctamente"
        })
      );

      return;
    }

    res.writeHead(404);

    res.end(
      JSON.stringify({
        error: "Ruta no encontrada"
      })
    );
  }
);