'use client'
import * as Tabs from '@radix-ui/react-tabs'
import BackofficeTabDepartments from './BackofficeTabDepartments'
import BackofficeTabUsers from './BackofficeTabUsers'
import BackofficeTabInvitations from './BackofficeTabInvitations'

export default function BackofficeTabs() {
  return (
    <Tabs.Root className="flex flex-col" defaultValue="departments">
      <Tabs.List
        className="shrink-0 tabs tabs-boxed"
        aria-label="Recomm Backoffice Management"
      >
        <Tabs.Trigger
          className="tab data-[state=active]:tab-active"
          value="departments"
        >
          Departments
        </Tabs.Trigger>
        <Tabs.Trigger
          className="tab data-[state=active]:tab-active"
          value="users"
        >
          Users
        </Tabs.Trigger>

        <Tabs.Trigger
          className="tab data-[state=active]:tab-active"
          value="invitaions"
        >
          Invitations
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="departments">
        <BackofficeTabDepartments />
      </Tabs.Content>
      <Tabs.Content value="users">
        <BackofficeTabUsers />
      </Tabs.Content>
      <Tabs.Content value="invitaions">
        <BackofficeTabInvitations />
      </Tabs.Content>
    </Tabs.Root>
  )
}
