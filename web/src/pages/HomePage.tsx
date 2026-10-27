import { useAuth } from "@/features/auth/auth-context";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <h1>Welcome {user.name}</h1>
      ) : (
        <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
          <h1 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl">
            Welcome to Ecommerce Operations
          </h1>
          <p className="text-muted-foreground mt-4 max-w-md text-lg">
            Your workspace for e-commerce operations management.
          </p>
        </div>
      )}
    </>
  );
}
