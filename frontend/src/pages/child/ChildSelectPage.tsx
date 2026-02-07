import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Mascot from "../../components/mascot/Mascot";
import { useAuth } from "../../context/AuthContext";
import { useChild } from "../../context/ChildContext";

const schema = z.object({
  displayName: z.string().min(2, "Name is required"),
  age: z.coerce.number().min(8).max(14)
});

type FormValues = z.infer<typeof schema>;

const ChildSelectPage = () => {
  const { parent, logout } = useAuth();
  const { children, refreshChildren, selectChild, addChild, loading } = useChild();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  useEffect(() => {
    refreshChildren();
  }, []);

  const onSubmit = async (values: FormValues) => {
    try {
      setError(null);
      await addChild({ displayName: values.displayName, age: values.age });
      navigate("/child/dashboard");
    } catch {
      setError("Unable to add child. Please try again.");
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
      <section className="space-y-6">
        <Card>
          <h2 className="text-2xl font-bold text-ink">Choose a learner</h2>
          <p className="mt-2 text-sm text-slate-600">
            Welcome, {parent?.displayName}. Select a child profile or create a new one.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {loading && <p className="text-sm text-slate-500">Loading profiles...</p>}
            {children.map((child) => (
              <button
                key={child.id}
                onClick={() => {
                  selectChild(child);
                  navigate("/child/dashboard");
                }}
                className="rounded-3xl border border-slate-100 bg-white p-4 text-left shadow-sm transition hover:border-ocean/40"
              >
                <p className="text-lg font-semibold text-ink">{child.displayName}</p>
                <p className="text-sm text-slate-500">Age {child.age}</p>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-semibold text-ink">Add a child</h3>
          <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input label="Child name" error={errors.displayName?.message} {...register("displayName")} />
            <Input
              label="Age (8-14)"
              type="number"
              error={errors.age?.message}
              {...register("age")}
            />
            {error && <p className="text-sm text-rose-500">{error}</p>}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Create Profile"}
            </Button>
          </form>
        </Card>
        <Button variant="ghost" onClick={() => logout()}>
          Sign out
        </Button>
      </section>
      <Mascot message="Pick a profile so I can customize lessons just right!" />
    </div>
  );
};

export default ChildSelectPage;
