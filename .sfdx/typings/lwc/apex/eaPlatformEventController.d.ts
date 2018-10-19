declare module "@salesforce/apex/eaPlatformEventController.fireEvent" {
  export default function fireEvent(param: {type: any, target: any, payload: any}): Promise<any>;
}
