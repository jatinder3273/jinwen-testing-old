import { emailRegExp, numberRegex, phoneRegex } from "@/utils/constants";
import * as yup from "yup";

export const emailSchema = yup
  .string()
  .trim()
  .required("Email is required")
  .email("Please enter valid email id")
  .matches(emailRegExp, "Please enter valid email id");

export const dateSchema = (message?: string) =>
  yup.date().required(message ?? "This field is required");

export const passwordSchema = (name?: string) =>
  yup
    .string()
    .min(8, "Minimum 8 characters required.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain 8 characters( One uppercase, lowercase letter, number, and special character )."
    )
    .trim()
    .required(`${name ?? "Password"} is required`);

export const NewPasswordSchema = (name?: string) =>
  yup
    .string()
    .min(8, "Minimum 8 characters required.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain 8 characters( One uppercase, lowercase letter, number, and special character )."
    )
    .trim()
    .required(`${name ?? "New password"} is required`);

export const confirmPasswordSchema = (reference: string) =>
  yup
    .string()
    .oneOf(
      [yup.ref(reference), null],
      "New password and confirm new password doesn't match."
    )
    .required("Confirm password is required");

export const nameSchema = (message: string) =>
  yup.string().trim().required(message).max(30, "Max 30 characters allowed");

export const addInvestorSchema = yup.object().shape({
  first_name: nameSchema("First name is required"),
  last_name: nameSchema("Last name is required"),
  email: emailSchema,
  phone_no: yup
    .string()
    .required("Phone number is required")
    .matches(phoneRegex, "Only numbers allowed")
    .min(7, "Please enter a phone number, 7 to 15 digits long.")
    .max(15, "Please enter a phone number, 7 to 15 digits long."),
  investor_type: nameSchema("Investor type is required"),
  address: yup
    .string()
    .trim()
    .required("Address is required")
    .max(200, "Max 200 characters allowed"),
  city: yup
    .string()
    .trim()
    .required("City is required")
    .max(30, "Max 30 characters allowed"),
  state: yup
    .string()
    .trim()
    .required("State is required")
    .max(30, "Max 30 characters allowed"),
  zip_code: yup
    .string()
    .trim()
    .required("Zipcode is required")
    .matches(numberRegex, "Zipcode should be a number only")
    .max(30, "Max 30 characters allowed"),
  // membership_date: dateSchema(),
  tax_id: yup
    .string()
    .trim()
    .matches(numberRegex, "Tax ID should be a number only")
    .max(10, "Max 10 characters allowed"),
});

export const addTradeSchema = yup.object().shape({
  stock_name: yup
    .string()
    .trim()
    .required("Stock name is required")
    .max(100, "Max 100 characters allowed"),
  portfolio: yup
    .string()
    .trim()
    .required("Portfolio name is required")
    .max(100, "Max 100 characters allowed"),
  quantity: yup
    .number()
    .required("Quantity is required")
    .positive("Quantity must be a positive number")
    .integer("Quantity must be an integer"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  market_value: yup
    .number()
    .required("Market value is required")
    .positive("Market value must be a positive number"),
  cost_basis: yup
    .number()
    .required("Cost basis is required")
    .positive("Cost basis must be a positive number"),
  gain_loss: yup.number().required("Gain/loss is required"),
});

export const addTradeHistorySchema = yup.object().shape({
  symbol: yup
    .string()
    .trim()
    .required("Symbol is required")
    .max(100, "Max 100 characters allowed"),
  portfolio: yup
    .string()
    .trim()
    .required("Portfolio name is required")
    .max(100, "Max 100 characters allowed"),
  date: yup.date().required("Date is required"),
  quantity: yup
    .number()
    .required("Quantity is required")
    .positive("Quantity must be a positive number")
    .integer("Quantity must be an integer"),
  t_price: yup
    .number()
    .required("T. Price is required")
    .positive("T. Price must be a positive number"),
  c_price: yup
    .number()
    .required("C. Price is required")
    .positive("C. Price must be a positive number"),
  proceeds: yup
    .number()
    .required("Proceeds is required")
    .positive("Proceeds must be a positive number"),
  commissions: yup
    .number()
    .required("Commissions is required")
    .positive("Commissions must be a positive number"),
  basis: yup
    .number()
    .required("Basis is required")
    .positive("Basis must be a positive number"),
  realized_profit_loss: yup.number().required("Realized P/L is required"),
  mtm_profit_loss: yup.number().required("MTM P/L is required"),
});

export const contactSchema = yup.object().shape({
  name: nameSchema("Name is required"),
  email: emailSchema,
  phone_no: yup
    .string()
    .matches(phoneRegex, "Only numbers allowed")
    .min(7, "Please enter a phone number, 7 to 15 digits long.")
    .max(15, "Please enter a phone number, 7 to 15 digits long."),
  message: yup.string(),
  subject: yup.string(),
});

export const ChangePasswordSchema = () =>
  yup.object().shape({
    old_password: yup.string().required("Old Password is required"),
    new_password: passwordSchema("New password is required"),
    confirmPassword: confirmPasswordSchema("new_password"),
  });

//  =======  Auth module schemas =======
export const loginValidationSchema = yup.object().shape({
  email: emailSchema,
  password: yup.string().trim().required("Password is required"),
});

export const ForgotPasswordSchema = () =>
  yup.object().shape({
    email: emailSchema,
  });

export const ResetPasswordSchema = () =>
  yup.object().shape({
    password: NewPasswordSchema("Password"),
    new_password: confirmPasswordSchema("password"),
  });

export const signupValidationSchema = yup.object().shape({
  email: yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string()
    .trim()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirm_password: yup.string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const investorProfileSchema = (frontUrl?: boolean, backUrl?: boolean) =>
  yup.object().shape({
    first_name: nameSchema("First name is required"),
    last_name: nameSchema("Last name is required"),
    email: emailSchema,
    phone_no: yup
      .string()
      .required("Phone number is required")
      .matches(phoneRegex, "Only numbers allowed")
      .min(7, "Please enter a phone number, 7 to 15 digits long.")
      .max(15, "Please enter a phone number, 7 to 15 digits long."),
    investor_type: nameSchema("Investor type is required"),
    address: yup
      .string()
      .trim()
      .required("Address is required")
      .max(200, "Max 200 characters allowed"),
    city: yup
      .string()
      .trim()
      .required("City is required")
      .max(30, "Max 30 characters allowed"),
    state: yup
      .string()
      .trim()
      .required("State is required")
      .max(30, "Max 30 characters allowed"),
    zip_code: yup
      .string()
      .trim()
      .required("Zipcode is required")
      .matches(numberRegex, "Zipcode should be a number only")
      .max(30, "Max 30 characters allowed"),
    verification_type: yup
      .string()
      .trim()
      .required("Verification type is required"),
    front_image_file: frontUrl
      ? null
      : yup.mixed().required("File is required"),
    back_image_file: backUrl ? null : yup.mixed().required("File is required"),
  });

export const addPortfolioSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Portfolio name is required")
    .max(100, "Max 100 characters allowed"),
  account_no: yup
    .string()
    .trim()
    .required("Account number is required")
    .max(100, "Max 100 characters allowed"),
});

export const InviteInvestorSchema = yup.object().shape({
  first_name: nameSchema("First name is required"),
  last_name: nameSchema("Last name is required"),
  email: emailSchema,
});

export const ByPhoneNoModalSchem = yup.object().shape({
  phone_no: yup
    .string()
    .required("Phone number is required")
    .matches(phoneRegex, "Only numbers allowed")
    .min(7, "Please enter a phone number, 7 to 15 digits long.")
    .max(15, "Please enter a phone number, 7 to 15 digits long."),
});

export const verification2FASchema = yup.object({
  verification_code: yup.string()
    .required("Verification code is required")
    .matches(/^\d+$/, "Verification code must be numeric")
    .length(6, "Verification code must be exactly 6 digits"),
});

export const updateInvestorOnboard = yup.object().shape({
  first_name: nameSchema("First name is required"),
  last_name: nameSchema("Last name is required"),

 
});



