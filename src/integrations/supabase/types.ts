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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      Detections: {
        Row: {
          confidence: number
          created_at: string
          frame_id: string
          height: number
          id: string
          species: string
          width: number
          x_center: number
          y_center: number
        }
        Insert: {
          confidence: number
          created_at?: string
          frame_id: string
          height: number
          id?: string
          species: string
          width: number
          x_center: number
          y_center: number
        }
        Update: {
          confidence?: number
          created_at?: string
          frame_id?: string
          height?: number
          id?: string
          species?: string
          width?: number
          x_center?: number
          y_center?: number
        }
        Relationships: [
          {
            foreignKeyName: "Detections_frame_id_fkey"
            columns: ["frame_id"]
            isOneToOne: false
            referencedRelation: "Frames"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_detections_frame_id"
            columns: ["frame_id"]
            isOneToOne: false
            referencedRelation: "Frames"
            referencedColumns: ["id"]
          },
        ]
      }
      Devices: {
        Row: {
          created_at: string
          id: string
          name: string
          project_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          project_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Devices_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "Projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_devices_project_id"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "Projects"
            referencedColumns: ["id"]
          },
        ]
      }
      Frames: {
        Row: {
          created_at: string
          device_id: string
          id: string
          image_url: string | null
          project_id: string
          timestamp: string
        }
        Insert: {
          created_at?: string
          device_id: string
          id?: string
          image_url?: string | null
          project_id: string
          timestamp: string
        }
        Update: {
          created_at?: string
          device_id?: string
          id?: string
          image_url?: string | null
          project_id?: string
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_frames_device_id"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "Devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_frames_project_id"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "Projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Frames_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "Devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Frames_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "Projects"
            referencedColumns: ["id"]
          },
        ]
      }
      Measurements: {
        Row: {
          created_at: string
          detection_id: string
          height_cm: number
          id: string
          length_cm: number
          weight_g: number
        }
        Insert: {
          created_at?: string
          detection_id?: string
          height_cm: number
          id?: string
          length_cm: number
          weight_g: number
        }
        Update: {
          created_at?: string
          detection_id?: string
          height_cm?: number
          id?: string
          length_cm?: number
          weight_g?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_measurements_detection_id"
            columns: ["detection_id"]
            isOneToOne: false
            referencedRelation: "Detections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Measurements_detection_id_fkey"
            columns: ["detection_id"]
            isOneToOne: false
            referencedRelation: "Detections"
            referencedColumns: ["id"]
          },
        ]
      }
      Projects: {
        Row: {
          client: string
          created_at: string
          id: string
          latitude: number | null
          longitude: number | null
          type: string
        }
        Insert: {
          client: string
          created_at?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          type: string
        }
        Update: {
          client?: string
          created_at?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          type?: string
        }
        Relationships: []
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
