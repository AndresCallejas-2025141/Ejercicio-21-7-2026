export interface Cliente {
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
    direccion: string;
    estado: boolean;
}

export const clientes: Cliente[] = [
    {
        id: 1,
        nombre: "Juan",
        apellido: "Pérez",
        correo: "juan@gmail.com",
        telefono: "5555-1111",
        direccion: "Guatemala",
        estado: true
    },
    {
        id: 2,
        nombre: "María",
        apellido: "López",
        correo: "maria@gmail.com",
        telefono: "5555-2222",
        direccion: "Mixco",
        estado: true
    }
];