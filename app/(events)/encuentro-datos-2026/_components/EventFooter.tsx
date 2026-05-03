import { eventDetails, navItems } from "./event-data"

export function EventFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#07111f] py-14 text-slate-100">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.12),transparent_36%,rgba(192,38,211,0.12)_100%)]" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mb-10 grid gap-10 md:grid-cols-[1.2fr_0.8fr_1.2fr]">
          <div className="max-w-sm">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-md bg-[#c026d3] font-bold text-white shadow-lg shadow-fuchsia-950/30">
                ED
              </span>
              <span className="text-lg font-bold">{eventDetails.name}</span>
            </div>
            <p className="text-sm leading-6 text-slate-300">
              El evento más importante para estudiantes de Ciencia de Datos.
            </p>
            <p className="mt-5 font-mono text-xs font-semibold uppercase text-cyan-200">{eventDetails.hashtag}</p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase text-cyan-100">Enlaces rapidos</h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase text-cyan-100">Uso de datos e imagen</h4>
            <p className="text-sm leading-6 text-slate-300">
              Los datos ingresados en los formularios serán utilizados exclusivamente para la organización del evento,
              la acreditación de participantes y el análisis general de audiencia. Durante la jornada podrán tomarse
              fotos y videos con fines de comunicación institucional; la participación en el encuentro implica aceptar
              este uso razonable de imagen.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-sm text-slate-400">
          <p>2026 {eventDetails.name}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
