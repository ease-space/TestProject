export interface Comment {
  id: string;
  timestamp: number;
  avatar: string | null;
  user_name: string;
  email: string;
  text: string;
  parentId: string | null;
}
