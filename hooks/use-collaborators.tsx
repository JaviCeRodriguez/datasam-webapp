// src/hooks/useSupabaseData.js
import { createClient } from "@/lib/supabase/client";
import { useRootStore } from "@/store/root-store";
import type { CollaboratorsState } from "@/store/slices/collaborators";
import { useState, useEffect } from "react";

export const useCollaboratorsData = (refreshInterval = 60 * 60 * 1000) => {
  const [data, setData] = useState<CollaboratorsState["collaborators"]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const supabase = createClient();

  const collaborators = useRootStore((state) => state.collaborators);
  const revalidateDate = useRootStore((state) => state.revalidateDate);
  const setCollaborators = useRootStore((state) => state.setCollaborators);
  const setRevalidateDate = useRootStore((state) => state.setRevalidateDate);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Verificar la última marca de tiempo
        const currentTime = Date.now();

        // Si no hay datos en la caché o han pasado más de 4 o 5 horas, realiza una nueva solicitud
        if (!revalidateDate || currentTime - revalidateDate > refreshInterval) {
          const {
            data,
            error,
          }: {
            data: CollaboratorsState["collaborators"] | null;
            error: object | null;
          } = await supabase.from("collaborators").select("*");

          if (error) throw error;

          // Guardar en caché los datos y la nueva marca de tiempo
          setCollaborators(data ?? []);
          setRevalidateDate(currentTime);
          setData(data ?? []);
        } else {
          // Si no han pasado las 4 o 5 horas, usar los datos de la caché
          setData(collaborators);
        }
      } catch (err) {
        // Manejo de errores y uso de caché si es posible
        if (collaborators) {
          setData(collaborators);
        }
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshInterval]);

  return { data, loading, error };
};
