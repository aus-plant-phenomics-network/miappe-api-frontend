import { DataFileType, DataFileSchema } from "./dataFile.types";
import { createPages } from "../../components/factory/page";

const schema: DataFileSchema = (await import("./data.json")).default;

const [DataFileList, DataFileCreate, DataFileUpdate] =
  createPages<DataFileType>("dataFile", schema, ["title", "description"]);

export { DataFileCreate, DataFileList, DataFileUpdate };
