export default function AdminLayout({ children }) {
  return (
    <div>
      <nav className="bg-gray-800 p-4 text-white">
        <ul className="flex space-x-4">
          <li>
            <a href="/admin/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/admin/orders">Orders</a>
          </li>
          <li>
            <a href="/admin/orders/history">Orders History</a>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
}
