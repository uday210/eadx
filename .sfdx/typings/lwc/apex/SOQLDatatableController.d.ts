declare module "@salesforce/apex/SOQLDatatableController.execQuery" {
  export default function execQuery(param: {query: any, fields: any}): Promise<any>;
}
declare module "@salesforce/apex/SOQLDatatableController.listObjects" {
  export default function listObjects(param: {fields: any, whereClause: any}): Promise<any>;
}
