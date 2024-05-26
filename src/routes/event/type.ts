import { SchemaElementType, BaseSchema } from "../../components";

class EventType extends BaseSchema {
  observationUnitId: SchemaElementType = {
    type: "select",
    fetcherKey: "observationUnit",
    labelKey: "observationUnit",
  };
  eventTypeId: SchemaElementType = {
    type: "select",
    required: true,
    labelKey: "eventType",
    fetcherKey: "vocabulary",
  };
  date: SchemaElementType = {
    type: "date",
    labelKey: "eventDate",
  };
}

const EventSchema = new EventType();

export { EventType, EventSchema };
