declare module "@salesforce/apex/FortniteAPIController.getPlayers" {
  export default function getPlayers(): Promise<any>;
}
declare module "@salesforce/apex/FortniteAPIController.getPlayerInfo2" {
  export default function getPlayerInfo2(param: {username: any, refresh: any}): Promise<any>;
}
declare module "@salesforce/apex/FortniteAPIController.getPlayerData2" {
  export default function getPlayerData2(param: {username: any, platform: any, window: any, refresh: any}): Promise<any>;
}
declare module "@salesforce/apex/FortniteAPIController.getPlayerInfo" {
  export default function getPlayerInfo(param: {username: any, refresh: any}): Promise<any>;
}
declare module "@salesforce/apex/FortniteAPIController.getPlayerData" {
  export default function getPlayerData(param: {userId: any, platform: any, window: any, refresh: any}): Promise<any>;
}
declare module "@salesforce/apex/FortniteAPIController.getStore" {
  export default function getStore(param: {refresh: any}): Promise<any>;
}
