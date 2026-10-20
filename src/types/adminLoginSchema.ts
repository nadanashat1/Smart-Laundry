import z from "zod";

// admin login schema for zod validation on admin login form
export const adminLoginSchema = z.object({
  email: z
    .string()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("صيغة البريد الإلكتروني غير صحيحة"),
  password: z
    .string()
    .min(1, "كلمة المرور مطلوبة")
    .min(5, "كلمة المرور يجب ألا تقل عن 5 أحرف")
    .max(20, "كلمة المرور يجب ألا تزيد عن 20 حرفاً"),
});

export type AdminLoginFormData = z.infer<typeof adminLoginSchema>;
