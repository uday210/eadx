declare module "@salesforce/apex/ApexSAQLQueryController.execQuery" {
  export default function execQuery(param: {queryName: any}): Promise<any>;
}
declare module "@salesforce/apex/ApexSAQLQueryController.getQuery" {
  export default function getQuery(param: {queryName: any}): Promise<any>;
}
declare module "@salesforce/apex/ApexSAQLQueryController.updateQuery" {
  export default function updateQuery(param: {queryName: any, saql: any}): Promise<any>;
}
