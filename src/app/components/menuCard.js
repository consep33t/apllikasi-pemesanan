import Image from "next/image";

const MenuCard = ({ item, addToCart, onClick }) => {
  return (
    <div
      key={item.id}
      onClick={onClick}
      className="card w-full md:w-[400px] lg:w-[610px] h-auto lg:h-96 lg:card-side bg-base-100 shadow-xl flex-col lg:flex-row"
    >
      <figure className="w-full lg:w-2/3 object-cover h-64 lg:h-full">
        <Image width={400} height={400} src={item.imageUrl} alt={item.name} />
      </figure>
      <div className="card-body w-full lg:w-2/6 p-4 lg:p-6 flex justify-evenly">
        <h2 className="card-title text-xl lg:text-2xl">{item.name}</h2>
        {/* <p className="text-sm lg:text-base">{item.description}</p> */}
        <div className="card-actions justify-between mt-4 items-center">
          <p className="text-sm lg:text-base">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(item.price)}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(item);
            }}
            className="btn btn-primary bg-[#d9727b] hover:bg-[#B11824] transition-colors duration-200 border-none"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
