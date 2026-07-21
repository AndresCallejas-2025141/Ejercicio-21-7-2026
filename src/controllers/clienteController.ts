import { IncomingMessage, ServerResponse } from "http";
import { clientes } from "../data/clientes";
import { obtenerBody } from "../utils/bodyParser";

export function obtenerClientes(res: ServerResponse): void {

    res.writeHead(200, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify(clientes));

}

export function obtenerClientePorId(
    id: number,
    res: ServerResponse
): void {

    const cliente = clientes.find(cliente => cliente.id === id);

    if (!cliente) {

        res.writeHead(404, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            mensaje: "Cliente no encontrado."
        }));

        return;

    }

    res.writeHead(200, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify(cliente));

}

export async function agregarCliente(
    req: IncomingMessage,
    res: ServerResponse
): Promise<void> {

    try {

        const datos = await obtenerBody(req);

        if (!datos.nombre || datos.nombre.trim() === "") {
            res.writeHead(400);
            res.end(JSON.stringify({ mensaje: "Nombre obligatorio." }));
            return;
        }

        if (!datos.apellido || datos.apellido.trim() === "") {
            res.writeHead(400);
            res.end(JSON.stringify({ mensaje: "Apellido obligatorio." }));
            return;
        }

        if (!datos.correo || datos.correo.trim() === "") {
            res.writeHead(400);
            res.end(JSON.stringify({ mensaje: "Correo obligatorio." }));
            return;
        }

        if (!datos.telefono || datos.telefono.trim() === "") {
            res.writeHead(400);
            res.end(JSON.stringify({ mensaje: "Teléfono obligatorio." }));
            return;
        }

        const correoExiste = clientes.find(cliente => cliente.correo === datos.correo);

        if (correoExiste) {
            res.writeHead(400);
            res.end(JSON.stringify({ mensaje: "Correo repetido." }));
            return;
        }

        clientes.push(datos);

        res.writeHead(201);

        res.end(JSON.stringify({
            mensaje: "Cliente agregado correctamente.",
            cliente: datos
        }));

    } catch {

        res.writeHead(400);

        res.end(JSON.stringify({
            mensaje: "JSON inválido."
        }));

    }

}

export async function actualizarCliente(
    req: IncomingMessage,
    res: ServerResponse,
    id: number
): Promise<void> {

    try {

        const datos = await obtenerBody(req);

        const indice = clientes.findIndex(cliente => cliente.id === id);

        if (indice === -1) {

            res.writeHead(404);

            res.end(JSON.stringify({
                mensaje: "Cliente no encontrado."
            }));

            return;

        }

        clientes[indice] = {
            id,
            nombre: datos.nombre,
            apellido: datos.apellido,
            correo: datos.correo,
            telefono: datos.telefono,
            direccion: datos.direccion,
            estado: datos.estado
        };

        res.writeHead(200);

        res.end(JSON.stringify({
            mensaje: "Cliente actualizado correctamente.",
            cliente: clientes[indice]
        }));

    } catch {

        res.writeHead(400);

        res.end(JSON.stringify({
            mensaje: "JSON inválido."
        }));

    }

}

export function eliminarCliente(
    id: number,
    res: ServerResponse
): void {

    const indice = clientes.findIndex(cliente => cliente.id === id);

    if (indice === -1) {

        res.writeHead(404);

        res.end(JSON.stringify({
            mensaje: "Cliente no encontrado."
        }));

        return;

    }

    const eliminado = clientes.splice(indice, 1);

    res.writeHead(200);

    res.end(JSON.stringify({
        mensaje: "Cliente eliminado correctamente.",
        cliente: eliminado[0]
    }));

}