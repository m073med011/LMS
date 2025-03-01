import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title=" SignIn Dashboard | Academix "
        description="This is React.js SignIn Tables Dashboard page for Academix - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
