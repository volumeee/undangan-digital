export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export type Database = {
  public: {
    Tables: {
      invitations: {
        Row: {
          id: number
          slug: string
          title: string
          event_type: string
          status: 'draft' | 'published' | 'paid' | 'expired'
          owner_id: string
          guest_count: number
          created_at: string
          total_price: number
        }
        Insert: Partial<Database['public']['Tables']['invitations']['Row']>
        Update: Partial<Database['public']['Tables']['invitations']['Row']>
        Relationships: []
      }
      guest_book: {
        Row: {
          id: number
          invitation_id: number
          guest_name: string
          message: string
          photo: string | null
          reaction: string | null
          is_visible: boolean
          created_at: string
        }
        Insert: Partial<Database['public']['Tables']['guest_book']['Row']>
        Update: Partial<Database['public']['Tables']['guest_book']['Row']>
        Relationships: []
      }
      payments: {
        Row: {
          id: string
          order_id: string
          invitation_id: number
          amount: number
          status: string
          payment_type: string
          created_at: string
        }
        Insert: Partial<Database['public']['Tables']['payments']['Row']>
        Update: Partial<Database['public']['Tables']['payments']['Row']>
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
