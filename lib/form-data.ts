import type { FormSchema } from "./form-types"

// Mock data para desarrollo
export const mockForms: FormSchema[] = [
  {
    id: "1",
    title: "Encuesta de Satisfacción Estudiantil",
    description: "Ayúdanos a mejorar tu experiencia académica",
    fields: [
      {
        id: "nombre",
        type: "text",
        label: "Nombre completo",
        placeholder: "Ingresa tu nombre",
        required: true,
      },
      {
        id: "email",
        type: "text",
        label: "Email",
        placeholder: "tu@email.com",
        required: true,
        validation: {
          pattern: "^[^@]+@[^@]+\\.[^@]+$",
        },
      },
      {
        id: "carrera",
        type: "select",
        label: "Carrera",
        required: true,
        options: ["Ingeniería en Informática", "Licenciatura en Datos", "Tecnicatura en Programación"],
      },
      {
        id: "satisfaccion",
        type: "select",
        label: "Nivel de satisfacción general",
        required: true,
        options: ["Muy satisfecho", "Satisfecho", "Neutral", "Insatisfecho", "Muy insatisfecho"],
      },
      {
        id: "aspectos",
        type: "multicheckbox",
        label: "Aspectos a mejorar",
        options: ["Infraestructura", "Profesores", "Material de estudio", "Horarios", "Comunicación"],
      },
      {
        id: "comentarios",
        type: "textarea",
        label: "Comentarios adicionales",
        placeholder: "Comparte tus sugerencias...",
      },
    ],
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
    isActive: true,
  },
  {
    id: "2",
    title: "Registro de Interés - Cursos de Verano",
    description: "Regístrate para recibir información sobre nuestros cursos de verano",
    fields: [
      {
        id: "nombre",
        type: "text",
        label: "Nombre y apellido",
        required: true,
      },
      {
        id: "telefono",
        type: "text",
        label: "Teléfono",
        required: true,
      },
      {
        id: "cursos",
        type: "multiselect",
        label: "Cursos de interés",
        options: ["Python Básico", "Data Science", "Machine Learning", "Desarrollo Web", "Bases de Datos"],
      },
      {
        id: "modalidad",
        type: "checkbox",
        label: "Modalidades de interés",
        options: ["Presencial", "Virtual", "Híbrida"],
      },
    ],
    createdAt: "2024-01-10",
    updatedAt: "2024-01-12",
    isActive: true,
  },
]

export const getFormById = (id: string): FormSchema | undefined => {
  return mockForms.find((form) => form.id === id)
}

export const getAllForms = (): FormSchema[] => {
  return mockForms
}
