import ExpressConfig from "./express/express.config";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema";

class App {
  constructor() {
    this.initFunction();
  }
  private app = ExpressConfig();
  private PORT = process.env.PORT || 4000;
  initFunction = () => {
    this.app.use(
      "/graphql",
      graphqlHTTP({
        schema,
        graphiql: true,
      })
    );

    this.app.listen(this.PORT, () =>
      console.log("Server Running on Port " + this.PORT)
    );
  };
}

export default new App();
