"use client";

import { useUpsertJar } from "@/hooks/useUpsertJar";
import { useRouter } from "next/navigation";
import { JarForm } from "../components/JarForm";

const JarNewPage = () => {
  const { upsertJar } = useUpsertJar();

  const router = useRouter();

  const handleSave = async (value: string) => {
    await upsertJar({ name: value, type: "jar" });
    router.push("/jars");
  };

  return <JarForm onSubmit={handleSave} />;
};

export default JarNewPage;
