import { z } from "zod";

export const formFieldSchema = z.object({
  id: z.string(),
  type: z.enum(["text", "textarea", "select", "number", "email"]),
  label: z.string().min(1, { message: "La etiqueta es requerida" }),
  placeholder: z.string().optional(),
  required: z.boolean().default(false),
  options: z.array(z.string()).optional(),
});

export const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "El título debe tener al menos 3 caracteres" }),
  description: z.string().optional(),
  fields: z
    .array(formFieldSchema)
    .min(1, { message: "El formulario debe tener al menos un campo" }),
});

export type FormFieldValues = z.infer<typeof formFieldSchema>;
export type FormValues = z.infer<typeof formSchema>;
