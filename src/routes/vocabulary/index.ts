import { VocabularySchema } from "./type";
import { createRoutes } from "../../factory/factory";

const VocabularyRoutes = createRoutes(VocabularySchema, "vocabulary");

export { VocabularyRoutes };
