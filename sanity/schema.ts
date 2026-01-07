import { type SchemaTypeDefinition } from "sanity";
import { posts } from "./posts";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ posts],
};
