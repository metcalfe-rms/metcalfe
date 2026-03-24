import Image from "next/image";
import { MetcalfeLogo } from "@/assets";

export function LoadingScreen() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6">
      <Image
        src={MetcalfeLogo}
        alt="Metcalfe logo"
        priority
        className="h-auto w-40 animate-pulse sm:w-48"
      />
    </main>
  );
}
