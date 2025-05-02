"use client"

// Import required components and icons
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit2, Trash2 } from "lucide-react"
import { deleteUser } from "@/app/actions/admin"
import { User } from "@/db/schema"

// Props interface for UserTable component
interface UserTableProps {
  users: User[]
}

// UserTable component that displays a list of users with their details and actions
export function UserTable({ users }: UserTableProps) {
  // Helper function to determine badge color based on user role
  const getRoleBadgeColor = (isAdmin: boolean) => {
    return isAdmin
      ? "bg-red-100 text-red-800 hover:bg-red-100"
      : "bg-blue-100 text-blue-800 hover:bg-blue-100"
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        {/* Table header */}
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium text-gray-500">Name</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500">Email</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500">Role</th>
            <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        {/* Table body with user rows */}
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">{user.name}</td>
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4">
                {/* Role badge with conditional styling */}
                <Badge variant="secondary" className={getRoleBadgeColor(user.isAdmin)}>
                  {user.isAdmin ? "Admin" : "User"}
                </Badge>
              </td>
              <td className="py-3 px-4 text-right">
                {/* Edit user button */}
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                  <Edit2 className="h-4 w-4" />
                </Button>
                {/* Delete user button */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-gray-500"
                  onClick={() => deleteUser(user.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
