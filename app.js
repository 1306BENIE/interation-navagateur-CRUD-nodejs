const http = require("http");
const fileSystem = require("fs");

const server = http.createServer((req, res) => {
  const { url } = req;

  if (url === "/create") {
    createTask(res);
  } else if (url === "/read") {
    // Créer une nouvelle tâche
    readTask(res);
  } else if (url === "/update") {
    // Mettre à jour une tâche
    updateTask(res);
  } else if (url === "/delete") {
    // Supprimer une tâche
    deleteTask(res);
  } else {
    // Route non trouvée
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route non trouvée" }));
  }
});

const createTask = (res) => {
  fileSystem.writeFile("task.txt", "Premiere tache ajoute", (err) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Route non trouvée" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Tâche créée avec succès" }));
    }
  });
};
const readTask = (res) => {
  fileSystem.readFile("task.txt", "utf8", (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Route non trouvée" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ data }));
    }
  });
};
const updateTask = (res) => {
  fileSystem.appendFile(
    "task.txt",
    "\nNouvelle tache ajoute",
    "utf8",
    (error) => {
      if (error) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "La mise à jour a échoué" }));
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "Mise à jour du fichier effectuée avec succès",
          })
        );
      }
    }
  );
};
const deleteTask = (res) => {
  fileSystem.unlink("task.txt", (error) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "La suppression a échoué" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Fichier supprimé avec succès",
        })
      );
    }
  });
};

server.listen(3000, () => {
  console.log("Serveur démarré sur http://localhost:3000");
});
