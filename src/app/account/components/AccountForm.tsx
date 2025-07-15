import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";
import Form from "next/form";

export const AccountForm = (props: {
  onSubmit: (value: string) => void;
  defaultValue?: string;
  children?: React.ReactNode;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    if (inputRef.current?.value) {
      props.onSubmit(inputRef.current.value);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Form action={handleSave} className="flex flex-col gap-4 p-4">
      <Input
        defaultValue={props.defaultValue || ""}
        placeholder="Account Name"
        ref={inputRef}
      />
      <Button type="submit">Save</Button>
      {props.children}
    </Form>
  );
};
