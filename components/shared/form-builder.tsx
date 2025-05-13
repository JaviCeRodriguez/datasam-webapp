"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, Trash2 } from "lucide-react";
import {
  formSchema,
  type FormValues,
  type FormFieldValues,
} from "@/lib/validations/form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/lib/supabase/database.types";
import useSupabaseBrowser from "@/lib/supabase/client";
import { Resolver } from "react-hook-form";

interface FormBuilderProps {
  form?: FormType;
}

type FormType = Database["public"]["Tables"]["forms"]["Row"];

export function FormBuilder({ form }: FormBuilderProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const supabase = useSupabaseBrowser();

  // Convertir los campos del formulario existente al formato esperado
  const initialFields = form?.fields
    ? Array.isArray(form.fields)
      ? (form.fields as FormFieldValues[])
      : []
    : [];

  const formMethods = useForm<FormValues>({
    resolver: zodResolver(formSchema) as Resolver<FormValues>,
    defaultValues: {
      title: form?.title || "",
      description: form?.description || "",
      fields:
        initialFields.length > 0
          ? initialFields.map((field) => ({
              id: field.id,
              type: field.type,
              label: field.label,
              placeholder: field.placeholder || "",
              required: Boolean(field.required),
              options: field.options || [],
            }))
          : [
              {
                id: Date.now().toString(),
                type: "text",
                label: "",
                placeholder: "",
                required: false,
              },
            ],
    } as FormValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: formMethods.control,
    name: "fields",
  });

  const addField = () => {
    append({
      id: Date.now().toString(),
      type: "text",
      label: "",
      placeholder: "",
      required: false,
    });
  };

  const addOption = (fieldIndex: number) => {
    const currentField = formMethods.getValues(`fields.${fieldIndex}`);
    const options = currentField.options || [];
    formMethods.setValue(`fields.${fieldIndex}.options`, [...options, ""]);
  };

  const removeOption = (fieldIndex: number, optionIndex: number) => {
    const currentField = formMethods.getValues(`fields.${fieldIndex}`);
    const options = [...(currentField.options || [])];
    options.splice(optionIndex, 1);
    formMethods.setValue(`fields.${fieldIndex}.options`, options);
  };

  const onSubmit = async (values: FormValues) => {
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("Usuario no autenticado");
      }

      if (form) {
        // Actualizar formulario existente
        const { error } = await supabase
          .from("forms")
          .update({
            title: values.title,
            description: values.description,
            fields: values.fields,
          })
          .eq("id", form.id);

        if (error) throw error;

        toast({
          title: "Formulario actualizado",
          description: "Tu formulario ha sido actualizado correctamente.",
        });
      } else {
        // Crear nuevo formulario
        const { error } = await supabase.from("forms").insert({
          title: values.title,
          description: values.description,
          fields: values.fields,
          creator_id: user.id,
        });

        if (error) throw error;

        toast({
          title: "Formulario creado",
          description: "Tu formulario ha sido creado correctamente.",
        });
      }

      router.push("/dashboard/forms");
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Error al guardar el formulario",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detalles del Formulario</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={formMethods.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título del formulario</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingresa el título del formulario"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formMethods.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción (Opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ingresa la descripción del formulario"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Campos del Formulario</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-4 p-4 border rounded-md">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Campo {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={formMethods.control}
                      name={`fields.${index}.label`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Etiqueta</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ingresa la etiqueta del campo"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={formMethods.control}
                      name={`fields.${index}.type`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={(value) => {
                              field.onChange(value);
                              if (value === "select") {
                                formMethods.setValue(
                                  `fields.${index}.options`,
                                  [""]
                                );
                              } else {
                                formMethods.setValue(
                                  `fields.${index}.options`,
                                  undefined
                                );
                              }
                            }}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona el tipo de campo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="text">Texto</SelectItem>
                              <SelectItem value="textarea">
                                Área de texto
                              </SelectItem>
                              <SelectItem value="number">Número</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="select">Selección</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={formMethods.control}
                    name={`fields.${index}.placeholder`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Placeholder (Opcional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ingresa el texto de placeholder"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={formMethods.control}
                    name={`fields.${index}.required`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Campo requerido</FormLabel>
                          <FormDescription>
                            Marca esta opción si el campo debe ser obligatorio
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  {formMethods.watch(`fields.${index}.type`) === "select" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <FormLabel>Opciones</FormLabel>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addOption(index)}
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Añadir Opción
                        </Button>
                      </div>

                      {formMethods
                        .watch(`fields.${index}.options`)
                        ?.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className="flex items-center gap-2"
                          >
                            <Input
                              value={option}
                              onChange={(e) => {
                                const options = [
                                  ...(formMethods.getValues(
                                    `fields.${index}.options`
                                  ) || []),
                                ];
                                options[optionIndex] = e.target.value;
                                formMethods.setValue(
                                  `fields.${index}.options`,
                                  options
                                );
                              }}
                              placeholder={`Opción ${optionIndex + 1}`}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeOption(index, optionIndex)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addField}
                className="w-full"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Añadir Campo
              </Button>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard/forms")}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading
                  ? "Guardando..."
                  : form
                  ? "Actualizar Formulario"
                  : "Crear Formulario"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </Form>
  );
}
