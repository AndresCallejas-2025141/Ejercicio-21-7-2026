import { server } from "./server";

const PORT = 3000;

server.listen(PORT, () => {
  console.log("=================================");
  console.log(" Servidor iniciado correctamente ");
  console.log("=================================");
  console.log(`http://localhost:${PORT}`);
});