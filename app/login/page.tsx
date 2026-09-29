import type { Metadata } from "next";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = { title: "Login — CAT SIM JF" };

const AuthLayout = ({
  children,
  logo,
}: {
  children: React.ReactNode;
  logo?: string;
}) => {
  return (
    <div className="relative min-h-screen w-full overflow-visible">
      {/* Full-screen background image (stretched) */}
      <img
        src="/assets/img/BG_Portal_New.png"
        alt="Background"
        className="fixed inset-0 w-full h-full object-cover z-0"
      />

      {/* Optional dark overlay for readability */}
      <div className="fixed inset-0 bg-black/50 z-0" />

      {/* Outer wrapper with vertical padding */}
      <div className="relative z-20 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {/* Form container with dynamic height */}
        <div className="w-full max-w-md bg-gray-400/20 backdrop-blur-sm rounded-xl shadow-lg p-8 my-8">
          {/* Logo */}
          {logo && (
            <div className="flex justify-center mb-8">
              <img src={logo} alt="Logo" className="h-24" />
            </div>
          )}

          {/* Children content */}
          <div className="space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default function LoginPage() {
  return (
    <AuthLayout logo="/assets/img/company_logo.png">
      <LoginForm />
    </AuthLayout>
  );
}
