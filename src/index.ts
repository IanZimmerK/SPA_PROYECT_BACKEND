import serverHTTP from "./server";
import env from "./config/envs";
import dbConfig from "./config/dbConfig";

dbConfig()
  .then(() => {
    serverHTTP.listen(env.PORT, () => {
      console.log(`Server listening on port ${env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error starting server:", error);
  });
