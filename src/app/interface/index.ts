export interface IStudentTable {
  user_id: string;
  username: string;
  firstName: string;
  lastName: string;
  mInitial: string;
  suffix: string;
  yearLevel: string;
  qr_code: string;
  actions: string;
}

export interface IRoleId {
  roleID: number;
  roleName: string;
}
