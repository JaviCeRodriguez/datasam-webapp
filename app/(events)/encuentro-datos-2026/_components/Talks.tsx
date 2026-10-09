import Image from "next/image"
import { ArrowUpRight, Clock3, MapPin, Mic2 } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { talks, type Talk } from "./talks-data"

function SpeakerPhoto({ speaker }: { speaker: Talk["speakers"][number] }) {
  return speaker.photo ? (
    <Image
      src={speaker.photo}
      alt={`Foto de ${speaker.name}`}
      width={64}
      height={64}
      className="size-14 shrink-0 rounded-full object-cover"
    />
  ) : (
    <span aria-hidden="true" className="flex size-14 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700">
      <Mic2 className="size-5" />
    </span>
  )
}

function TalkCard({ talk }: { talk: Talk }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group flex h-full w-full flex-col rounded-xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-colors hover:border-sky-400 hover:bg-sky-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2"
          aria-label={`Ver detalles de ${talk.title}`}
        >
          <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs font-semibold uppercase tracking-wide text-sky-800">
            <span className="inline-flex items-center gap-1.5"><Clock3 className="size-3.5" />{talk.time}</span>
            <span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5" />{talk.room}</span>
          </div>
          <h3 className="text-balance text-xl font-bold leading-snug text-slate-950 group-hover:text-sky-900">{talk.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{talk.summary}</p>
          <div className="mt-6 flex w-full items-end justify-between gap-3 border-t border-slate-100 pt-4">
            <div className="flex min-w-0 items-center gap-3">
              {talk.speakers.some((speaker) => speaker.photo) ? (
                <div className="flex shrink-0 -space-x-2">
                  {talk.speakers.filter((speaker) => speaker.photo).map((speaker) => (
                    <Image
                      key={speaker.name}
                      src={speaker.photo!}
                      alt=""
                      width={36}
                      height={36}
                      className="size-9 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
              ) : null}
              <p className="text-sm font-medium text-slate-800">{talk.speakers.map((speaker) => speaker.name).join(" · ")}</p>
            </div>
            <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 text-sky-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[min(85vh,800px)] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto p-0 sm:max-w-2xl">
        <div className="border-b border-sky-100 bg-sky-50 px-6 pb-6 pt-8 sm:px-8">
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-wide text-sky-800">
            {talk.time} · {talk.room}
          </p>
          <DialogHeader>
            <DialogTitle className="pr-6 text-balance text-2xl leading-tight sm:text-3xl">{talk.title}</DialogTitle>
            <DialogDescription className="pt-3 text-left text-base leading-7 text-slate-700">{talk.summary}</DialogDescription>
          </DialogHeader>
        </div>
        <div className="space-y-8 px-6 pb-8 pt-2 sm:px-8">
          {talk.details ? (
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-950">Sobre la charla</h4>
              {talk.details.map((paragraph) => <p key={paragraph} className="text-sm leading-7 text-slate-700">{paragraph}</p>)}
            </div>
          ) : null}
          <div>
            <h4 className="mb-4 font-semibold text-slate-950">{talk.speakers.length > 1 ? "Quienes presentan" : "Quién presenta"}</h4>
            <div className="space-y-5">
              {talk.speakers.map((speaker) => (
                <div key={speaker.name} className="flex items-start gap-4">
                  <SpeakerPhoto speaker={speaker} />
                  <div>
                    <p className="font-semibold text-slate-950">{speaker.name}</p>
                    {speaker.bio ? <p className="mt-1 text-sm leading-6 text-slate-600">{speaker.bio}</p> : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {talk.institutions?.length ? (
            <div>
              <h4 className="mb-3 font-semibold text-slate-950">Instituciones y organizaciones</h4>
              <div className="flex flex-wrap gap-3">
                {talk.institutions.map((institution) => {
                  const content = (
                    <>
                      {institution.logo ? (
                        <Image src={institution.logo} alt="" width={48} height={40} className="h-10 w-12 object-contain" />
                      ) : null}
                      {institution.name}
                      {institution.url ? <ArrowUpRight aria-hidden="true" className="size-4" /> : null}
                    </>
                  )
                  const className = "inline-flex min-h-14 items-center gap-3 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-sky-800"

                  return institution.url ? (
                    <a
                      key={institution.name}
                      href={institution.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${className} hover:border-sky-400 hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600`}
                    >
                      {content}
                    </a>
                  ) : (
                    <span key={institution.name} className={className}>{content}</span>
                  )
                })}
              </div>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function Talks() {
  return (
    <section id="ponencias" className="scroll-mt-20 bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 font-mono text-sm font-semibold uppercase text-sky-700">Encuentro de Datos 2026</p>
          <h2 className="text-balance text-4xl font-bold text-slate-950 md:text-5xl">Ponencias</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Conocé los trabajos y a quienes los presentan. Abrí cada tarjeta para ver más información.
          </p>
          <p className="mt-2 text-sm text-slate-500">Horarios y aulas sujetos a cambios.</p>
        </div>
        <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
          {talks.map((talk) => <TalkCard key={talk.id} talk={talk} />)}
        </div>
      </div>
    </section>
  )
}
