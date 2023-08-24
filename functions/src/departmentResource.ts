import { FieldValue, getFirestore } from 'firebase-admin/firestore'
import { onDocumentWritten } from 'firebase-functions/v2/firestore'

export const onDepartmentDepartmentResourceCollectionUpdated =
  onDocumentWritten('departmentResources/{resourceId}', async (event) => {
    const firestore = getFirestore()

    if (!event.data?.before.exists || !event.data?.after.exists) {
      const departmentId = (event.data?.before.data()?.uploadUserDepartmentId ||
        event.data?.after.data()?.uploadUserDepartmentId) as string

      await firestore.doc(`departments/${departmentId}`).update({
        resourcesCount: event.data?.after.exists
          ? FieldValue.increment(1)
          : FieldValue.increment(-1),
      })
    }
  })
