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
  trackid?: string;
  chanceid?: string;
}

export interface Image {
  data: string;
  width: number;
  height: number;
}

// the track type
export interface Track {
  _id?: string;
  postid: string;
  updates: [
    {
      date: Date;
      text: string;
    }
  ];
  post: Post;
  tel1: string;
  tel2: string;
  text: string;
}

// A type Chance
export interface Chance {
  _id?: string;
  postid: string;
  text: string;
  post: Post;
}
