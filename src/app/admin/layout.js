import AdminNavBar from "../components/adminNavBar";

export default function AdminLayout({ children }) {
  return (
    <div>
      <AdminNavBar />
      <main>{children}</main>
    </div>
  );
}
