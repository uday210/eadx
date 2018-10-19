declare module "@salesforce/apex/ApexTwitterUtils.fireEvent" {
  export default function fireEvent(param: {type: any, target: any, payload: any}): Promise<any>;
}
declare module "@salesforce/apex/ApexTwitterUtils.getAppRateLimit" {
  export default function getAppRateLimit(param: {resources: any}): Promise<any>;
}
declare module "@salesforce/apex/ApexTwitterUtils.updateApexStepList" {
  export default function updateApexStepList(param: {name: any, items: any}): Promise<any>;
}
declare module "@salesforce/apex/ApexTwitterUtils.deleteApexStepList" {
  export default function deleteApexStepList(param: {name: any, items: any}): Promise<any>;
}
declare module "@salesforce/apex/ApexTwitterUtils.listApexStepLists" {
  export default function listApexStepLists(): Promise<any>;
}
declare module "@salesforce/apex/ApexTwitterUtils.getApexStepListItems" {
  export default function getApexStepListItems(param: {name: any}): Promise<any>;
}
declare module "@salesforce/apex/ApexTwitterUtils.getApexStepList" {
  export default function getApexStepList(param: {name: any}): Promise<any>;
}
