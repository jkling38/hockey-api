import app from "./app";
import dbConfig from "./config/database";
import appConfig from "./config/environment";

const { port, environment } = appConfig;

// @ts-ignore
const knexConfig = dbConfig[environment];

app.listen(port, () => {
    console.log(`Listening on port ${port} http://localhost:${port}/`);
});

