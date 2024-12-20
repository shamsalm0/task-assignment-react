import { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

import './App.css';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

function App() {
  const [quantity, setQuantity] = useState(0);
  
  const [productList, setProductList] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({
    image: "../public/violet.png",
    color: "#816BFF",
    colorName: "violet",
    size: "S",
    price: 69,
    quantity: 0,
  });
  const [selectedItemPrice, setSelectedItemPrice] = useState(69);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateTotalPrice = () => {
    return selectedItemPrice * quantity;
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
    setCurrentProduct({ ...currentProduct, quantity: quantity + 1 });
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
      setCurrentProduct({ ...currentProduct, quantity: quantity - 1 });
    }
  };

  const handleColorChange = (color, image) => {
    setCurrentProduct({ ...currentProduct, color, image });
  };

  const handleSizeChange = (size, price) => {
    setSelectedItemPrice(price);
    setCurrentProduct({ ...currentProduct, size, price });
  };

  const addToCart = () => {
    if (currentProduct.quantity > 0) {
      setProductList([...productList, { ...currentProduct }]);
      setQuantity(0);
      setCurrentProduct({ ...currentProduct, quantity: 0 });
    }
  };

  const handleContinueShopping = () => {
    setIsModalOpen(false);
  };

  const handleConfirmCheckout = () => {
    setProductList([]);
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log("Updated product list:", productList);
  }, [productList]);

  const totalQuantity = productList.reduce((sum, product) => sum + product.quantity, 0);
  const totalAmount = productList.reduce((sum, product) => sum + product.price * product.quantity, 0);

  return (
    <div className="relative container mx-auto px-8 pt-12 flex flex-col items-center gap-16">
      {/* Product Section */}
      <div className="lg:flex gap-[60px] max-w-[1320px] w-full items-center h-[720px]">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            id="product-image"
            className="w-full h-[300px] md:h-[500px] lg:h-auto max-h-[720px] object-cover rounded-lg shadow-lg"
            src={currentProduct.image}
            alt="Product"
            height="720"
          />
        </div>

        {/* Product Details */}
        <div className="w-full">
          <div className="py-3">
            <p className="font-semibold text-[24px] md:text-[40px] text-[#364A63] md:leading-[44px]">
              Classy Modern Smart Watch
            </p>
          </div>

          {/* Rating */}
          <div className="pr-1 pb-1 flex gap-1 items-center">
            <FaStar className="fa-solid fa-star fa-sm text-[#FFD200]"/>
            <FaStar className="fa-solid fa-star fa-sm text-[#FFD200]"/>
            <FaStar className="fa-solid fa-star fa-sm text-[#FFD200]"/>
            <FaStarHalfAlt className="fa-regular fa-star-half-stroke text-[#FFD200]"/>
            <FaRegStar className="fa-regular fa-star text-[#FFD200]"/>
            <span className="md:text-base md:leading-[23.1px] text-sm text-[#8091A7]">(2 reviews)</span>
          </div>

          {/* Pricing */}
          <div className="md:pt-[5px] flex gap-[5px]">
            <p id="previousPrice" className="text-[12px] md:text-[20px] text-[#8091A7] leading-[30px] font-normal line-through">
              $99.00
            </p>
            <p id="newPrice" className="text-[16px] md:text-[24px] text-[#6576FF] leading-[30px] font-bold">
              $79.00
            </p>
          </div>

          {/* Product Description */}
          <div className="flex pt-1 md:pt-3 lg:pt-5 pr-1 gap-[8px]">
            <p className="font-base text-[12px] md:text-[18px] text-[#8091A7] md:leading-[30px]">
              I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I
              will give you a complete account of the system.
            </p>
          </div>

          {/* Product Attributes */}
          <div className="flex pt-1 md:pt-3 lg:pt-5 pr-1 gap-[43px]">
            <div>
              <p className="text-[8px] md:text-sm md:leading-[23.1px] font-normal text-[#8091A7]">Type</p>
              <p className="text-[10px] md:text-base font-bold md:leading-[23px] text-[#364A63]">Watch</p>
            </div>
            <div>
              <p className="font-normal text-[8px] md:text-sm md:leading-[23.1px] text-[#8091A7]">Model Number</p>
              <p className="font-bold text-[10px] md:text-base md:leading-[23px] text-[#364A63]">Forerunner 290XT</p>
            </div>
          </div>

          {/* Color Selection */}
          <div className="pt-1 md:pt-3 lg:pt-5 pr-1 flex flex-col gap-[10px]">
            <p className="text-base md:text-lg font-bold leading-5 text-[#364A63]">Band Color</p>
            <div className="flex flex-row gap-[19px] ml-1">
            {[
              { color: "#816BFF", image: "/src/assets/violet.png" },
              { color: "#1FCEC9", image: "/src/assets/green.png" },
              { color: "#4B97D3", image: "/src/assets/blue.png" },
              { color: "#3B4747", image: "/src/assets/black.png" },
            ].map((band) => (
              <div
                key={band.color}
                className={`w-[18px] h-[18px]  rounded-full  ${currentProduct.color === band.color ? ` outline outline-offset-2 outline-2 outline-${band.color}` : ""}`}
                style={{ backgroundColor: band.color,
                  outlineColor: currentProduct.color === band.color ? band.color : "transparent",
                 }}
                onClick={() => handleColorChange(band.color, band.image)}
              ></div>
            ))}
            </div>
          </div>
          {/*  */}
          <div className="pt-2 md:pt-3 lg:pt-5 flex flex-col gap-[10px] justify-center ">
                    
                        <p className="font-bold text-base md:text-lg leading-5">Wrist Size</p>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px] w-1/2">
                   {[
              { size: "S", price: 69 },
              { size: "M", price: 79 },
              { size: "L", price: 89 },
              {size:"XL", price: 99}
            ].map((size) => (
           
                <div  key={size.size} className={` ${currentProduct.size === size.size ? "bg-blue-100 text-[#6576FF]" : ""}  px-[18px] py-[8px] border border-[#DBDFEA]  flex items-center gap-[10px] rounded-[3px] font-bold text-[13px] leading-5 `}
                onClick={() => handleSizeChange(size.size, size.price)}>
                        <span className="">{size.size} </span><span className="font-normal text-[#8091A7]">${size.price}</span>
                    </div>
                
              
            ))}
                   </div>
                </div>
          {/* Cart Controls */}
          <div className="pt-2 md:pt-3 lg:pt-5 flex items-center gap-[12px]">
            <div className="h-9 flex border border-[#DBDFEA] rounded-[4px]">
              <button
                className="px-3 py-3 h-9 flex items-center gap-[10px] border-[0.5px] border-[#DBDFEA] text-[#DBDFEA]"
                onClick={handleDecrement}
              >
                <FaMinus className=""/>
              </button>
              <div className="flex gap-[10px] px-[26px] py-[3px]">
                <p id="quantity">{quantity}</p>
              </div>
              <button
                className="px-3 py-3 h-9 flex items-center gap-[10px] border-[0.5px] border-[#DBDFEA] text-[#364A63]"
               onClick={handleIncrement}
              >
                <FaPlus className="" fill='#DBDFEA'/>
              </button>
            </div>
            <button
              id="addToCart"
              className="px-[18px] py-[8px] flex gap-[10px] bg-[#6576FF] border rounded-[3px] text-[13px] text-white leading-5 font-bold"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="mt-[30px] md:mt-[20vh] lg:mt-0 lg:relative  lg:flex   py-5 ">
        <div className="h-[42px] py-2 px-6 flex gap-[10px] border-none rounded-[24px] bg-[#FFBB5A]">
            <button className="flex items-center gap-[10px]" id="checkOut" onClick={() => setIsModalOpen(true)}> CheckOut <div className="bg-white px-[6px] py-[2px] flex gap-[8px] rounded-[5px]"> <span id="checkOut-count" className=" text-[#364A63] text-[12px] leading-[16px] font-bold ">{totalQuantity}</span> </div></button>
        </div>
    </div>
    {isModalOpen && (
        <div id="modal" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col gap-[16px] bg-white border rounded-[20px] p-[44px]">
          <div className="flex gap-[10px] border-b">
            <h3 className="text-[22px] text-[#364A63] leading-6 font-bold">Your Cart</h3>
          </div>

          <table className="w-full table-fixed border-collapse">
            <thead className="pt-1 pb-2 pr-1 border-b text-[#8091A7] text-sm leading-[23.1px] font-normal border-[#DBDFEA]">
              <tr>
                <th className="text-left w-[20%] md:w-[50%]">Item</th>
                <th className="text-center w-[10%]">Color</th>
                <th className="text-center w-[10%]">Size</th>
                <th className="text-center w-[10%]">Qnt</th>
                <th className="text-right w-[10%] md:w-[20%]">Price</th>
              </tr>
            </thead>
            <tbody id="cart-table-body">
              {productList.map((product, index) => (
                <tr key={index} className="border-b border-[#DBDFEA]">
                  <td className="w-[278px] flex gap-2 items-center pr-1 pb-4">
                    <div className="py-1">
                      <img
                        src={product.image}
                        className="rounded-[3px]"
                        height="36"
                        width="36"
                        alt="Product Image"
                      />
                    </div>
                    <p className="hidden md:flex text-sm text-[#364A63] font-normal leading-[23.1px]">
                      Classy Modern Smart watch
                    </p>
                  </td>
                  <td className="text-[#364A63] text-sm font-normal leading-[23.1px] text-center">
                    <p>{product.colorName}</p>
                  </td>
                  <td className="text-[#364A63] text-sm font-bold leading-[23.1px] text-center">
                    <p>{product.size}</p>
                  </td>
                  <td className="text-[#364A63] text-sm font-bold leading-[23.1px] text-center">
                    <p>{product.quantity}</p>
                  </td>
                  <td className="text-[#364A63] text-sm font-bold leading-[23.1px] text-right">
                    <p>${product.price * product.quantity}</p>
                  </td>
                </tr>
              ))}

              <tr>
                <td className="font-bold text-base text-[#373737] leading-[22px]">Total</td>
                <td className="text-[#364A63] text-sm font-normal leading-[23.1px] text-center"></td>
                <td className="text-[#364A63] text-sm font-bold leading-[23.1px] text-center"></td>
                <td className="text-[#364A63] text-sm font-bold leading-[23.1px] text-center">
                  <p>{totalQuantity}</p>
                </td>
                <td className="text-[#364A63] text-sm font-bold leading-[23.1px] text-right">
                  <p id="total-price">${totalAmount}</p>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-end pt-[10px]">
            <div className="flex justify-end gap-6">
              <div
                className="py-2 px-[18px] flex gap-[10px] border border-[#DBDFEA] rounded-[3px] cursor-pointer"
                onClick={handleContinueShopping}
              >
                <p className="text-[10px] md:text-[13px] text-[#364A63] font-bold md:leading-5">
                  Continue Shopping
                </p>
              </div>
              <button id="confirm-checkout" className="md:flex md:gap-[10px] md:py-2 px-[18px] rounded-[3px] bg-[#6576FF] text-[13px] text-[#FFFFFF] font-bold md:leading-5" onClick={handleConfirmCheckout}>CheckOut</button>
            </div>
        </div>
    </div>
    )
  }
    </div>
  );
}

export default App;
