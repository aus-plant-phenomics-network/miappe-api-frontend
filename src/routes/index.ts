import { DataFileRoutes } from "./dataFile";
import { InstitutionRoutes } from "./institution";
import { InvestigationRoutes } from "./investigation";
import { StaffRoutes } from "./staff";
import { StudyRoutes } from "./study";
import { VocabularyRoutes } from "./vocabulary";

const routes = [
  ...DataFileRoutes,
  ...InstitutionRoutes,
  ...InvestigationRoutes,
  ...StaffRoutes,
  ...StudyRoutes,
  ...VocabularyRoutes,
];

export { routes };
