import { format } from 'date-fns'

interface UserManagementTableProps {
  users: any[]
}

export function UserManagementTable({ users }: UserManagementTableProps) {
  return (
    <div className="p-8 bg-white/5 border border-white/10 rounded-[40px] backdrop-blur-xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          Recent Explorer Activity
        </h2>
        <button className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
          View All Users →
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-white/5">
              <th className="pb-4 px-4">User</th>
              <th className="pb-4 px-4">Email</th>
              <th className="pb-4 px-4">Joined</th>
              <th className="pb-4 px-4">Trips</th>
              <th className="pb-4 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {users.map((user) => (
              <tr key={user.id} className="group border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-xs font-bold text-blue-500 border border-blue-500/20">
                      {(user.firstName?.[0] || user.email[0]).toUpperCase()}
                    </div>
                    <span className="font-semibold text-white">
                      {user.firstName ? `${user.firstName} ${user.lastName || ''}` : 'New Explorer'}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-slate-400 font-mono text-xs">{user.email}</td>
                <td className="py-4 px-4 text-slate-500">{format(new Date(user.createdAt), 'MMM d, yyyy')}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-orange-500"></span>
                    <span className="font-bold text-white">{user._count.trips}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] font-bold text-green-500 uppercase tracking-widest">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
