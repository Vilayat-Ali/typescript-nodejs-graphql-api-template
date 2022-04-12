import express from 'express';
import cors from 'cors';
import consola from 'consola';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import { ApolloServer } from 'apollo-server-express';

dotenv.config(); // environment variables

// Connecting to mongodb
mongoose.connect(process.env.DB_URL!);

const db = mongoose.connection
db.once('open', _ => {
  consola.info({
      message: "Connected to MongoDB database 🚀",
      badge: true,
  });
});

db.on('error', err => {
    consola.fatal({
        message: `Error: ${err.message}`,
        badge: true,
    });
})

// importing graphql components 
import {typeDefs, resolvers} from "./graphql";

const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: ({ req, res}):any => ({ req, res})
});

apolloServer.start()
    .then(() => {

        // app config
        const port = Number(process.env.PORT || 6000);

        // instantiating the express app
        const app = express();
        app.use(cors());
        app.use(express.json());

        // passing middleware as middleware to the apolloServer 
        apolloServer.applyMiddleware({app});

        // express app listening
        app.listen(port, () => {
            consola.ready({
                message: `App rolling on port: ${port}`, 
                badge: true
            })
        })

    })
    .catch(err => {
        consola.error({
            message: err.message,
            badge: true
        })
    });