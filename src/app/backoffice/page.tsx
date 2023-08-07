'use client'
import React from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { CiCircleMore } from 'react-icons/ci'
import * as Dialog from '@radix-ui/react-dialog'
import InviteUserModal from '@/containers/backoffice/InviteUserModal'

const BackofficePage = () => {
  return (
    <div>
      <div className="py-4 text-2xl font-bold text-gray-700 border-b border-b-gray-300">
        <h1 className="mx-auto max-w-7xl">Recomm Backoffice</h1>
      </div>

      <div className="mt-10 mx-auto max-w-7xl">
        <h2 className="text-lg uppercase text-gray-500 font-medium">
          Department Managements
        </h2>

        <Tabs.Root className="flex flex-col mt-5" defaultValue="department">
          <Tabs.List
            className="shrink-0 flex gap-x-4"
            aria-label="Admin management"
          >
            <Tabs.Trigger
              className="data-[state=active]:text-blue-700 font-medium data-[state=active]:border-b-2 data-[state=active]:border-b-blue-700 text-gray-700 p-2"
              value="department"
            >
              Departments
            </Tabs.Trigger>
            <Tabs.Trigger
              className="data-[state=active]:text-blue-700 font-medium data-[state=active]:border-b-2 data-[state=active]:border-b-blue-700 text-gray-700 p-2"
              value="user"
            >
              Users
            </Tabs.Trigger>
            <Tabs.Trigger
              className="data-[state=active]:text-blue-700 font-medium data-[state=active]:border-b-2 data-[state=active]:border-b-blue-700 text-gray-700 p-2"
              value="invitation"
            >
              Invitations
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="department"></Tabs.Content>
          <Tabs.Content value="user">
            <div className="flex justify-end">
              <InviteUserModal>
                <button className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-opacity-80 font-medium">
                  Invite User
                </button>
              </InviteUserModal>
            </div>
            <div className="mt-5">
              <table className="table-auto w-full">
                <thead>
                  <tr className="text-left bg-gray-200">
                    <th className="p-2">#</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Role</th>
                    <th className="p-2">Departments</th>
                    <th className="p-2"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="p-2">1</td>
                    <td className="p-2">John doe</td>
                    <td className="p-2">john.doe@testmail.com</td>
                    <td className="p-2">Staff</td>
                    <td className="p-2">ICT Department</td>
                    <td className="p-2">
                      <button className="text-xl">
                        <CiCircleMore />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Tabs.Content>
          <Tabs.Content value="invitation"></Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  )
}

export default BackofficePage
