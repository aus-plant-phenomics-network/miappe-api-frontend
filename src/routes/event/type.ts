import { SchemaElementType, BaseSchema } from "../../components";

class EventType extends BaseSchema {
  title: SchemaElementType = { type: "text", required: true };
  description: SchemaElementType = { type: "text" };
  eventDate: SchemaElementType = { type: "date", required: true };
  eventTypeId: SchemaElementType = {
    type: "select",
    required: true,
    labelKey: "eventType",
    fetcherKey: "vocabulary",
  };
  observationUnitId: SchemaElementType = {
    type: "select",
    fetcherKey: "observationUnit",
    labelKey: "observationUnit",
    multiple: true,
  };
  studyId: SchemaElementType = {
    type: "select",
    multiple: true,
    required: true,
    labelKey: "study",
    fetcherKey: "study",
  };
}

const EventSchema = new EventType();

export { EventType, EventSchema };
