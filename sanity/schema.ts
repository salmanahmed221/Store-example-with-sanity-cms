import { type SchemaTypeDefinition } from "sanity";
import { posts } from "./posts";
import { news } from "./news";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [posts, news],
};
