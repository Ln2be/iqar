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
  count: number;
  hash?: string;
  salt: string | "";
  _id?: string;
  id?: string;
  createdAt?: number;
  trust: number;
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
  price: number;
  tel: string;
  id?: string;
  createdAt?: Date;
  count: number;
  user: string;
  userTel: string;
  comparedTo?: string[];
  trackcount?: string;
  chancecount?: string;
  hidden?: boolean;
  archived?: boolean;
  sendTo: string[];
}

export interface Image {
  data: string;
  width: number;
  height: number;
}

// the track type
export interface Track {
  count: number;
  _id?: string;
  postid: string;
  updates: [
    {
      date: Date;
      text: string;
    }
  ];
  post: Post;
  name1: string;
  tel1: string;
  name2?: string;
  tel2?: string;
  text: string;
  archived: boolean;
}

// A type Chance
export interface Chance {
  count: number;
  _id?: string;
  postid: string;
  text: string;
  post: Post;
}
