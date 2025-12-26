"use client"

interface StatItem {
  numero: string
  etiqueta: string
}

interface StatsData {
  estadisticas: StatItem[]
  fondoOscuro?: boolean
}

export function BloqueStats({ data }: { data: StatsData }) {
  const useDarkBg = data.fondoOscuro
  
  return (
    <section 
      className="py-16 md:py-24 transition-colors"
      style={{ 
        backgroundColor: useDarkBg ? "var(--color-primario)" : "var(--color-fondo)",
        color: useDarkBg ? "#ffffff" : "var(--color-texto)"
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
          {data.estadisticas.map((stat, index) => (
            <div key={index} className="p-4">
              <div 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 tracking-tight"
                style={{ 
                  color: useDarkBg ? "#ffffff" : "var(--color-primario)" 
                }}
              >
                {stat.numero}
              </div>
              <div className="text-sm md:text-base font-medium uppercase tracking-wider opacity-80">
                {stat.etiqueta}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}