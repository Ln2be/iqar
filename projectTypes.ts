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
  price: number;
  tel: string;
  id?: string;
  createdAt?: Date;
  count?: number;
  user: string;
  userTel: string;
  comparedTo?: string[];
  trackid?: string;
  chanceid?: string;
  hidden?: boolean;
  archived?: boolean;
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
  name1: string;
  tel1: string;
  name2?: string;
  tel2?: string;
  text: string;
  archived: boolean;
}

// A type Chance
export interface Chance {
  _id?: string;
  postid: string;
  text: string;
  post: Post;
}
