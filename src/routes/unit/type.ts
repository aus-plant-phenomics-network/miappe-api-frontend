import { SchemaElementType, BaseSchema } from "../../components";

class UnitType extends BaseSchema {
  unitTypeId: SchemaElementType = {
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
