interface TopCitiesTableProps {
  cities: any[]
}

export function TopCitiesTable({ cities }: TopCitiesTableProps) {
  return (
    <div className="h-full p-10 bg-white border border-[#E8E1D9] rounded-[48px] shadow-sm">
      <h2 className="text-2xl font-black mb-8 flex items-center gap-3 tracking-tighter">
        <span className="w-2 h-2 rounded-full bg-green-500"></span>
        Trending Cities
      </h2>
      
      <div className="space-y-4">
        {cities.map((city, index) => (
          <div key={city.id} className="flex items-center justify-between p-5 bg-[#FDF9F4] border border-[#E8E1D9] rounded-3xl hover:border-primary/30 transition-all group">
            <div className="flex items-center gap-5">
              <span className="text-sm font-black text-on-surface-variant w-6">#{index + 1}</span>
              <div>
                <div className="font-bold text-on-surface group-hover:text-primary transition-colors">{city.name}</div>
                <div className="text-[10px] uppercase font-black tracking-widest text-on-surface-variant">{city.country}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-base font-black text-[#A43716]">{city.popularityScore}</div>
              <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">pts</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
