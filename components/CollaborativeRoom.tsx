"use client";

import { RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import Loader from "./Loader";
import Header from "./Header";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Editor } from "./editor/Editor";

const CollaborativeRoom = () => {
  return (
    <RoomProvider id="my-room">
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">
          <Header className="sticky left-0 top-0">
            <div className="flex items-center gap-2 lg:gap-4">Share</div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Header>
          <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
