export interface UserType {
  username: string;
  password: string;
  role: string;
  departement: string;
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
  _id: string;
  type: string;
  subtype: string;
  departement: string;
  region: string;
  details: string;
  images: [
    {
      data: string;
      width: number;
      height: number;
    }
  ];
  price: number;
  tel: string;
  id: string;
  createdAt: Date;
  count: number;
  user: string;
  userTel: string;
}
