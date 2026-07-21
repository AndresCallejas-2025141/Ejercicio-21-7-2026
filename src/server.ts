import http, { IncomingMessage, ServerResponse } from "http";
import { obtenerProductos, obtenerProductoPorId, agregarProducto, actualizarProducto, eliminarProducto } from "./controllers/productoController";

export const server = http.createServer(
    (req: IncomingMessage, res: ServerResponse) => {

        if (req.url === "/productos" && req.method === "GET") {
            obtenerProductos(res);
            return;
        }

        if (req.method === "GET" && req.url?.startsWith("/productos/")) {

        const partes = req.url.split("/");

        const id = Number(partes[2]);

        obtenerProductoPorId(id, res);

        return;
        }

        if (req.url === "/productos" && req.method === "POST") {

        agregarProducto(req, res);

        return;

        }

        if (req.method === "PUT" && req.url?.startsWith("/productos/")) {

        const partes = req.url.split("/");

        const id = Number(partes[2]);

        actualizarProducto(req, res, id);

        return;

        }

        if (req.method === "DELETE" && req.url?.startsWith("/productos/")) {

        const partes = req.url.split("/");

        const id = Number(partes[2]);

        eliminarProducto(id, res);

        return;

        }

        res.writeHead(404, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            mensaje: "Ruta no encontrada"
        }));
    }
);