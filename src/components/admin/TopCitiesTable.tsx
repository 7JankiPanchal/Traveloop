interface TopCitiesTableProps {
  cities: any[]
}

export function TopCitiesTable({ cities }: TopCitiesTableProps) {
  return (
    <div className="h-full p-8 bg-white/5 border border-white/10 rounded-[40px] backdrop-blur-xl">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
        Trending Cities
      </h2>
      
      <div className="space-y-4">
        {cities.map((city, index) => (
          <div key={city.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-500 w-4">#{index + 1}</span>
              <div>
                <div className="font-bold text-white text-sm">{city.name}</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500">{city.country}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-orange-400">{city.popularityScore}</div>
              <div className="text-[10px] text-slate-600">pts</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
