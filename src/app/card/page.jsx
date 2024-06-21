const cardPage = () => {
  return (
    <div className="w-full h-screen px-10 gap-5">
      <div className="container mx-auto mt-4">
        <div className="flex justify-center">
          <table className="w-full table-auto border-collapse border border-black">
            <thead>
              <tr>
                <th className="border border-black px-4 py-2">Nama</th>
                <th className="border border-black px-4 py-2">No. HP</th>
                <th className="border border-black px-4 py-2">Menu</th>
                <th className="border border-black px-4 py-2">Harga</th>
                <th className="border border-black px-4 py-2">Status</th>
                <th className="border border-black px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black px-4 py-2">Ageng</td>
                <td className="border border-black px-4 py-2">08123456789</td>
                <td className="border border-black px-4 py-2">Nama Menu</td>
                <td className="border border-black px-4 py-2">Rp.25000</td>
                <td className="border border-black px-4 py-2">Status</td>
                <td className="border border-black px-4 py-2">
                  <button className="mr-2 bg-blue-500 text-white px-2 py-1 rounded">
                    Pesanan Selesai
                  </button>
                  <button className="bg-green-500 text-white px-2 py-1 rounded">
                    Pesanan Diambil
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default cardPage;
