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
  type: String;
  departement: String;
  region: String;
  details: String;
  images: [
    {
      data: String;
      width: Number;
      height: Number;
    }
  ];
  price: Number;
  tel: String;
  id: String;
  createdAt: Date;
  count: Number;
}
