import { IncomingMessage } from "http";

export function obtenerBody(req: IncomingMessage): Promise<any> {

    return new Promise((resolve, reject) => {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {

            try {

                const datos = JSON.parse(body);

                resolve(datos);

            } catch {

                reject("JSON inválido");

            }

        });

    });

}