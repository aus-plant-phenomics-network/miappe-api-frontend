import { VocabularySchema } from "./type";
import { createRoutes } from "../../factory";

const VocabularyRoutes = createRoutes(VocabularySchema, "vocabulary", [
  "title",
  "namespace",
]);

export { VocabularyRoutes };
