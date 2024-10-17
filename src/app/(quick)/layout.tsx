import { FooterComponent } from "@/components/landing-page/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <FooterComponent />
    </div>
  );
}
