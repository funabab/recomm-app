'use client'
import 'filepond/dist/filepond.min.css'

import { FilePond, FilePondProps, registerPlugin } from 'react-filepond'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { useState } from 'react'

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
)

interface Props extends FilePondProps {}

export default function FileUploader(props: Props) {
  const [files, setFiles] = useState<File[]>([])
  return (
    <div className="w-full bg-neutral [&_.filepond--drop-label]:text-neutral-content">
      <FilePond
        files={files}
        allowMultiple={false}
        maxFiles={1}
        name="file-upload"
        acceptedFileTypes={[
          'image/*',
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-powerpoint',
          'video/mp4',
          'audio/mpeg',
          'video/x-msvideo',
        ]}
        stylePanelLayout="integrated"
        credits={false}
        {...props}
      />
    </div>
  )
}
