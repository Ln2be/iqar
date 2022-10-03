export interface UserType {
  activity: number;
  username: string;
  password: string;
  role: string;
  departement: string;
  departements: string[];
  region: string;
  tel: string;
  code: string;
  hash?: string;
  salt: string | "";
  _id?: string;
  id?: string;
  createdAt?: number;
  trust: number;
  lastNotified: number;
}

export interface Post {
  facelink: string;
  _id?: string;
  type: string;
  subtype: string;
  departement: string;
  departements: string[];
  region: string;
  details: string;
  images: Image[];
  price: number;
  tel: string;
  id?: string;
  createdAt?: Date;
  user: string;
  userTel: string;
  comparedTo?: string[];
  hidden?: boolean;
  archived?: boolean;
  sendTo: string[];
  sendToArchive: string[];
  periority: number;
}

export interface Image {
  data: string;
  width: number;
  height: number;
}



