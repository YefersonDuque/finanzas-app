const http = require("http");
const fs = require("fs");

const movementsFile = "./data/movements.json";

const movementsData = fs.readFileSync(movementsFile, "utf-8");

const movements = JSON.parse(movementsData);

let nextId = movements.length + 1;

function generateId() {
  const id = nextId;

  nextId++;

  return id;
}

function saveMovements() {
  const movementsData = JSON.stringify(movements, null, 2);

  fs.writeFileSync(movementsFile, movementsData);
}

const server = http.createServer((request, response) => {
  if (request.url === "/movements" && request.method === "POST") {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
    });

    request.on("end", () => {
      const movementData = JSON.parse(body);

      const movement = {
        id: generateId(),
        ...movementData,
        date: new Date(),
      };

      movements.push(movement);

      saveMovements();

      console.log("Movimiento agregado:");
      console.log(movement);

      response.end("Movimiento agregado correctamente");
    });

    return;
  }

  if (request.url === "/") {
    response.setHeader("Content-Type", "application/json");

    response.end(
      JSON.stringify({
        message: "Bienvenido a Finanzas App",
        app: "finanzas-app",
      }),
    );

    return;
  }
  if (request.url.startsWith("/movements/") && request.method === "GET") {
    const urlParts = request.url.split("/");

    const movementId = Number(urlParts[2]);

    const movement = movements.find((movement) => {
      return movement.id === movementId;
    });

    if (!movement) {
      response.statusCode = 404;
      response.end("Movimiento no encontrado");
      return;
    }

    response.setHeader("Content-Type", "application/json");

    response.end(JSON.stringify(movement));

    return;
  } else if (request.url === "/movements" && request.method === "GET") {
    response.setHeader("Content-Type", "application/json");

    response.end(JSON.stringify(movements));
  } else {
    response.end("Ruta no encontrada");
  }
});

server.listen(3000, () => {
  console.log("Servidor ejecutándose en http://localhost:3000");
});
