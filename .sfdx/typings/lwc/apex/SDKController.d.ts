declare module "@salesforce/apex/SDKController.getSObjectNames" {
  export default function getSObjectNames(): Promise<any>;
}
declare module "@salesforce/apex/SDKController.getUsers" {
  export default function getUsers(): Promise<any>;
}
declare module "@salesforce/apex/SDKController.getFieldValues" {
  export default function getFieldValues(param: {sobjectName: any, fieldName: any}): Promise<any>;
}
declare module "@salesforce/apex/SDKController.getPicklistValues" {
  export default function getPicklistValues(param: {sobjectName: any, fieldName: any}): Promise<any>;
}
