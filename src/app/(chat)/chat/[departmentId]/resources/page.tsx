'use client'

import { useTransition } from 'react'
import { BsFiles, BsTrash } from 'react-icons/bs'
import FileUploader from './_components/FileUploader'
import { ProcessServerConfigFunction } from 'filepond'
import { useUser } from '@/app/_components/AuthProtect'
import { useDepartmentValues } from '@/app/(chat)/_components/DepertmentProvider'
import { firebaseFirestore, firebaseStorage } from '@/firebase/client'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { deleteDoc } from 'firebase/firestore'
import mime from 'mime-types'
import dayjs from 'dayjs'
import {
  collection,
  doc,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore'
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore'
import {
  departmentConverter,
  departmentResourceConverter,
} from '@/firebase/converters'
import { BiLinkExternal } from 'react-icons/bi'
import { num } from '@/utils/commons'
import prettyBytes from 'pretty-bytes'
import { toast } from 'react-hot-toast'

export default function ResourcePage() {
  const user = useUser()
  const [isPendingDeleteTransition, startDeleteTransition] = useTransition()
  const { currentDepartment } = useDepartmentValues()
  const [department] = useDocumentData(
    currentDepartment
      ? doc(
          firebaseFirestore,
          `departments/${currentDepartment.id}`
        ).withConverter(departmentConverter)
      : null
  )
  const [departmentResources] = useCollectionData(
    currentDepartment
      ? query(
          collection(firebaseFirestore, 'departmentResources'),
          where('uploadUserDepartmentId', '==', currentDepartment.id)
        ).withConverter(departmentResourceConverter)
      : null
  )

  const handleUpload: ProcessServerConfigFunction = (
    _fieldname,
    file,
    _metadata,
    load,
    error,
    progress
  ) => {
    const ext = mime.extension(file.type)
    const fileDoc = doc(collection(firebaseFirestore, 'departmentResources'))

    const fileRef = ref(
      firebaseStorage,
      `resources/${currentDepartment?.id}/${fileDoc.id}.${ext}`
    )
    const access = 'private'

    const uploadTask = uploadBytesResumable(fileRef, file, {
      contentType: file.type,
      customMetadata: {
        access,
        uploadUserDepartmentId: currentDepartment!.id,
      },
    })

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        progress(true, snapshot.bytesTransferred, snapshot.totalBytes)
      },
      (e) => {
        const err = e as Error
        error(err.message)
      },
      async () => {
        load(uploadTask.snapshot.ref)
        setDoc(fileDoc, {
          access,
          uploadFilePath: uploadTask.snapshot.ref.fullPath,
          uploadedFileSize: uploadTask.snapshot.totalBytes,
          uploadFilename: file.name,
          uploadUserId: user?.uid,
          uploadUserDepartmentId: currentDepartment?.id,
          uploadUserDisplayName: user?.displayName,
          uploadedAt: serverTimestamp(),
        })
      }
    )
  }

  return (
    <main className="w-full h-full flex flex-col">
      <header className="px-[22px] border-b border-b-neutral-content flex flex-row items-center justify-center h-16">
        <div>
          <div className="flex flex-row gap-x-1 items-center">
            <strong className="font-lato text-[18px] text-center w-full">
              Resources
            </strong>
          </div>
          <p className="text-[13px] m-0 text-neutral/60 mt-px flex items-center">
            <BsFiles />
            <span className="pl-1 pr-2 border-r border-r-neutral-content">
              {num(department?.resourcesCount)}
            </span>
            <span className="px-2 truncate max-w-[10rem] lg:max-w-2xl">
              Department Resources
            </span>
          </p>
        </div>
      </header>
      <FileUploader
        server={{
          process: handleUpload,
        }}
      />
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Resource name</th>
              <th>Resource Size</th>
              <th>Uploaded By</th>
              <th className="text-center">Upload on</th>
              <th>Access</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {departmentResources?.map((resource, index) => (
              <tr key={resource.id}>
                <td>{index + 1}</td>
                <td>{resource.uploadFilename}</td>
                <td>
                  {prettyBytes(resource.uploadedFileSize, {
                    space: false,
                  })}
                </td>
                <td>{resource.uploadUserDisplayName}</td>
                <td>
                  {dayjs(resource.uploadedAt?.toDate()).format('DD MMMM, YYYY')}
                </td>
                <td>{resource.access}</td>
                <td className="flex items-center gap-x-2">
                  <button
                    className="btn btn-sm btn-link"
                    onClick={async () => {
                      const downloadLink = await getDownloadURL(
                        ref(firebaseStorage, resource.uploadFilePath)
                      )
                      window.open(downloadLink, '__blank')
                    }}
                  >
                    View <BiLinkExternal />
                  </button>
                  {resource.uploadUserId === user?.uid && (
                    <button
                      className="btn btn-sm btn-circle btn-error text-lg"
                      onClick={() => {
                        startDeleteTransition(async () => {
                          await deleteDoc(
                            doc(
                              firebaseFirestore,
                              'departmentResources',
                              resource.id
                            )
                          )
                          toast.success('Resource deleted successfully')
                        })
                      }}
                      disabled={isPendingDeleteTransition}
                    >
                      <BsTrash />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
