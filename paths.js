import * as tsconfigPaths from "tsconfig-paths";
import * as tsconfig from "./tsconfig";

const baseUrl = tsconfig.compilerOptions.baseUrl;
const paths = tsconfig.compilerOptions.paths;

tsconfigPaths.register({
  baseUrl,
  paths,
});
