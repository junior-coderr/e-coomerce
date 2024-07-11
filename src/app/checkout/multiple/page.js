"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Back from "@/app/profile/profile_components/button/back_btn";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// pages/index.js
import Flag from "react-flagkit";
import { useDisclosure } from "@chakra-ui/react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import toast from "react-hot-toast";
function Message({ content }) {
  return <p>{content}</p>;
}
export default function Multiple() {
  const chakra_toast = useToast();
  const [addressToBeShown, setAddressToBeShown] = useState(null);
  const [isLoading, setIsLoading] = useState({});
  function removeItemFromCart(e) {
    const product_id = e.target.getAttribute("id");
    setIsLoading({ ...isLoading, [product_id]: true });
    console.log("product_id", product_id);

    fetch("/api/alter-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        if (data.success) {
          toast.success("Item removed from cart");
          getCartItems();
        } else {
          toast.error("Could not remove item from cart");
        }
        setIsLoading({ ...isLoading, [product_id]: false });
      })
      .catch((error) => {
        console.error(error);
        setIsLoading({ ...isLoading, [product_id]: false });
      });
  }
  function HomePage({ text }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(false);
    const countries = [
      { name: "United States", code: "US", prefix: "+1" },
      { name: "United Kingdom", code: "GB", prefix: "+44" },
      { name: "Canada", code: "CA", prefix: "+1" },
      { name: "Australia", code: "AU", prefix: "+61" },
      { name: "Germany", code: "DE", prefix: "+49" },
      { name: "France", code: "FR", prefix: "+33" },
      { name: "Japan", code: "JP", prefix: "+81" },
      { name: "India", code: "IN", prefix: "+91" },
      { name: "Brazil", code: "BR", prefix: "+55" },
    ];

    const [isValid, setIsValid] = useState({
      firstName: false,
      firstNameValue: "",
      prefix: true,
      prefixValue: "+1",
      phone: false,
      phoneValue: "",
      street: false,
      streetValue: "",
      streetOptionalValue: "",
      city: false,
      cityValue: "",
      state: false,
      stateValue: "",
      zip: false,
      zipValue: "",
    });

    const addingAddress = async () => {
      if (
        isValid.firstName &&
        isValid.phone &&
        isValid.street &&
        isValid.city &&
        isValid.state &&
        isValid.zip &&
        isValid.prefix
      ) {
        setLoading(true);
        try {
          const response = await fetch("/api/add-address", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              address: {
                country: selectedCountry,
                code: selected,
                prefix: isValid.prefixValue,
                firstName: isValid.firstNameValue,
                phone: isValid.phoneValue,
                street: isValid.streetValue,
                streetOptional: isValid.streetOptionalValue,
                city: isValid.cityValue,
                state: isValid.stateValue,
                zip: isValid.zipValue,
              },
            }),
          });

          const address = await response.json();
          setLoading(false);
          console.log("address", address);
          if (address.success) {
            setAddressToBeShown({
              country: selectedCountry,
              code: selected,
              prefix: isValid.prefixValue,
              firstName: isValid.firstNameValue,
              phone: isValid.phoneValue,
              street: isValid.streetValue,
              streetOptional: isValid.streetOptionalValue,
              city: isValid.cityValue,
              state: isValid.stateValue,
              zip: isValid.zipValue,
            });

            getCartItems();

            onClose();
            console.log("Address added successfully");
            toast.success("Address added successfully");
          } else {
            toast.error("Could not add address");
          }
        } catch (error) {
          toast.error("Could not add address error");
          setLoading(false);
        }
      } else {
        if (!isValid.firstName) {
          toast.error("First name is required");
        } else if (!isValid.prefix) {
          toast.error("Prefix is required");
        } else if (!isValid.phone) {
          toast.error("Phone number is required");
        } else if (!isValid.street) {
          toast.error("Street is required");
        } else if (!isValid.city) {
          toast.error("City is required");
        } else if (!isValid.state) {
          toast.error("State is required");
        } else if (!isValid.zip) {
          toast.error("Zip code is required");
        } else {
          toast.error("All fields are required");
        }
      }

      // addring switch case for data validation
    };

    const [selected, setSelected] = useState(countries[0].code);
    const [countryPrefix, setCountryPrefix] = useState(countries[0].prefix);
    const [selectedCountry, setSelectedCountry] = useState(countries[0].name);
    return (
      <>
        <Button onClick={onOpen}>
          <span className="text-[#3f3f3f]">{text}</span>
        </Button>

        <Modal
          closeOnOverlayClick={false}
          isOpen={isOpen}
          onClose={onClose}
          size={"full"}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader className="text-center">
              <div className="text-2xl font-bold">Add Address</div>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <div className="w-full  max-w-[800px] mx-auto ">
                <Menu>
                  {({ isOpen }) => (
                    <>
                      <MenuButton isActive={isOpen} as={Button}>
                        <div className="flex gap-2">
                          <Flag country={selected} />
                          <span className="text-[#3f3f3f]">
                            {selectedCountry}
                          </span>
                          <i className="bi bi-chevron-down"></i>
                        </div>
                      </MenuButton>
                      <MenuList>
                        {countries.map((country, index) => (
                          <MenuItem
                            key={index}
                            onClick={() => {
                              setSelected(country.code);
                              setSelectedCountry(country.name);
                              setCountryPrefix(country.prefix);
                              isValid.prefixValue = country.prefix;
                            }}
                          >
                            <Flag country={country.code} />
                            <span className="text-[#3f3f3f] ml-2">
                              {country.name}
                            </span>
                          </MenuItem>
                        ))}
                      </MenuList>
                    </>
                  )}
                </Menu>

                <div className="mt-4 w-full">
                  <h3 className="text-xl font-bold">Contact Information</h3>
                  <div className="flex gap-4 mt-2 flex-wrap">
                    <input
                      type="text"
                      placeholder="First Name"
                      className={`border-[1px] border-[#EAEAF1] p-2 ${
                        isValid.firstNameValue != ""
                          ? isValid.firstName
                            ? ""
                            : "border-red-500 outline-[#b70202]"
                          : ""
                      }`}
                      onChange={(e) => {
                        setIsValid({
                          ...isValid,
                          firstName: e.target.value.length > 2 ? true : false,
                          firstNameValue: e.target.value,
                        });
                      }}
                    />
                    <div className="flex gap-[2px]">
                      <input
                        type="text"
                        placeholder="+"
                        // className="border-[1px] border-[#EAEAF1] p-2 max-w-[60px]"
                        className={`border-[1px] border-[#EAEAF1] p-2 max-w-[60px] ${
                          isValid.prefixValue != ""
                            ? isValid.prefix
                              ? ""
                              : "border-red-500 outline-[#b70202]"
                            : ""
                        }`}
                        value={countryPrefix}
                        onChange={(e) => {
                          setCountryPrefix(e.target.value);
                          setIsValid({
                            ...isValid,
                            prefix:
                              e.target.value.includes("+") &&
                              e.target.value.length > 1
                                ? true
                                : false,
                            prefixValue: e.target.value,
                          });
                        }}
                      />
                      <input
                        type="number"
                        // className="border-[1px] border-[#EAEAF1] p-2 addrInp"
                        className={`border-[1px] border-[#EAEAF1] p-2 ${
                          isValid.phoneValue != ""
                            ? isValid.phone
                              ? ""
                              : "border-red-500 outline-[#b70202]"
                            : ""
                        }`}
                        placeholder="Phone Number*"
                        onChange={(e) => {
                          setIsValid({
                            ...isValid,
                            phone: e.target.value.length > 4 ? true : false,
                            phoneValue: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 w-full">
                  <h3 className="text-xl font-bold">Address</h3>
                  <div className="flex gap-4 w-full mt-2 flex-wrap">
                    <input
                      type="text"
                      placeholder="Street, house/apartment*"
                      className={`border-[1px] border-[#EAEAF1] p-2 w-full ${
                        isValid.streetValue != ""
                          ? isValid.street
                            ? ""
                            : "border-red-500 outline-[#b70202]"
                          : ""
                      }`}
                      onChange={(e) => {
                        setIsValid({
                          ...isValid,
                          street: e.target.value.length > 4 ? true : false,
                          streetValue: e.target.value,
                        });
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Apt, suite, etc. (optional)"
                      className="border-[1px] border-[#EAEAF1] p-2 w-full addrInp"
                      onChange={(e) => {
                        setIsValid({
                          ...isValid,
                          streetOptionalValue: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="flex gap-4 mt-2">
                    <input
                      type="text"
                      placeholder="City*"
                      className={`border-[1px] border-[#EAEAF1] p-2 w-full ${
                        isValid.cityValue != ""
                          ? isValid.city
                            ? ""
                            : "border-red-500 outline-[#b70202]"
                          : ""
                      }`}
                      onChange={(e) => {
                        setIsValid({
                          ...isValid,
                          city: e.target.value.length > 2 ? true : false,
                          cityValue: e.target.value,
                        });
                      }}
                    />
                    <input
                      type="text"
                      placeholder="State/Province*"
                      // className="border-[1px] border-[#EAEAF1] p-2 w-full"
                      className={`border-[1px] border-[#EAEAF1] p-2 w-full ${
                        isValid.stateValue != ""
                          ? isValid.state
                            ? ""
                            : "border-red-500 outline-[#b70202]"
                          : ""
                      }`}
                      onChange={(e) => {
                        setIsValid({
                          ...isValid,
                          state: e.target.value.length > 2 ? true : false,
                          stateValue: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="flex gap-4 mt-2 ">
                    <input
                      type="text"
                      placeholder="Zip Code*"
                      // className={`border-[1px] border-[#EAEAF1] p-2 w-full max-w-[220px]`}
                      className={`border-[1px] border-[#EAEAF1] p-2 w-full max-w-[220px] ${
                        isValid.zipValue != ""
                          ? isValid.zip
                            ? ""
                            : "border-red-500 outline-[#b70202]"
                          : ""
                      }`}
                      onChange={(e) => {
                        setIsValid({
                          ...isValid,
                          zip: e.target.value.length > 2 ? true : false,
                          zipValue: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-5 items-end">
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={addingAddress}
                    isLoading={loading}
                  >
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </div>
              </div>
            </ModalBody>

            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  const [cartItems, setCartItems] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);

  useEffect(() => {
    console.log("addressToBeShown", addressToBeShown);
  }, [addressToBeShown]);

  const initialOptions = {
    "client-id":
      "AflEnex5QdfWv-7Y9qorPmePi3LlQ_w4GKazu1AoCm2AVL3gIzB96LCB2EuiuuX4qlKH3jjQl_HN4nKG",
    "enable-funding": "venmo",
    // country: "US",
    currency: "USD",
    "data-page-type": "product-details",
    components: "buttons",
    "data-sdk-integration-source": "developer-studio",
    intent: "capture",
  };

  const style = {
    layout: "vertical",
    color: "blue",
    shape: "rect",
    label: "paypal",
    height: 40,
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    try {
      const response = await fetch("/api/get-cart-items", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const cartItems = await response.json();
      setDeliveryCharges(0);
      if (cartItems.success) {
        console.log("cartItems", cartItems);
        setCartItems(cartItems);
        // calculating total
        setAddressToBeShown(cartItems.address[cartItems.address.length - 1]);
        let total = 0;
        let deliveryCharges = 0;
        cartItems.cart.forEach((item) => {
          total += item.product.product_price * item.quantity;
          deliveryCharges += getShippingharges(
            item.product,
            cartItems.address[cartItems.address.length - 1].code,
            item.quantity
          );
        });
        console.log("deliveryCharges", deliveryCharges.toFixed(2) == false);
        setDeliveryCharges(deliveryCharges.toFixed(2));
        if (!deliveryCharges && cartItems.cart.length > 0) {
          // adding delay to show toast
          setTimeout(() => {
            chakra_toast({
              title: "Address Error",
              position: "top",
              description: "Unable to deliver to this address",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          }, 1200);
        }

        total += deliveryCharges;
        setTotalAmount(total.toFixed(2));
      }
      return cartItems;
    } catch (error) {
      console.error(error);
    }
  };

  const [message, setMessage] = useState("");

  const getShippingharges = (product, country, quantity, type = "DC") => {
    if (!country) return 0;

    let delivery_charges = null;
    let delivery_time = null;

    if (type == "DC") {
      product.delivery_charges.forEach((charge) => {
        if (charge.country == country) {
          delivery_charges += Number(charge.base_charge);
          delivery_charges += Number(charge.increment) * (quantity - 1);
        }
      });
    } else {
      product.delivery_time.forEach((time) => {
        if (time.country == country) {
          delivery_time = time.time;
        }
      });
    }
    if (type == "DT") return delivery_time;
    return delivery_charges;
  };

  // TODO: ADDING INDIVIDUAL UNAVAILABILITY OF PRODUCT WITH RESPECT TO ADDRESS
  // TODO: THIS CAN BE DONE JUST LOOKING AT D VAR IN getShippingharges FUNCTION if it null then not available
  return (
    <div className="w-full">
      <div className="absolute p-2 top-0 left-0">
        <Back dest={"series"}></Back>
      </div>
      <h1 className=" text-center text-2xl font-bold py-2">Checkout items</h1>
      <section className="flex flex-col gap-2">
        {cartItems && cartItems.cart.length > 0 ? (
          cartItems.cart.map((item, index) => (
            <div
              key={index}
              className="border-[1px] w-full rounded-md border-[#EAEAF1] select-none"
            >
              <div className="flex justify-between items-center  flex-shrink-0 ">
                <div className="flex gap-2 items-center ">
                  <Image
                    src={item.product.colorInfo[0].color_image[0]}
                    alt={item.product.product_name}
                    width={150}
                    height={150}
                  />
                  <div className="text-md">
                    <h3 className="font-semibold">
                      {item.product.product_name.length > 20
                        ? item.product.product_name.substring(0, 20) + "..."
                        : item.product.product_name}
                    </h3>
                    <p>Price: ${item.product.product_price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Color: {item.color}</p>
                    <p>Size: {item.size}</p>
                  </div>
                </div>
                <Button
                  isLoading={isLoading[item.product_id]}
                  id={item.product_id}
                  onClick={removeItemFromCart}
                  className=" bg-[#EAEAF1] rounded-full w-0 h-0 flex justify-center items-center p-5 m-2 duration-500 hover:bg-red-100 cursor-pointer"
                >
                  <i
                    className="bi bi-trash text-xl text-black"
                    id={item.product_id}
                  ></i>
                </Button>
              </div>
              {/* shipping details  */}
              <div className="flex justify-end text-sm px-2 pb-1 flex-col font-semibold">
                {}
                <p>
                  Shipping charges: $
                  {addressToBeShown
                    ? getShippingharges(
                        item.product,
                        addressToBeShown.code,
                        item.quantity
                      )
                    : ""}
                </p>
                <p>
                  Estimated Delivery time:{" "}
                  {addressToBeShown
                    ? getShippingharges(
                        item.product,
                        addressToBeShown.code,
                        item.quantity,
                        "DT"
                      )
                    : ""}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">No items in cart</div>
        )}
        <br />
        {/* Adding address if present or showing button to add it */}
        <div
          className={`border-[1px] w-full rounded-md select-none p-3 ${
            deliveryCharges != 0 ? "border-[#EAEAF1]" : "border-[#ff6430]"
          }`}
        >
          <h3 className="text-2xl font-bold text-center mb-4">
            Shipping Address
          </h3>
          {addressToBeShown ? (
            <>
              <div className="flex flex-wrap gap-3 justify-between items-center  flex-shrink-0">
                {/* <div className="flex gap-2 items-center ">
                <h3>Address-</h3>
              </div> */}

                {/* <HomePage /> */}
                {addressToBeShown ? (
                  <div>
                    <p>
                      {addressToBeShown.firstName}
                      {", "} {addressToBeShown.phone}
                    </p>
                    <p>
                      {addressToBeShown.street}
                      {", "} {addressToBeShown.streetOptional}
                    </p>
                    <p>
                      {addressToBeShown.city}
                      {", "} {addressToBeShown.state} {addressToBeShown.zip}
                    </p>
                  </div>
                ) : (
                  "No address added yet"
                )}

                <div>
                  <HomePage text="Change Address" />
                </div>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center  flex-shrink-0 ">
              <HomePage text="Add Address" />
            </div>
          )}
        </div>
        <br />
        {/* calculation and summary of items
         */}
        <div className="flex justify-between items-center flex-shrink-0 border-[1px] w-full rounded-md border-[#EAEAF1] select-none p-2">
          <div className="w-full font-semibold">
            <h3 className="text-2xl mb-4 font-bold text-center w-full m-auto shrink-0 ">
              Summary
            </h3>
            <p>Total items: {cartItems ? cartItems.cart.length : 0}</p>
            {/* addign total delivert charges */}
            <p>
              Total delivery charges: $
              {cartItems && deliveryCharges ? deliveryCharges : 0}
            </p>
            <p>Total amount: ${totalAmount}</p>
          </div>
        </div>
      </section>
      <section className=" App flex flex-col justify-start w-full max-w-[700px] mx-auto p-5 items-center gap-8">
        <div className="w-full">
          <PayPalScriptProvider className="" options={initialOptions}>
            <PayPalButtons
              disabled={
                totalAmount > 0 &&
                addressToBeShown &&
                cartItems.cart.length > 0 &&
                deliveryCharges > 0
                  ? false
                  : true
              }
              style={style}
              createOrder={async () => {
                try {
                  const response = await fetch("/api/payment/createOrder", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    // use the "body" param to optionally pass additional order information
                    // like product ids and quantities
                    body: JSON.stringify({ isSingle: false }),
                  });

                  const orderData = await response.json();

                  if (orderData.id) {
                    return orderData.id;
                  } else {
                    const errorDetail = orderData?.details?.[0];
                    const errorMessage = errorDetail
                      ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                      : JSON.stringify(orderData);

                    throw new Error(errorMessage);
                  }
                } catch (error) {
                  console.error(error);
                  setMessage(`Could not initiate PayPal Checkout...${error}`);
                }
              }}
              onApprove={async (data, actions) => {
                console.log("onApprove", data, actions);
                try {
                  const response = await fetch(
                    `/api/payment/captureOrder/${data.orderID}`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );

                  const orderData = await response.json();
                  // Three cases to handle:
                  //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                  //   (2) Other non-recoverable errors -> Show a failure message
                  //   (3) Successful transaction -> Show confirmation or thank you message

                  const errorDetail = orderData?.details?.[0];

                  if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                    // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                    // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                    return actions.restart();
                  } else if (errorDetail) {
                    // (2) Other non-recoverable errors -> Show a failure message
                    throw new Error(
                      `${errorDetail.description} (${orderData.debug_id})`
                    );
                  } else {
                    // (3) Successful transaction -> Show confirmation or thank you message
                    // Or go to another URL:  actions.redirect('thank_you.html');
                    const transaction =
                      orderData.purchase_units[0].payments.captures[0];
                    setMessage(
                      `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                    );
                    console.log(
                      "Capture result",
                      orderData,
                      JSON.stringify(orderData, null, 2)
                    );
                  }
                } catch (error) {
                  console.error(error);
                  setMessage(
                    `Sorry, your transaction could not be processed...${error}`
                  );
                }
              }}
              onShippingChange={async (data, actions) => {
                return actions.resolve();
              }}
              onError={(error) => {
                console.error(error);
                setMessage(
                  `Sorry, your transaction could not be processed...${error}`
                );
              }}
            />
          </PayPalScriptProvider>
        </div>
        <Message content={message} />
      </section>
    </div>
  );
}
