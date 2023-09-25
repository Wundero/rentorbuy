import { CurrentSettings } from "~/components/CurrentSettings";
import { ThemeButton } from "~/components/ThemeButton";

export default function Home() {
  return (
    <>
      <main className="relative flex h-full items-center justify-center bg-background text-foreground">
        <div className="absolute right-0 top-0 z-10 p-5 flex gap-2">
          <CurrentSettings />
          <ThemeButton />
        </div>
        <div className="flex justify-around w-full">
          <section className="">TODO table</section>
          <section className="">TODO chart</section>
        </div>
      </main>
    </>
  );
}
