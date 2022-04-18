import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import consola from 'consola';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import {verify} from "jsonwebtoken";
import { ApolloServer, AuthenticationError } from 'apollo-server-express';

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
    context: ({req}) => {
        const headers = req.headers['authorization'];
        const token = headers && headers.split(" ")[1];
        if(token){
            const user = verify(token, process.env.ACCESS_TOKEN_SECRET!);
            if (!user) throw new AuthenticationError('Login Required');
            return {user}
        }
    },
    introspection: true,
});

apolloServer.start()
    .then(() => {

        // app config
        const port = Number(process.env.PORT || 6000);

        // instantiating the express app
        const app = express();
        app.use(cors());
        app.use(helmet());
        app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
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