import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';


export const repairSchema = z.object({
    date: z.string({
        invalid_type_error: "DepartureDate must be a correct format",
        required_error:"DepartureDate is required"
    }),
    status: z.enum(['pending','completed','cancelled']).optional(),
    userid: z.number().positive(),
});

export const validateRepair = (data) => {
  const result = repairSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: repairData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    repairData,
  };
};

export const validatePartialRepair = (data) => {
  const result = repairSchema.partial().safeParse(data);

  const {
    hasError,
    errorMessages,
    data: repairData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    repairData,
  };
};