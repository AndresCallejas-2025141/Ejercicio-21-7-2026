import { IncomingMessage, ServerResponse } from "http";
import { obtenerBody } from "../utils/bodyParser";
import { productos } from "../data/productos";

export function obtenerProductos(res: ServerResponse): void {

    res.writeHead(200, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify(productos));
}

export function obtenerProductoPorId(
    id: number,
    res: ServerResponse
): void {

    const producto = productos.find(producto => producto.id === id);

    if (!producto) {

        res.writeHead(404, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            mensaje: "Producto no encontrado"
        }));

        return;
    }

    res.writeHead(200, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify(producto));
}

export async function agregarProducto(
    req: IncomingMessage,
    res: ServerResponse
): Promise<void> {

    try {

        const datos = await obtenerBody(req);

        if (!datos.nombre || datos.nombre.trim() === "") {

            res.writeHead(400, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                mensaje: "El nombre es obligatorio."
            }));

            return;
        }

        if (!datos.categoria || datos.categoria.trim() === "") {

            res.writeHead(400, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                mensaje: "La categoría es obligatoria."
            }));

            return;
        }

        if (datos.precio < 0) {

            res.writeHead(400, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                mensaje: "El precio no puede ser negativo."
            }));

            return;
        }

        if (datos.stock < 0) {

            res.writeHead(400, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                mensaje: "El stock no puede ser negativo."
            }));

            return;
        }

        const existe = productos.find(producto => producto.id === datos.id);

        if (existe) {

            res.writeHead(400, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                mensaje: "El ID ya existe."
            }));

            return;
        }

        productos.push(datos);

        res.writeHead(201, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            mensaje: "Producto agregado correctamente.",
            producto: datos
        }));

    } catch {

        res.writeHead(400, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            mensaje: "JSON inválido."
        }));

    }

}

export async function actualizarProducto(
    req: IncomingMessage,
    res: ServerResponse,
    id: number
): Promise<void> {

    try {

        const datos = await obtenerBody(req);

        const indice = productos.findIndex(producto => producto.id === id);

        if (indice === -1) {

            res.writeHead(404, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                mensaje: "Producto no encontrado."
            }));

            return;

        }

        if (!datos.nombre || datos.nombre.trim() === "") {

            res.writeHead(400, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                mensaje: "El nombre es obligatorio."
            }));

            return;

        }

        if (!datos.categoria || datos.categoria.trim() === "") {

            res.writeHead(400, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                mensaje: "La categoría es obligatoria."
            }));

            return;

        }

        if (datos.precio < 0) {

            res.writeHead(400, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                mensaje: "El precio no puede ser negativo."
            }));

            return;

        }

        if (datos.stock < 0) {

            res.writeHead(400, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                mensaje: "El stock no puede ser negativo."
            }));

            return;

        }

        productos[indice] = {
            id,
            nombre: datos.nombre,
            descripcion: datos.descripcion,
            precio: datos.precio,
            stock: datos.stock,
            categoria: datos.categoria,
            estado: datos.estado
        };

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            mensaje: "Producto actualizado correctamente.",
            producto: productos[indice]
        }));

    } catch {

        res.writeHead(400, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            mensaje: "JSON inválido."
        }));

    }

}

export function eliminarProducto(
    id: number,
    res: ServerResponse
): void {

    const indice = productos.findIndex(producto => producto.id === id);

    if (indice === -1) {

        res.writeHead(404, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            mensaje: "Producto no encontrado."
        }));

        return;

    }

    const productoEliminado = productos.splice(indice, 1);

    res.writeHead(200, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
        mensaje: "Producto eliminado correctamente.",
        producto: productoEliminado[0]
    }));

}