import { SignIn } from "@clerk/nextjs";

export const runtime = "edge";

export default function Page() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-green-400 to-emerald-600 items-center justify-center p-12">
        <blockquote className="text-white text-2xl font-light italic text-center">
          &ldquo;The secret to making money is to embrace opportunities, not
          chase them.&rdquo;
          <footer className="mt-4 text-white text-lg">- Robert Kiyosaki</footer>
        </blockquote>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-12">
        <SignIn />
      </div>
    </div>
  );
}
