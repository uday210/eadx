declare module "@salesforce/apex/QuipDemoController.getURL" {
  export default function getURL(param: {url: any}): Promise<any>;
}
declare module "@salesforce/apex/QuipDemoController.getList" {
  export default function getList(param: {type: any, ids: any}): Promise<any>;
}
declare module "@salesforce/apex/QuipDemoController.getUsers" {
  export default function getUsers(param: {ids: any}): Promise<any>;
}
declare module "@salesforce/apex/QuipDemoController.getFolders" {
  export default function getFolders(param: {ids: any}): Promise<any>;
}
declare module "@salesforce/apex/QuipDemoController.getThreads" {
  export default function getThreads(param: {ids: any}): Promise<any>;
}
declare module "@salesforce/apex/QuipDemoController.getBlob" {
  export default function getBlob(param: {threadId: any, blobId: any}): Promise<any>;
}
declare module "@salesforce/apex/QuipDemoController.getRecentThreads" {
  export default function getRecentThreads(): Promise<any>;
}
