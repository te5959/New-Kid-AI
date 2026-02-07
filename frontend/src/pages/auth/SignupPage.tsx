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
  displayName: z.string().min(2, "Display name is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

type FormValues = z.infer<typeof schema>;

const SignupPage = () => {
  const { register: registerParent } = useAuth();
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
      await registerParent(values.email, values.password, values.displayName);
      navigate("/child");
    } catch {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr,1fr]">
      <Card>
        <h2 className="text-2xl font-bold text-ink">Create Parent Account</h2>
        <p className="mt-2 text-sm text-slate-600">Set up your family learning space.</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Parent Name"
            type="text"
            error={errors.displayName?.message}
            {...register("displayName")}
          />
          <Input label="Email" type="email" error={errors.email?.message} {...register("email")} />
          <Input
            label="Password"
            type="password"
            error={errors.password?.message}
            {...register("password")}
          />
          {error && <p className="text-sm text-rose-500">{error}</p>}
          <div className="text-xs text-slate-500">
            By continuing, you agree to provide parental consent and accept our privacy promise.
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Account"}
          </Button>
        </form>
        <p className="mt-4 text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/auth/login" className="font-semibold text-ocean">
            Sign in
          </Link>
        </p>
      </Card>
      <Mascot message="Welcome! I'll help keep everything clear and kid-safe." />
    </div>
  );
};

export default SignupPage;
