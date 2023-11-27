import { buildApp } from "./app";

const startServer = async () => {
  const app = buildApp();

  try {
    app.listen({ port: 3000 }, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server listening at ${address}`);
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

startServer();
