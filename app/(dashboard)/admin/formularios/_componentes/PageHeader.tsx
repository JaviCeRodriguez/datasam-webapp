import { SidebarTrigger } from "@/components/ui/sidebar"

interface PageHeaderProps {
  title: string
  description?: string
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="flex items-center gap-4 pb-4 border-b">
      <SidebarTrigger />
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {title}
        </h1>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
    </div>
  )
}

export { PageHeader }
