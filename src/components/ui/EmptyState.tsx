interface EmptyStateProps {
  icon?: string
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({ icon = '🗺️', title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center gap-4">
      <span className="text-5xl">{icon}</span>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {description && <p className="text-slate-400 text-sm max-w-xs">{description}</p>}
      {action}
    </div>
  )
}
