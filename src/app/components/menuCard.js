import Image from "next/image";

const MenuCard = ({ item, addToCart, onClick }) => {
  return (
    <div
      key={item.id}
      onClick={onClick}
      className="card lg:card-side bg-base-100 shadow-xl"
    >
      <figure>
        <Image width={400} height={400} src={item.imageUrl} alt={item.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.name}</h2>
        <p>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(item.price)}
        </p>
        <p>{item.description}</p>
        <div className="card-actions justify-end">
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
