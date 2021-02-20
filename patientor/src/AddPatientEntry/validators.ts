import { isMatch } from "date-fns";

export const validateRequired = (value: string) => {
  if (!value) {
    return 'Field is required';
  }
  return null;
};

export const validateDate = (value: string) => {
  let err;
  if (!value) {
    err = 'Field is required';
  } else if (!isMatch(value, "yyyy-MM-dd")) {
    err = 'Not a date or wrong format';
  }
  return err;
};

export const validateRating = (value: number) => {
  let err;
  if (typeof value === 'undefined') {
    err = 'Field is required';
  } else if (value < 0 || value > 3) {
    err = 'Rating should be between 0 and 3';
  }
  return err;
};

export const validateOptionalDate = (value: string) => {
  let err;
  if (value && !isMatch(value, "yyyy-MM-dd")) {
    err = 'Not a date or wrong format';
  }
  return err;
};