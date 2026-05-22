import Form from "@/components/Form";
import Hero from "@/components/Hero";
export default function Home() {
  return (
    <div>
      <Hero />
      <div className="container mx-auto flex  border">
        <div className="w-[50%]">
          hi
        </div>
        <Form />
      </div>
    </div>
  );
}
