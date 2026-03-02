export interface FormField {
  id: string
  type: "text" | "textarea" | "select" | "multiselect" | "checkbox" | "multicheckbox"
  label: string
  placeholder?: string
  required?: boolean
  options?: string[] // Para select y checkbox
  validation?: {
    minLength?: number
    maxLength?: number
    pattern?: string
  }
}

export type FormStatus = "draft" | "published" | "closed"

export type FormResponseAccess = "anonymous" | "authenticated"

export interface FormSchema {
  id: string
  title: string
  description?: string | null
  fields: FormField[]
  createdAt: string
  updatedAt: string
  createdBy?: string | null
  status: FormStatus
  responseAccess: FormResponseAccess
  publishedAt?: string | null
}

export interface FormResponse {
  id: string
  formId: string
  responses: Record<string, unknown>
  submittedAt: string
  createdAt: string
  userId?: string | null
  userEmail?: string | null
  userName?: string | null
}

export interface FormListItem extends FormSchema {
  responsesCount: number
}
