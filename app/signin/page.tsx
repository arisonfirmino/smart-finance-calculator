import { Card } from "@/app/components/ui/card";
import SignInGitHub from "@/app/signin/components/signin-github";
import SignInGoogle from "@/app/signin/components/signin-google";

const SignIn = () => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center px-5 md:px-0">
      <Card className="w-full max-w-lg space-y-5 p-5">
        <div className="w-full">
          <h2 className="text-xl font-bold">Faça login</h2>
          <p className="text-gray-400">para acessar a aplicação</p>
        </div>

        <SignInGitHub />
        <SignInGoogle />

        <p className="text-end text-xs font-light text-gray-400">
          © 2024 Arison. All Rights Reserved
        </p>
      </Card>
    </main>
  );
};

export default SignIn;
