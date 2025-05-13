"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useSupabaseBrowser from "@/lib/supabase/client";
import { getForms } from "@/queries/get-forms";
import { useQuery } from "@tanstack/react-query";

import {
  Eye,
  FileText,
  Pencil,
  Loader2,
  PlusCircle,
  Calendar,
} from "lucide-react";
import Link from "next/link";

export default function FormsClient() {
  const supabase = useSupabaseBrowser();

  const { data: forms, isLoading: isLoadingForms } = useQuery({
    queryKey: ["forms"],
    queryFn: () => getForms(supabase),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Formularios</h2>
          <p className="text-muted-foreground">Crear y gestionar formularios</p>
        </div>
        <Link href="/dashboard/forms/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo formulario
          </Button>
        </Link>
      </div>

      {isLoadingForms ? (
        <div className="flex items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {forms?.data?.map((form) => (
            <Card key={form.id}>
              <CardHeader>
                <CardTitle>{form.title}</CardTitle>
                <CardDescription>
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(form.created_at || "").toLocaleDateString()}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-sm">
                  {form.description || "No description"}
                </p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Link href={`/forms/${form.id}`} target="_blank">
                  <Button variant="default" size="sm">
                    <Eye className="h-4 w-4" />
                    Ver
                  </Button>
                </Link>
                <Link href={`/dashboard/forms/${form.id}/responses`}>
                  <Button variant="secondary" size="sm">
                    <FileText className="h-4 w-4" />
                    Respuestas
                  </Button>
                </Link>
                <Link href={`/dashboard/forms/${form.id}`}>
                  <Button variant="destructive" size="sm">
                    <Pencil className="h-4 w-4" />
                    Editar
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
