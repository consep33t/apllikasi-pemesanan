import Image from "next/image";

const MenuCard = ({ item, addToCart }) => {
  return (
    <div
      key={item.id}
      className="flex flex-col justify-between items-center bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <div className="w-full h-96">
        <Image
          width={400}
          height={400}
          layout="responsive"
          src={item.imageUrl}
          className="rounded-t-lg md:rounded-none md:rounded-l-lg"
          alt={item.name}
        />
      </div>
      <div className="flex flex-col justify-between p-4 leading-normal w-full">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {item.name}
        </h5>
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(item.price)}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {item.description}
        </p>
        <button
          className="mt-4 bg-[#d9727b] hover:bg-[#B11824] text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          onClick={() => addToCart(item)}
        >
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
