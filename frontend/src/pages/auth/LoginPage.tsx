import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Mascot from "../../components/mascot/Mascot";
import { useAuth } from "../../context/AuthContext";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

type FormValues = z.infer<typeof schema>;

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      setError(null);
      await login(values.email, values.password);
      navigate("/child");
    } catch {
      setError("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr,1fr]">
      <Card>
        <h2 className="text-2xl font-bold text-ink">Parent Login</h2>
        <p className="mt-2 text-sm text-slate-600">Welcome back! Sign in to manage your family.</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Email" type="email" error={errors.email?.message} {...register("email")} />
          <Input
            label="Password"
            type="password"
            error={errors.password?.message}
            {...register("password")}
          />
          {error && <p className="text-sm text-rose-500">{error}</p>}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Login"}
          </Button>
        </form>
        <p className="mt-4 text-sm text-slate-600">
          New to BrightByte?{" "}
          <Link to="/auth/signup" className="font-semibold text-ocean">
            Create an account
          </Link>
        </p>
      </Card>
      <Mascot message="Parents only! We'll keep your child's learning safe and private." />
    </div>
  );
};

export default LoginPage;
