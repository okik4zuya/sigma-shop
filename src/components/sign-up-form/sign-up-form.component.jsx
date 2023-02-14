import './sign-up-form.styles.scss';
import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component';

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password do not match!");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      setFormFields(defaultFormFields);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      }
      console.log("user creation encountered an error", error);
    }
  };

  return (
    <div className="sign-up-container">
        <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormInput
          label="Display Name"
          inputOptions={{
            name: "displayName",
            type: "text",
            required: true,
            onChange: handleChange,
            value: displayName,
          }}
        />
        <FormInput
          label="Email"
          inputOptions={{
            name: "email",
            type: "email",
            required: true,
            onChange: handleChange,
            value: email,
          }}
        />
        <FormInput
          label="Password"
          inputOptions={{
            name: "password",
            type: "password",
            required: true,
            onChange: handleChange,
            value: password,
          }}
        />
        <FormInput
          label="Confirm Password"
          inputOptions={{
            name: "confirmPassword",
            type: "password",
            required: true,
            onChange: handleChange,
            value: confirmPassword,
          }}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};
export default SignUpForm;
