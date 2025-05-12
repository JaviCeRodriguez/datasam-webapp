export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      collaborators: {
        Row: {
          id: string;
          name: string;
          phrase: string;
          profile: string | null;
          role: string;
        };
        Insert: {
          id?: string;
          name: string;
          phrase: string;
          profile?: string | null;
          role?: string;
        };
        Update: {
          id?: string;
          name?: string;
          phrase?: string;
          profile?: string | null;
          role?: string;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          cover: string;
          created_at: string;
          description: string | null;
          estimated_total_duration: number;
          id: string;
          is_active: boolean;
          knowledge_domain: string;
          licence: string;
          modified_at: string;
          name: string;
          targets: string[];
          tecnologies: string[];
          type: string;
          url: string;
          weekly_hours: number;
        };
        Insert: {
          cover?: string;
          created_at?: string;
          description?: string | null;
          estimated_total_duration?: number;
          id?: string;
          is_active?: boolean;
          knowledge_domain: string;
          licence: string;
          modified_at: string;
          name: string;
          targets?: string[];
          tecnologies?: string[];
          type: string;
          url?: string;
          weekly_hours?: number;
        };
        Update: {
          cover?: string;
          created_at?: string;
          description?: string | null;
          estimated_total_duration?: number;
          id?: string;
          is_active?: boolean;
          knowledge_domain?: string;
          licence?: string;
          modified_at?: string;
          name?: string;
          targets?: string[];
          tecnologies?: string[];
          type?: string;
          url?: string;
          weekly_hours?: number;
        };
        Relationships: [];
      };
      roles: {
        Row: {
          id: string;
          role_name: string;
        };
        Insert: {
          id?: string;
          role_name: string;
        };
        Update: {
          id?: string;
          role_name?: string;
        };
        Relationships: [];
      };
      salaries: {
        Row: {
          created_at: string;
          id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "salaries_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_view";
            referencedColumns: ["id"];
          }
        ];
      };
      user_projects: {
        Row: {
          created_by_user: boolean;
          id: string;
          project_id: string;
          user_id: string;
        };
        Insert: {
          created_by_user: boolean;
          id?: string;
          project_id: string;
          user_id: string;
        };
        Update: {
          created_by_user?: boolean;
          id?: string;
          project_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_projects_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_projects_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_view";
            referencedColumns: ["id"];
          }
        ];
      };
      user_recommendations: {
        Row: {
          created_at: string;
          description: string | null;
          from_user_id: string | null;
          id: string;
          modified_at: string;
          project_id: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          from_user_id?: string | null;
          id?: string;
          modified_at?: string;
          project_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          from_user_id?: string | null;
          id?: string;
          modified_at?: string;
          project_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_recommendations_from_user_id_fkey";
            columns: ["from_user_id"];
            isOneToOne: false;
            referencedRelation: "user_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_recommendations_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_recommendations_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_view";
            referencedColumns: ["id"];
          }
        ];
      };
      user_roles: {
        Row: {
          id: string;
          role_id: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          role_id: string;
          user_id: string;
        };
        Update: {
          id?: string;
          role_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "new_user_roles_role_id_fkey";
            columns: ["role_id"];
            isOneToOne: false;
            referencedRelation: "roles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "new_user_roles_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_view";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      user_view: {
        Row: {
          created_at: string | null;
          email: string | null;
          id: string | null;
          phone: string | null;
          raw_user_meta_data: Json | null;
          role_name: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
