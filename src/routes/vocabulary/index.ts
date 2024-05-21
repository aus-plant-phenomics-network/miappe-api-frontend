import { VocabularySchema } from "./type";
import { createRoutes } from "../../handlers/factory";

const VocabularyRoutes = createRoutes(VocabularySchema, "vocabulary");

export { VocabularyRoutes };
