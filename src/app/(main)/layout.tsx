import "../globals.css";
import SideMenu from "@/components/SideMenu";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SideMenu />
      {children}
    </>
  );
}
