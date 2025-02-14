import "../globals.css";
import TopMenu from "@/components/TopMenu";
import SideMenu from "@/components/SideMenu";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopMenu />
      <SideMenu />
      {children}
    </>
  );
}
