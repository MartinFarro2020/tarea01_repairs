import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';


export const userSchema = z.object({
  name: z.string()
  .min(3, {message: 'Name is too short'})
  .max(199, { message: 'Name is too long'}),
  email: z.string().email({message:'Invalid email'}),
  password: z.string().min(8, {message: 'Password is too short'}),
  role: z.enum([
    'client','employee'])
});

export const validateUser = (data) => {
  const result = userSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
};

export const validatePartialUser = (data) => {
  const result = userSchema.partial().safeParse(data);

  const {
    hasError,
    errorMessages,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
};
