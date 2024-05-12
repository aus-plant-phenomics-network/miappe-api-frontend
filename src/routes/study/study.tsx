import { StudyType } from "./study.types";
import { StudySchema } from "./study.types";
import { createPages } from "../../components/factory/page";

const schema: StudySchema = (await import("./data.json")).default;

const [StudyList, StudyCreate, StudyUpdate] = createPages<StudyType>(
  "study",
  schema,
  ["title", "description", "startDate"]
);

export { StudyCreate, StudyList, StudyUpdate };
