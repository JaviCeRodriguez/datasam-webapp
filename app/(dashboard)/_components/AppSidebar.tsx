import { Home, Users, FileText, ArrowLeft } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Usuarios",
    url: "/admin/usuarios",
    icon: Users,
  },
  {
    title: "Formularios",
    url: "/admin/formularios",
    icon: FileText,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/admin" className="flex items-center space-x-2 px-2 py-1">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">DS</span>
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            DataSam Admin
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Administración</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <Button asChild variant="outline" className="w-full bg-transparent">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Sitio
            </Link>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
