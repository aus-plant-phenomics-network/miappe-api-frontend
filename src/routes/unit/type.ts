import { SchemaElementType, BaseSchema } from "../../components";

class UnitType extends BaseSchema {
  name: SchemaElementType = { type: "text", required: true };
  unitReferenceId: SchemaElementType = {
    type: "select",
    required: true,
    labelKey: "unitType",
    fetcherKey: "vocabulary",
  };
  symbol: SchemaElementType = { type: "text" };
  alternativeSymbol: SchemaElementType = { type: "text" };
}

const UnitSchema = new UnitType();

export { UnitType, UnitSchema };
