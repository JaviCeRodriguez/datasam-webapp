import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CircleUser, MonitorCog } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
const ProfileDropdown = () => {
  const { userData, isLoadingUser, userRoleData, signInWithGoogle, signOut } =
    useAuth();

  if (isLoadingUser) {
    return <Skeleton className="w-8 h-8 rounded-full" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          {userData?.data?.user ? (
            <Image
              src={userData?.data.user?.user_metadata.avatar_url}
              alt={userData?.data.user?.user_metadata.full_name}
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
      {userData?.data?.user ? (
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            Hola {userData.data.user?.user_metadata.full_name}!
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {userRoleData?.data?.roles.role_name === "admin" && (
            <>
              <DropdownMenuItem>
                <MonitorCog className="w-4 h-4" />
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
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
