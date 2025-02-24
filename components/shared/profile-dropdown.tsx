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
import Image from "next/image";

const ProfileDropdown = () => {
  const { session, signInWithGoogle, signOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          {session ? (
            <Image
              src={session.user.user_metadata.avatar_url}
              alt={session.user.user_metadata.full_name}
              className="w-8 h-8 rounded-full"
              width={20}
              height={20}
            />
          ) : (
            <CircleUser className="w-5 h-5" />
          )}
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      {session ? (
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            Hola {session.user.user_metadata.full_name}!
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button onClick={signOut}>Cerrar sesión</Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Hola usuario!</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button onClick={signInWithGoogle}>Iniciar sesión (Google)</Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default ProfileDropdown;
