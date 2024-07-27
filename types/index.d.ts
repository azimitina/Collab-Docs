declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
declare type HeaderProps = {
  children: React.ReactNode;
  className?: string;
};

declare type UserType = "creator" | "editor" | "viewer";

declare type CreateDocumentParams = {
  userId: string;
  email: string;
};

declare type RoomAccesses = Record<string, AccessType>;

declare type AddDocumentBtnProps = {
  userId: string;
  email: string;
};

declare type CollaborativeRoomProps = {
  roomId: string;
  roomMetadata: RoomMetadata;
  users: User[];
  currentUserType: UserType;
};

declare type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  color: string;
  userType?: UserType;
};

declare type ThreadWrapperProps = { thread: ThreadData<BaseMetadata> };
