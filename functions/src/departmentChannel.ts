import { FieldValue, getFirestore } from 'firebase-admin/firestore'
import { onDocumentWritten } from 'firebase-functions/v2/firestore'

export const onDepartmentChannelMembersCollectionUpdated = onDocumentWritten(
  'departmentChannelMembers/{membershipId}',
  async (event) => {
    const firestore = getFirestore()

    if (!event.data?.before.exists || !event.data?.after.exists) {
      const channelId = (event.data?.before.data()?.channelId ||
        event.data?.after.data()?.channelId) as string

      await firestore.doc(`departmentChannels/${channelId}`).update({
        membersCount: event.data?.after.exists
          ? FieldValue.increment(1)
          : FieldValue.increment(-1),
      })
    }
  }
)

export const onDepartmentChannelMessagesCollectionUpdated = onDocumentWritten(
  'departmentChannels/{channelId}/messages/{messageId}',
  async (event) => {
    const firestore = getFirestore()

    if (!event.data?.before.exists || !event.data?.after.exists) {
      await firestore
        .doc(`departmentChannels/${event.params.channelId}`)
        .update({
          messagesCount: event.data?.after.exists
            ? FieldValue.increment(1)
            : FieldValue.increment(-1),
        })
    }
  }
)
