declare module "@salesforce/apex/UserRoleController.getUserRoles" {
  export default function getUserRoles(): Promise<any>;
}
declare module "@salesforce/apex/UserRoleController.getUsersInRole" {
  export default function getUsersInRole(param: {roleName: any}): Promise<any>;
}
declare module "@salesforce/apex/UserRoleController.getRoleSubordinateUsers" {
  export default function getRoleSubordinateUsers(param: {userId: any}): Promise<any>;
}
