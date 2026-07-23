const http = require("http");

const server = http.createServer((request, response) => {
  if (request.url === "/") {
    response.setHeader("Content-Type", "application/json");

    response.end(
      JSON.stringify({
        message: "Bienvenido a Finanzas App",
        app: "finanzas-app",
      }),
    );
  } else if (request.url === "/movements") {
    const movements = [
      {
        description: "Mercado",
        amount: 250000,
        type: "expense",
      },
      {
        description: "Salario",
        amount: 2000000,
        type: "income",
      },
    ];

    response.setHeader("Content-Type", "application/json");

    response.end(JSON.stringify(movements));
  } else {
    response.end("Ruta no encontrada");
  }
});

server.listen(3000, () => {
  console.log("Servidor ejecutándose en http://localhost:3000");
});
