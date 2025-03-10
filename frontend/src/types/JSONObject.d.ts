type JSONObject = { [key: string]: JSONValue; };
type JSONValue = boolean | string | number | JSONObject | Array<JSONValue> | null;