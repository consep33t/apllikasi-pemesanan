import Image from "next/image";
const AdminNavBar = () => {
  return (
    <div className="drawer fixed left-0 top-2/4 z-50 ">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer"
          className="btn btn-primary drawer-button bg-transparent border-none py-0 px-1 hover:translate-x-2 hover:bg-gray-700 hover:border-none"
        >
          <Image
            src="/arrow.png"
            width={20}
            height={20}
            alt="menu"
            className="w-6 h-6"
          />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <h2 className="text-xl font-bold text-center mb-2">
            Nasi Goreng Cak Lontong
          </h2>
          <li>
            <a href="/admin/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/admin/menu">Menu</a>
          </li>
          <li>
            <a href="/admin/orders">Orders</a>
          </li>
          <li>
            <a href="/admin/orders/history">Orders History</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminNavBar;
