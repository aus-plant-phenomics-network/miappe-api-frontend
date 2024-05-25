import { DataFileRoutes } from "./dataFile";
import { InstitutionRoutes } from "./institution";
import { InvestigationRoutes } from "./investigation";
import { StaffRoutes } from "./staff";
import { StudyRoutes } from "./study";
import { VocabularyRoutes } from "./vocabulary";
import { DeviceRoutes } from "./device";
import { UnitRoutes } from "./unit";
import { MethodRoutes } from "./method";
import { EnvironmentRoutes } from "./environment";
import { ExperimentalFactorRoutes } from "./experimentalFactor";

const routes = [
  ...DataFileRoutes,
  ...InstitutionRoutes,
  ...InvestigationRoutes,
  ...StaffRoutes,
  ...StudyRoutes,
  ...VocabularyRoutes,
  ...DeviceRoutes,
  ...UnitRoutes,
  ...MethodRoutes,
  ...EnvironmentRoutes,
  ...ExperimentalFactorRoutes,
];

export { routes };
