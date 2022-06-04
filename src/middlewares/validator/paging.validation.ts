import {query} from "express-validator";


export function PagingRules() {
  return [
    query("limit").isNumeric().toInt().optional(),
    query("start").isDate().toDate().optional(),
    query("end").isNumeric().toDate().optional(),
  ];
}

