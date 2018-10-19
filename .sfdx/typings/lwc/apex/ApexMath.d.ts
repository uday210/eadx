declare module "@salesforce/apex/ApexMath.doCalc" {
  export default function doCalc(param: {d: any, exp: any, count: any}): Promise<any>;
}
declare module "@salesforce/apex/ApexMath.doStr" {
  export default function doStr(param: {target: any, match: any, count: any}): Promise<any>;
}
