export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      entity_links: {
        Row: {
          created_at: string
          id: string
          metadata: Json
          relation_type: string
          source_entity_id: string
          target_entity_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json
          relation_type: string
          source_entity_id: string
          target_entity_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json
          relation_type?: string
          source_entity_id?: string
          target_entity_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "entity_links_user_id_source_entity_id_fkey"
            columns: ["user_id", "source_entity_id"]
            isOneToOne: false
            referencedRelation: "entity_records"
            referencedColumns: ["user_id", "id"]
          },
          {
            foreignKeyName: "entity_links_user_id_target_entity_id_fkey"
            columns: ["user_id", "target_entity_id"]
            isOneToOne: false
            referencedRelation: "entity_records"
            referencedColumns: ["user_id", "id"]
          },
        ]
      }
      entity_records: {
        Row: {
          created_at: string
          entity_type: string
          id: string
          payload: Json
          section_id: string
          source_id: string
          title: string | null
          updated_at: string
          user_id: string
          valid_from: string | null
          valid_to: string | null
        }
        Insert: {
          created_at?: string
          entity_type: string
          id?: string
          payload?: Json
          section_id: string
          source_id: string
          title?: string | null
          updated_at?: string
          user_id: string
          valid_from?: string | null
          valid_to?: string | null
        }
        Update: {
          created_at?: string
          entity_type?: string
          id?: string
          payload?: Json
          section_id?: string
          source_id?: string
          title?: string | null
          updated_at?: string
          user_id?: string
          valid_from?: string | null
          valid_to?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "entity_records_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          ends_at: string
          entity_id: string
          id: string
          location: string | null
          starts_at: string
          user_id: string
        }
        Insert: {
          ends_at: string
          entity_id: string
          id?: string
          location?: string | null
          starts_at: string
          user_id: string
        }
        Update: {
          ends_at?: string
          entity_id?: string
          id?: string
          location?: string | null
          starts_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_user_id_entity_id_fkey"
            columns: ["user_id", "entity_id"]
            isOneToOne: false
            referencedRelation: "entity_records"
            referencedColumns: ["user_id", "id"]
          },
        ]
      }
      finance_entries: {
        Row: {
          account: string
          amount: number
          created_at: string
          currency: string
          id: string
          transaction_id: string
          user_id: string
        }
        Insert: {
          account: string
          amount: number
          created_at?: string
          currency?: string
          id?: string
          transaction_id: string
          user_id: string
        }
        Update: {
          account?: string
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          transaction_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "finance_entries_user_id_transaction_id_currency_fkey"
            columns: ["user_id", "transaction_id", "currency"]
            isOneToOne: false
            referencedRelation: "finance_transactions"
            referencedColumns: ["user_id", "id", "currency"]
          },
        ]
      }
      finance_transactions: {
        Row: {
          currency: string
          description: string | null
          entity_id: string
          id: string
          occurred_at: string
          user_id: string
        }
        Insert: {
          currency?: string
          description?: string | null
          entity_id: string
          id?: string
          occurred_at: string
          user_id: string
        }
        Update: {
          currency?: string
          description?: string | null
          entity_id?: string
          id?: string
          occurred_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "finance_transactions_user_id_entity_id_fkey"
            columns: ["user_id", "entity_id"]
            isOneToOne: false
            referencedRelation: "entity_records"
            referencedColumns: ["user_id", "id"]
          },
        ]
      }
      health_measurements: {
        Row: {
          entity_id: string
          id: string
          measured_at: string
          metric: string
          unit: string
          user_id: string
          value: number
        }
        Insert: {
          entity_id: string
          id?: string
          measured_at: string
          metric: string
          unit: string
          user_id: string
          value: number
        }
        Update: {
          entity_id?: string
          id?: string
          measured_at?: string
          metric?: string
          unit?: string
          user_id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "health_measurements_user_id_entity_id_fkey"
            columns: ["user_id", "entity_id"]
            isOneToOne: false
            referencedRelation: "entity_records"
            referencedColumns: ["user_id", "id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          timezone: string
          locale: string
          base_currency: string
          units: string
          ai_consent: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          timezone?: string
          locale?: string
          base_currency?: string
          units?: string
          ai_consent?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          timezone?: string
          locale?: string
          base_currency?: string
          units?: string
          ai_consent?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      section_permissions: {
        Row: {
          can_read: boolean
          can_write: boolean
          created_at: string
          section_id: string
          user_id: string
        }
        Insert: {
          can_read?: boolean
          can_write?: boolean
          created_at?: string
          section_id: string
          user_id: string
        }
        Update: {
          can_read?: boolean
          can_write?: boolean
          created_at?: string
          section_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "section_permissions_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
        ]
      }
      sections: {
        Row: {
          active: boolean
          created_at: string
          id: string
          key: string
          name: string
          schema: Json
          version: number
        }
        Insert: {
          active?: boolean
          created_at?: string
          id?: string
          key: string
          name: string
          schema?: Json
          version?: number
        }
        Update: {
          active?: boolean
          created_at?: string
          id?: string
          key?: string
          name?: string
          schema?: Json
          version?: number
        }
        Relationships: []
      }
      tasks: {
        Row: {
          due_at: string | null
          entity_id: string
          id: string
          priority: number
          status: string
          user_id: string
        }
        Insert: {
          due_at?: string | null
          entity_id: string
          id?: string
          priority?: number
          status?: string
          user_id: string
        }
        Update: {
          due_at?: string | null
          entity_id?: string
          id?: string
          priority?: number
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_user_id_entity_id_fkey"
            columns: ["user_id", "entity_id"]
            isOneToOne: false
            referencedRelation: "entity_records"
            referencedColumns: ["user_id", "id"]
          },
        ]
      }
      time_blocks: {
        Row: {
          ends_at: string
          entity_id: string | null
          id: string
          kind: string
          metadata: Json
          starts_at: string
          status: string
          user_id: string
        }
        Insert: {
          ends_at: string
          entity_id?: string | null
          id?: string
          kind?: string
          metadata?: Json
          starts_at: string
          status?: string
          user_id: string
        }
        Update: {
          ends_at?: string
          entity_id?: string | null
          id?: string
          kind?: string
          metadata?: Json
          starts_at?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "time_blocks_user_id_entity_id_fkey"
            columns: ["user_id", "entity_id"]
            isOneToOne: false
            referencedRelation: "entity_records"
            referencedColumns: ["user_id", "id"]
          },
        ]
      }
      workouts: {
        Row: {
          duration_minutes: number | null
          entity_id: string
          id: string
          metrics: Json
          performed_at: string
          user_id: string
        }
        Insert: {
          duration_minutes?: number | null
          entity_id: string
          id?: string
          metrics?: Json
          performed_at: string
          user_id: string
        }
        Update: {
          duration_minutes?: number | null
          entity_id?: string
          id?: string
          metrics?: Json
          performed_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workouts_user_id_entity_id_fkey"
            columns: ["user_id", "entity_id"]
            isOneToOne: false
            referencedRelation: "entity_records"
            referencedColumns: ["user_id", "id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
