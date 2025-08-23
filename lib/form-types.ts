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

export interface FormSchema {
  id: string
  title: string
  description?: string
  fields: FormField[]
  createdAt: string
  updatedAt: string
  isActive: boolean
}

export interface FormResponse {
  id: string
  formId: string
  responses: Record<string, any>
  submittedAt: string
  userEmail?: string
}
