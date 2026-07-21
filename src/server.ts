import http, { IncomingMessage, ServerResponse } from "http";
import { obtenerProductos, obtenerProductoPorId, agregarProducto, actualizarProducto, eliminarProducto } from "./controllers/productoController";
import { obtenerClientes, obtenerClientePorId, agregarCliente, actualizarCliente, eliminarCliente } from "./controllers/clienteController";

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

        if (req.url === "/clientes" && req.method === "GET") {

        obtenerClientes(res);

        return;

        }

        if (req.method === "GET" && req.url?.startsWith("/clientes/")) {

        const id = Number(req.url.split("/")[2]);

        obtenerClientePorId(id, res);

        return;

        }

        if (req.url === "/clientes" && req.method === "POST") {

        agregarCliente(req, res);

        return;

        }

        if (req.method === "PUT" && req.url?.startsWith("/clientes/")) {

        const id = Number(req.url.split("/")[2]);

        actualizarCliente(req, res, id);

        return;

        }

        if (req.method === "DELETE" && req.url?.startsWith("/clientes/")) {

        const id = Number(req.url.split("/")[2]);

        eliminarCliente(id, res);

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