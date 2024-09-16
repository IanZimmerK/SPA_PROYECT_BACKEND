import serverHTTP from "./server";
import env from "./config/envs";
import dbConfig from "./config/dbConfig";
import { AgregarServiciosPredeterminados } from "./controllers/servicesController";

dbConfig()
  .then(() => {
    serverHTTP.listen(env.PORT, () => {
      console.log(`Server listening on port ${env.PORT}`);
      AgregarServiciosPredeterminados();
    });
  })
  .catch((error) => {
    console.error("Error starting server:", error);
  });
