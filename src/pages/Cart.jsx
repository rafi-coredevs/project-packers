import PriceCard from "../Components/PriceCard/PriceCard";
import Breadcrumb from "../Components/UiElements/Breadcrumb/Breadcrumb";
import Button from "../Components/UiElements/Buttons/Button";
import CartItem from "../Components/UiElements/CartItem/CartItem";
import Input from "../Components/UiElements/Input/Input";


const Cart = () => {


  return (
    <>
      <Breadcrumb />
      <div className="container mx-auto py-12 ">
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 sm:col-span-3 px-5 sm:px-0">
            <table className="w-full">
              <thead className=" text-secondary text-left border-b border-[#00000023]">
                <tr>
                  <th className=" w-9/12 font-semibold pb-[14px]">
                    Product List
                  </th>
                  <th className="w-1/12 font-semibold pb-[14px]">Quantity</th>
                  <th className=" w-2/12 font-semibold pb-[14px] hidden sm:table-cell">
                    {" "}
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart?.map((item) => (
                  <CartItem changeQt={qthandler} key={item.id} data={item} />
                ))}
              </tbody>
            </table>
            <div className="my-8 flex justify-between flex-wrap gap-2">
              <form
                onSubmit={discountHandler}
                className="flex gap-2 flex-wrap justify-center"
              >
                <Input
                  name="discount"
                  type="text"
                  placeholder="Discount code"
                  border
                />

                <Button type="lightGreen" buttonType="submit">
                  Apply
                </Button>
              </form>
              <Button onClick={undateCartHandler} type="light">
                Update Cart
              </Button>
            </div>
            {error && <p className="text-[red]">{error}</p>}
            {discount && (
              <p className="text-[green]">
                {" "}
                Discount code `{discount.code}` successfully applied.
              </p>
            )}
          </div>
          <div className="col-span-5 sm:col-span-2">
            <PriceCard
              type="cart"
              sellerTakes={cost?.sellerTakes}
              tax={cost?.usTax}
              fee={cost?.packersFee}
              estimated={cost?.total}
              disabled={disabled}
              onSubmit={checkoutHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
