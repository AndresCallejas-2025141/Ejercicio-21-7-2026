export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    categoria: string;
    estado: boolean;
}

export const productos: Producto[] = [
    {
        id: 1,
        nombre: "Laptop",
        descripcion: "Laptop Lenovo",
        precio: 5500,
        stock: 8,
        categoria: "Tecnología",
        estado: true
    },
    {
        id: 2,
        nombre: "Mouse",
        descripcion: "Mouse inalámbrico",
        precio: 120,
        stock: 25,
        categoria: "Accesorios",
        estado: true
    }
];