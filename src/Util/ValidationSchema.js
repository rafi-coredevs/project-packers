import { boolean, object, string, ref } from "yup";
export const loginSchema = object({
  email: string().email().required("Please Enter Your Email Address."),
  password: string().min(6).required("Password Can not be Empty"),
  remember: boolean(),
});
export const emailSchema = object({
  email: string().email().required("Please Enter Your Email Address."),
});
export const changePassword = object({
  password: string().min(6).required("Password Can not be Empty"),
  confirmPassword: string()
    .oneOf([ref("password"), null], "Passwords must match")
    .required("Password Can not be Empty"),
});
export const signupSchema = object({
  name: string().required(),
  email: string().email().required("Please Enter Your Email Address."),
  phone: string().min(10, "Invalid Phone Number").max(12).required(),
  password: string().min(6).required("Password Can not be Empty"),
  terms: boolean().required(),
});

export const profileSchema = object({
  firstName: string().required(),
  lastName: string().required(),
  email: string().email().required("Please Enter Your Email Address."),
  phone: string().min(10, "Invalid Phone Number").max(17).required(),
  currentPassword: string().min(6),
  newPassword: string().min(6),
  confirmPassword: string().oneOf(
    [ref("newPassword"), null],
    "Passwords must match"
  ),
});

export const categorySchema = object({
  name: string().required(),
  slug: string()
    .matches(/^[A-Za-z]+$/, "Avoid space.")
    .required(),
});

export const subCategorySchema = object({
  name: string().required(),
  slug: string()
    .matches(/^[A-Za-z]+$/, "Avoid space.")
    .required(),
});

export const productSchema = object({
  name: string().required(),
  desc: string().required(),
  price: string().matches(/^\d+(\.\d+)?$/,"Not valid").required(),
  tax: string().matches(/^\d+(\.\d+)?$/,"Not valid").required(),
  fee: string().matches(/^\d+(\.\d+)?$/,"Not valid").required(),
  stock: string().matches(/^\d+(\.\d+)?$/,"Not valid").required(),
  from: string().required(),
  link: string().required(),
  tags: string().required(),
  deliveryTime: object({
    min: string().required(),
    max: string().required(),
  }),
});
