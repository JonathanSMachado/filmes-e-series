type ContactFormProps = {
  values: {
    name: string;
    email: string;
    message: string;
  };
  errors: any;
  globalError?: string;
};
