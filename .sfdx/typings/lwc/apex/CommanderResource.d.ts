declare module "@salesforce/apex/CommanderResource.commander" {
  export default function commander(param: {commandPhrase: any, statusParam: any, limitParam: any}): Promise<any>;
}
