export type Project = {
  cover: string | null;
  created_at: string | null;
  description: string | null;
  estimated_total_duration: number | null;
  id: string;
  is_active: boolean | null;
  knowledge_domain: string | null;
  licence: string | null;
  modified_at: string | null;
  name: string | null;
  targets: string[] | null;
  tecnologies: string[] | null;
  type: string | null;
  url: string | null;
  weekly_hours: number | null;
};
