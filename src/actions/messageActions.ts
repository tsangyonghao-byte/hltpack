"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/adminAuth";
import { getAdminActionText } from "./adminActionText";

const MESSAGE_STATUSES = ["new", "in_progress", "quoted", "won", "lost"] as const;
const getAdminActor = () => process.env.ADMIN_USER?.trim() || "Admin";

async function createMessageLog(
  tx: {
    messageActivityLog: {
      create: typeof prisma.messageActivityLog.create;
    };
  },
  messageId: string,
  action: string,
  details?: string,
) {
  await tx.messageActivityLog.create({
    data: {
      messageId,
      action,
      actor: getAdminActor(),
      details: details || null,
    },
  });
}

async function createManyMessageLogs(
  tx: {
    messageActivityLog: {
      createMany: typeof prisma.messageActivityLog.createMany;
    };
  },
  ids: string[],
  action: string,
  details?: string,
) {
  if (!ids.length) return;
  await tx.messageActivityLog.createMany({
    data: ids.map((messageId) => ({
      messageId,
      action,
      actor: getAdminActor(),
      details: details || null,
    })),
  });
}

export async function deleteMessage(id: string) {
  await requireAdminSession();
  const text = await getAdminActionText();
  try {
    await prisma.message.delete({
      where: { id },
    });
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete message:", error);
    return { success: false, error: text.deleteMessageFailed };
  }
}

export async function deleteMessages(ids: string[]) {
  await requireAdminSession();
  const text = await getAdminActionText();

  try {
    if (!ids.length) {
      return { success: false, error: text.deleteMessagesFailed };
    }

    const result = await prisma.message.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    revalidatePath("/admin/messages");
    return { success: true, count: result.count };
  } catch (error) {
    console.error("Failed to delete selected messages:", error);
    return { success: false, error: text.deleteMessagesFailed };
  }
}

export async function markMessageAsRead(id: string) {
  await requireAdminSession();
  const text = await getAdminActionText();
  try {
    await prisma.$transaction(async (tx) => {
      await tx.message.update({
        where: { id },
        data: { isRead: true },
      });
      await createMessageLog(tx, id, "marked_read");
    });
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error) {
    console.error("Failed to update message status:", error);
    return { success: false, error: text.updateMessageStatusFailed };
  }
}

export async function markMessagesAsRead(ids: string[]) {
  await requireAdminSession();
  const text = await getAdminActionText();

  try {
    if (!ids.length) {
      return { success: false, error: text.updateMessagesStatusFailed };
    }

    const result = await prisma.message.updateMany({
      where: {
        id: { in: ids },
      },
      data: {
        isRead: true,
      },
    });
    await createManyMessageLogs(prisma, ids, "bulk_marked_read");

    revalidatePath("/admin/messages");
    return { success: true, count: result.count };
  } catch (error) {
    console.error("Failed to update selected message statuses:", error);
    return { success: false, error: text.updateMessagesStatusFailed };
  }
}

export async function updateMessageStatus(id: string, status: string) {
  await requireAdminSession();
  const text = await getAdminActionText();

  if (!MESSAGE_STATUSES.includes(status as (typeof MESSAGE_STATUSES)[number])) {
    return { success: false, error: text.invalidMessageStatus };
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.message.update({
        where: { id },
        data: {
          status,
          isRead: true,
        },
      });
      await createMessageLog(tx, id, "status_updated", `Status -> ${status}`);
    });
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error) {
    console.error("Failed to update message workflow status:", error);
    return { success: false, error: text.updateMessageStatusFailed };
  }
}

export async function updateMessagesStatus(ids: string[], status: string) {
  await requireAdminSession();
  const text = await getAdminActionText();

  if (!ids.length) {
    return { success: false, error: text.updateMessagesStatusFailed };
  }

  if (!MESSAGE_STATUSES.includes(status as (typeof MESSAGE_STATUSES)[number])) {
    return { success: false, error: text.invalidMessageStatus };
  }

  try {
    const result = await prisma.message.updateMany({
      where: {
        id: { in: ids },
      },
      data: {
        status,
        isRead: true,
      },
    });
    await createManyMessageLogs(prisma, ids, "bulk_status_updated", `Status -> ${status}`);
    revalidatePath("/admin/messages");
    return { success: true, count: result.count };
  } catch (error) {
    console.error("Failed to update selected message workflow statuses:", error);
    return { success: false, error: text.updateMessagesStatusFailed };
  }
}

export async function updateMessageNote(id: string, internalNote: string) {
  await requireAdminSession();
  const text = await getAdminActionText();

  try {
    await prisma.$transaction(async (tx) => {
      await tx.message.update({
        where: { id },
        data: {
          internalNote: internalNote.trim() || null,
          isRead: true,
        },
      });
      await createMessageLog(tx, id, "note_updated", internalNote.trim() || "Note cleared");
    });
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error) {
    console.error("Failed to update message note:", error);
    return { success: false, error: text.updateMessageNoteFailed };
  }
}

export async function updateMessageAssignment(id: string, assignedTo: string, followUpAt: string) {
  await requireAdminSession();
  const text = await getAdminActionText();

  try {
    await prisma.$transaction(async (tx) => {
      await tx.message.update({
        where: { id },
        data: {
          assignedTo: assignedTo.trim() || null,
          followUpAt: followUpAt ? new Date(followUpAt) : null,
          isRead: true,
        },
      });
      await createMessageLog(
        tx,
        id,
        "assignment_updated",
        `Owner -> ${assignedTo.trim() || "Unassigned"}; Follow-up -> ${followUpAt || "Not set"}`,
      );
    });
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error) {
    console.error("Failed to update message assignment:", error);
    return { success: false, error: text.updateMessageOwnerFailed };
  }
}

export async function updateMessagesAssignedTo(ids: string[], assignedTo: string) {
  await requireAdminSession();
  const text = await getAdminActionText();

  if (!ids.length) {
    return { success: false, error: text.updateMessagesOwnerFailed };
  }

  try {
    const result = await prisma.message.updateMany({
      where: {
        id: { in: ids },
      },
      data: {
        assignedTo: assignedTo.trim() || null,
        isRead: true,
      },
    });
    await createManyMessageLogs(
      prisma,
      ids,
      "bulk_owner_updated",
      `Owner -> ${assignedTo.trim() || "Unassigned"}`,
    );
    revalidatePath("/admin/messages");
    return { success: true, count: result.count };
  } catch (error) {
    console.error("Failed to update selected message owners:", error);
    return { success: false, error: text.updateMessagesOwnerFailed };
  }
}

export async function updateMessagesFollowUpAt(ids: string[], followUpAt: string) {
  await requireAdminSession();
  const text = await getAdminActionText();

  if (!ids.length) {
    return { success: false, error: text.updateMessagesFollowUpFailed };
  }

  try {
    const result = await prisma.message.updateMany({
      where: {
        id: { in: ids },
      },
      data: {
        followUpAt: followUpAt ? new Date(followUpAt) : null,
        isRead: true,
      },
    });
    await createManyMessageLogs(
      prisma,
      ids,
      "bulk_followup_updated",
      `Follow-up -> ${followUpAt || "Not set"}`,
    );
    revalidatePath("/admin/messages");
    return { success: true, count: result.count };
  } catch (error) {
    console.error("Failed to update selected follow-up times:", error);
    return { success: false, error: text.updateMessagesFollowUpFailed };
  }
}
