import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CircleUser } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const ProfileDropdown = () => {
  const { session, signInWithDiscord, signOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          {session ? (
            <img
              src={session.user.user_metadata.avatar_url}
              alt={session.user.user_metadata.full_name}
              className="w-5 h-5 rounded-full"
            />
          ) : (
            <CircleUser className="w-5 h-5" />
          )}
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          Hola {session?.user.user_metadata.full_name ?? "usuario"}!
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem> */}
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem>
          {session ? (
            <Button onClick={signOut}>Cerrar sesión</Button>
          ) : (
            <Button onClick={signInWithDiscord}>
              Iniciar sesión (Discord)
            </Button>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
