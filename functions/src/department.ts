import { FieldValue, getFirestore } from 'firebase-admin/firestore'
import { onDocumentWritten } from 'firebase-functions/v2/firestore'
import { DepartmentMembership } from '../../src/typings'

export const onDepartmentMembersCollectionUpdated = onDocumentWritten(
  'departmentMembers/{membershipId}',
  async (event) => {
    const firestore = getFirestore()
    const userId = (event.data?.after.data()?.userId ||
      event.data?.before.data()?.userId) as string

    console.log(
      'calling onDepartmentMembersCollectionUpdated function with event',
      event
    )

    if (!event.data?.before.exists || !event.data.after.exists) {
      const departmentId = (event.data?.before.data()?.departmentId ||
        event.data?.after.data()?.departmentId) as string

      await firestore.doc(`departments/${departmentId}`).update({
        membersCount: event.data?.after.exists
          ? FieldValue.increment(1)
          : FieldValue.increment(-1),
      })
    }

    const memberships = await firestore
      .collection('departmentMembers')
      .where('userId', '==', userId)
      .get()

    await firestore.doc(`users/${userId}`).set(
      {
        memberships: memberships.docs.map((membership) => {
          const membershipData = membership.data() as DepartmentMembership
          return {
            departmentTitle: membershipData.departmentTitle,
            departmentId: membershipData.departmentId,
            role: membershipData.userRole,
          }
        }),
      },
      {
        merge: true,
      }
    )
  }
)
