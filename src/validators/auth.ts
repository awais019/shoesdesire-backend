import JOI from "joi";

export default {
  signin: ({ email, password }: { email: string; password: string }) => {
    const schema = JOI.object({
      email: JOI.string().email().required(),
      password: JOI.string().required(),
    });

    return schema.validate({ email, password });
  },
};
