export interface UserType {
  username: string;
  password: string;
  role: string;
  departement: string;
  departements: string[];
  region: string;
  tel: string;
  code: string;
  count: string;
  hash?: string;
  salt: string | "";
  _id?: string;
  id?: string;
  createdAt?: number;
}

export interface Post {
  _id?: string;
  type: string;
  subtype: string;
  departement: string;
  departements: string[];
  region: string;
  details: string;
  images: Image[];
  price: string;
  tel: string;
  id?: string;
  createdAt?: Date;
  count?: number;
  user: string;
  userTel: string;
  comparedTo?: string[];
}

export interface Image {
  data: string;
  width: number;
  height: number;
}
