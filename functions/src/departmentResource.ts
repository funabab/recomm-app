import { FieldValue, getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'
import {
  onDocumentDeleted,
  onDocumentWritten,
} from 'firebase-functions/v2/firestore'

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

export const onDepartmentDepartmentResourceCollectionDelete = onDocumentDeleted(
  'departmentResources/{resourceId}',
  async (event) => {
    const storage = getStorage()

    const referencedFile = storage
      .bucket()
      .file(event.data?.data().uploadFilePath)
    await referencedFile.delete()
  }
)
