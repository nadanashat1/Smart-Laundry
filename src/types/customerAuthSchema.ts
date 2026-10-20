import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(1, "الاسم الكامل مطلوب")
      .min(3, "يجب أن يتكون الاسم من 3 أحرف على الأقل"),

    phone: z
      .string()
      .trim()
      .regex(/^1[0125]\d{8}$/, "أدخل رقم هاتف مصري صحيح"),

    email: z
      .string()
      .trim()
      .min(1, "البريد الإلكتروني مطلوب")
      .email("أدخل بريدًا إلكترونيًا صحيحًا"),

    password: z
      .string()
      .min(1, "كلمة المرور مطلوبة")
      .min(8, "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل"),

    confirmPassword: z.string().min(1, "تأكيد كلمة المرور مطلوب"),

    acceptTerms: z.boolean().refine((accepted) => accepted, {
      message: "يجب الموافقة على الشروط والأحكام",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const customerLoginSchema = z.object({
  phone: z
    .string()
    .trim()
    .regex(/^01[0125]\d{8}$/, "أدخل رقم هاتف مصري صحيح"),

  password: z.string().min(1, "كلمة المرور مطلوبة"),
});

export type CustomerLoginFormData = z.infer<typeof customerLoginSchema>;

export const forgetPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("أدخل بريدًا إلكترونيًا صحيحًا"),
});

export type ForgetPasswordFormData = z.infer<typeof forgetPasswordSchema>;
