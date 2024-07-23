"use client";

import { RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import Loader from "./Loader";
import Header from "./Header";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Editor } from "./editor/Editor";
import ActiveCollaborators from "./ActiveCollaborators";

const CollaborativeRoom = ({ roomId, roomMetadata }) => {
  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">
          <Header className="sticky left-0 top-0">
            <div className="flex items-center gap-2 lg:gap-4">Share</div>
            <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
              <ActiveCollaborators />
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Header>
          <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
