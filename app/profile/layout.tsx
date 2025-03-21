import NavbarDash from "../components/NavbarDash";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <NavbarDash />
      {children}
    </div>
  );
};

export default Layout;
