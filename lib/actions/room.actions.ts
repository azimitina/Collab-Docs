"use server";

import { nanoid } from "nanoid";
import { liveblocks } from "../liveblocks";
import { revalidatePath } from "next/cache";
import { getAccessType, parseStringify } from "../utils";

export const createDocument = async ({
  userId,
  email,
}: CreateDocumentParams) => {
  const roomId = nanoid();

  try {
    const metadata = {
      creatorId: userId,
      email,
      title: "Untitled",
    };

    const usersAccesses: RoomAccesses = {
      [email]: ["room:write"],
    };

    const room = await liveblocks.createRoom(roomId, {
      defaultAccesses: [],
      usersAccesses,
      metadata,
    });

    revalidatePath("/");

    return parseStringify(room);
  } catch (err) {
    console.log(`An error occurred while creating a room: ${err}`);
  }
};

export const getDocument = async ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const hasAccess = Object.keys(room.usersAccesses).includes(userId);

    if (!hasAccess) {
      throw new Error(
        "Access to this document is not permitted for the current user"
      );
    }

    return parseStringify(room);
  } catch (error) {
    console.log(`Error happened while getting a room: ${error}`);
  }
};

export const updateDocumentTitle = async (roomId: string, title: string) => {
  try {
    const updatedRoomTitle = await liveblocks.updateRoom(roomId, {
      metadata: {
        title,
      },
    });

    revalidatePath(`/documents/${roomId}`);

    return parseStringify(updatedRoomTitle);
  } catch (error) {
    console.log(`Error happened while updating a room title: ${error}`);
  }
};

export const getAllDocuments = async (email: string) => {
  try {
    const rooms = await liveblocks.getRooms({ userId: email });

    // const hasAccess = Object.keys(room.usersAccesses).includes(userId);

    // if (!hasAccess) {
    //   throw new Error(
    //     "Access to this document is not permitted for the current user"
    //   );
    // }

    return parseStringify(rooms);
  } catch (error) {
    console.log(`Error happened while getting all rooms: ${error}`);
  }
};

export const updateDocumentAccess = async ({
  roomId,
  email,
  userType,
  updatedBy,
}: ShareDocumentParams) => {
  try {
    const usersAccesses: RoomAccesses = {
      [email]: getAccessType(userType) as AccessType,
    };

    const room = await liveblocks.updateRoom(roomId, {
      usersAccesses,
    });

    if (room) {
      console.log("add it later");
    }

    revalidatePath(`/documents/${roomId}`);
    return parseStringify(room);
  } catch (error) {
    console.log(`Error happened while updating a room access: ${error}`);
  }
};

export const removeCollaborator = async ({
  roomId,
  email,
}: {
  roomId: string;
  email: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    if (room.metadata.email === email) {
      throw new Error(
        "You are the owner. You cannot remove yourself from the document"
      );
    }

    const updatedRoom = await liveblocks.updateRoom(roomId, {
      usersAccesses: {
        [email]: null,
      },
    });

    revalidatePath(`/documents/${roomId}`);
    return parseStringify(updatedRoom);
  } catch (error) {
    console.log(`Error happened while removing a collaborator: ${error}`);
  }
};
