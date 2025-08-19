"use client";

import { Button } from "@/components/ui/button";
import { useJar } from "@/hooks/useJar";
import { useUpsertJar } from "@/hooks/useUpsertJar";
import { useRouter, useSearchParams } from "next/navigation";
import { JarForm } from "./components/JarForm";

const JarPage = () => {
  const searchParams = useSearchParams();
  const jarId = searchParams.get("jarId");
  const { upsertJar } = useUpsertJar();

  const router = useRouter();

  const { data: jar, isLoading } = useJar(Number(jarId));

  const handleSave = async (value: string) => {
    if (jar) {
      const updatedJar = {
        ...jar,
        name: value,
      };
      await upsertJar(updatedJar);
      router.push("/jars");
    }
  };

  const handleDelete = async () => {
    if (jar) {
      await upsertJar({ ...jar, deletedAt: new Date() });
      router.push("/jars");
    }
  };

  if (isLoading || !jar) {
    return null;
  }

  return (
    <JarForm onSubmit={handleSave} defaultValue={jar?.name || ""}>
      <Button onClick={handleDelete} type="button">
        Delete
      </Button>
    </JarForm>
  );
};

export default JarPage;
