import { format } from 'date-fns'

interface UserManagementTableProps {
  users: any[]
}

export function UserManagementTable({ users }: UserManagementTableProps) {
  return (
    <div className="p-10 bg-white border border-[#E8E1D9] rounded-[48px] shadow-sm">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-black flex items-center gap-3 tracking-tighter">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          Recent Explorer Activity
        </h2>
        <button className="text-xs font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">
          View All Users →
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60 border-b border-[#E8E1D9]">
              <th className="pb-6 px-4">Explorer</th>
              <th className="pb-6 px-4">Direct Contact</th>
              <th className="pb-6 px-4">Joined Date</th>
              <th className="pb-6 px-4">Adventures</th>
              <th className="pb-6 px-4 text-right">Verification</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {users.map((user) => (
              <tr key={user.id} className="group border-b border-[#F9F5F0] hover:bg-[#FDF9F4] transition-colors">
                <td className="py-6 px-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#FDF9F4] flex items-center justify-center text-xs font-black text-primary border border-[#E8E1D9]">
                      {(user.firstName?.[0] || user.email[0]).toUpperCase()}
                    </div>
                    <span className="font-bold text-on-surface group-hover:text-primary transition-colors">
                      {user.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Anonymous Explorer'}
                    </span>
                  </div>
                </td>
                <td className="py-6 px-4 text-on-surface-variant font-medium text-xs">{user.email}</td>
                <td className="py-6 px-4 text-on-surface-variant font-medium">{format(new Date(user.createdAt), 'MMM d, yyyy')}</td>
                <td className="py-6 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#A43716]" />
                    <span className="font-black text-on-surface">{user._count.trips}</span>
                  </div>
                </td>
                <td className="py-6 px-4 text-right">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-100 text-[10px] font-black text-green-600 uppercase tracking-widest">
                    <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                    Verified
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
