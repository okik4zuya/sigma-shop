import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import Button from "../../components/button/button.component";



const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
    console.log(user)
  };
  return (
    <div>
      <h1>Sign In</h1>
      <Button buttonType="google" onClick={logGoogleUser}>Sign In With Google Pop Up</Button>
      <SignUpForm/>
    </div>
  );
};
export default SignIn;
