import startServices from "./config/start.services.js";
import { app } from "./app.js";

startServices()
  .then(() => {
    app.listen(3000, () => {
      console.log(`Server running on port http://localhost:3000`);
    });
    console.log("Started services");
  })
  .catch((error) => {
    console.error("Error starting services in index: ", error);
  });
