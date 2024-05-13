// import { createHandlers, createLoaderAction } from "../../handlers";
// import { DataFileType, DataFileSchema } from "./dataFile.types";

// const DATAFILE_URL = "http://127.0.0.1:8000/data_file";

// const schema: DataFileSchema = (await import("./data.json")).default;

// const dataFileHandlers = createHandlers<DataFileType>(DATAFILE_URL);

// const LoaderAction = createLoaderAction<DataFileType, "dataFileId">(
//   dataFileHandlers,
//   schema,
//   "dataFileId",
//   "/dataFile",
//   "/dataFile",
//   "/dataFile",
// );

// export { LoaderAction as DataFileActions };
