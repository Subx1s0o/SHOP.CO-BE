import * as Yup from "yup";

const UserSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const validateLoginUserDTO = async (data) => {
  try {
    await UserSchema.validate(data, { abortEarly: false });
  } catch (error) {
    const validationErrors = error.inner.reduce((acc, err) => {
      if (err.path) {
        acc[err.path] = err.message;
      }
      return acc;
    }, {});

    throw {
      statusCode: 400,
      message: "Validation failed",
      errors: validationErrors,
    };
  }
};

export default validateLoginUserDTO;
