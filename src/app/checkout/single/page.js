"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import localStorage from "@/app/components/helper/localStorage";
import Back from "@/app/profile/profile_components/button/back_btn";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
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

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import toast from "react-hot-toast";

// Renders errors or successfull transactions on the screen.
function Message(props) {
  const { success, error, content } = props.res;
  if (success) {
    toast.success("Transaction was successful!");
  } else if (error) {
    toast.error("Transaction failed!");
  } else {
    return null;
  }
}
export default function Single() {
  const chakra_toast = useToast();
  function HomePage({ text }) {
    // const toast = useToast();
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
            loadProductDetails()
              .then((res) => {
                if (res.success) {
                  setProductDetails({
                    ...res.data,
                    delivery_charges: res.delivery_charges,
                    increment: res.increment,
                    estimated_delivery_time: res.estimated_delivery_time,
                  });
                  console.log("res", res);
                  setAddressToBeShown(res.address);
                }
              })
              .catch((error) => {
                console.log("error", error);
              });
            setAddressToBeShown({
              country: selectedCountry,
              code: selected,
              firstName: isValid.firstNameValue,
              phone: isValid.phoneValue,
              street: isValid.streetValue,
              streetOptional: isValid.streetOptionalValue,
              city: isValid.cityValue,
              state: isValid.stateValue,
              zip: isValid.zipValue,
            });

            onClose();
            console.log("Address added successfully");
            toast.success("Address added successfully");
          } else {
            toast.error("Could not add address");
          }
          // return address;
        } catch (error) {
          // console.error(error);
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

      // adding switch case for data validation
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
                      // className="border-[1px] border-[#EAEAF1] p-2 addrInp"
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
                          console.log("e.target.value", e.target.value);
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
                      // className="border-[1px] border-[#EAEAF1] p-2 w-full addrInp"
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
                      // className="border-[1px] border-[#EAEAF1] p-2 w-full"
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

  // paypal setup

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
  const [message, setMessage] = useState("");

  useEffect(() => {
    setOrderDetails(localStorage.getValue("orderDetails"));
  }, []);

  // setting up redux store
  const [productDetails, setProductDetails] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [addressToBeShown, setAddressToBeShown] = useState(null);

  useEffect(() => {
    setOrderDetails(localStorage.getValue("orderDetails"));
  }, []);

  useEffect(() => {
    loadProductDetails()
      .then((res) => {
        if (res.success) {
          console.log("returned 2", {
            ...res.data,
            delivery_charges: res.delivery_charges,
            increment: res.increment,
            estimated_delivery_time: res.estimated_delivery_time,
          });
          setProductDetails({
            ...res.data,
            delivery_charges: res.delivery_charges ? res.delivery_charges : 0,
            increment: res.increment ? res.increment : 0,
            estimated_delivery_time: res.estimated_delivery_time
              ? res.estimated_delivery_time
              : 0,
          });

          setAddressToBeShown(res.address);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [orderDetails]);

  async function loadProductDetails() {
    try {
      const res = await fetch(
        `/api/fetch-products-details/detailed-product-data/${orderDetails.products.product_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: orderDetails.products.product_id,
            productDetails: orderDetails.products,
            order: true,
          }),
        }
      );

      const data = await res.json();
      console.log("data", data);
      let d = null;
      let t = null;
      console.log("time", data.delivery_time);
      console.log("Address", data.address);
      console.log("delivery charges", data.delivery_charges);
      for (let i = 0; i < data.delivery_charges.length; i++) {
        if (
          data.address.length != 0 &&
          data.delivery_charges[i].country ===
            data.address[data.address.length - 1].code
        ) {
          d = i;
          console.log("matched once");
          // break;
        }

        if (
          data.address.length != 0 &&
          data.delivery_time[i].country ===
            data.address[data.address.length - 1].code
        ) {
          console.log("matched once");
          t = i;
          // break;
        }
      }

      setTimeout(() => {
        if (d == null && data.address.length != 0) {
          chakra_toast({
            title: "Address Error",
            position: "top",
            description: "Unable to deliver to this address",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      }, 1200);
      console.log("d", d);
      return {
        success: true,
        data: data.data,
        address: data.address,
        delivery_charges:
          d != null ? data.delivery_charges[d].base_charge : null,
        increment: d != null ? data.delivery_charges[d].increment : null,
        estimated_delivery_time: t != null ? data.delivery_time[t].time : null,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  return (
    <>
      <div className="App flex flex-col justify-start w-full max-w-[700px] mx-auto p-5 items-center gap-8">
        <div className="absolute p-2 top-0 left-0">
          <Back dest={"series"}></Back>
        </div>
        {productDetails ? (
          <div>
            <div
              id={`product-${productDetails._id}`}
              className="relative rounded-md"
            >
              <div className="rounded-md cursor-pointer flex gap-3 flex-wrap w-full">
                <Link
                  href={`/dashboard/products/${productDetails._id}`}
                  className="relative overflow-hidden w-full flex justify-center"
                >
                  <Image
                    className="rounded-md bg-[#ac4040] border-[1px] border-[#EAEAF1] select-none  hover:scale-110 transition duration-500 ease-in-out"
                    src={productDetails.colorInfo[0].color_image[0]}
                    width={400}
                    height={400}
                    alt="Picture of the watch"
                  />
                </Link>

                <div className="w-[100%]  border-[1px] rounded-md border-[#EAEAF1] select-none p-3 max-w-[400px] mx-auto flex flex-col gap-[2px] text-[#53514D] text-lg font-medium cursor-default">
                  {/* name  */}
                  <h1 className="text-2xl font-semibold text-[#313131] ">
                    {productDetails.product_name}
                  </h1>
                  {/* color  */}
                  {orderDetails.products.color ? (
                    <div className="flex gap-2 mt-2">
                      <span className="">Color:</span>
                      <span className="">{orderDetails.products.color}</span>
                    </div>
                  ) : null}
                  {/* size  */}
                  {orderDetails.products ? (
                    <div className="flex gap-2">
                      <span className="">Size:</span>
                      <span className="">
                        {orderDetails.products.size
                          ? orderDetails.products.size
                          : ""}
                      </span>
                    </div>
                  ) : null}
                  {/* Quantity  */}
                  {orderDetails.products.quantity ? (
                    <div className="flex gap-2">
                      <span className="">Quantity:</span>
                      <span className="">{orderDetails.products.quantity}</span>
                    </div>
                  ) : null}
                  {/* price  */}
                  <div className="flex gap-2">
                    <span className="">Price: $</span>
                    <span className="text-[var(--theme-color)]">
                      {productDetails.product_price}
                    </span>
                  </div>
                  {/* shipping details  */}
                  <div className="flex justify-end text-sm pb-0 pt-2 flex-col font-semibold">
                    <p>
                      Estimated Delivery time:{" "}
                      {productDetails.estimated_delivery_time}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          "loading..."
        )}

        {/* <Address /> */}
        {addressToBeShown && addressToBeShown.length > 0 ? (
          <>
            <div
              className={`${
                productDetails.delivery_charges
                  ? "border-[#EAEAF1]"
                  : "border-[#e13100]"
              } w-[100%] border-[1px] rounded-md  select-none p-3 max-w-[400px] mx-auto flex flex-wrap gap-2 text-[#53514D] text-lg font-medium cursor-default`}
            >
              <div>
                <h1 className="text-2xl font-semibold text-[#313131] ">
                  Shipping Address
                </h1>
                <p className=" mt-2">
                  {addressToBeShown[addressToBeShown.length - 1].firstName}
                  {", "} {addressToBeShown[addressToBeShown.length - 1].phone}
                </p>
                <p>
                  {addressToBeShown[addressToBeShown.length - 1].street}
                  {", "}{" "}
                  {addressToBeShown[addressToBeShown.length - 1].streetOptional}
                </p>
                <p>
                  {addressToBeShown[addressToBeShown.length - 1].city}
                  {", "} {addressToBeShown[addressToBeShown.length - 1].state}{" "}
                  {addressToBeShown[addressToBeShown.length - 1].country} -{" "}
                  {addressToBeShown[addressToBeShown.length - 1].zip}
                </p>
              </div>
              <div>
                <HomePage text="Change Address" />
              </div>
            </div>
          </>
        ) : (
          <HomePage text="Add Address" />
        )}

        {/* Total summary   */}
        <div className="w-[100%]  border-[1px] rounded-md border-[#EAEAF1] select-none p-3 max-w-[400px] mx-auto flex flex-col gap-[2px] text-[#53514D] text-lg font-medium cursor-default">
          <h1 className="text-2xl font-semibold text-[#313131]">
            Order Summary
          </h1>
          {/* delivery_charges */}
          <div className="flex justify-between mt-2">
            <span>Delivery Charges</span>
            <span>
              $
              {productDetails
                ? productDetails.delivery_charges +
                  Number(orderDetails.products.quantity - 1) *
                    Number(productDetails.increment)
                : 0}
            </span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Subtotal</span>
            <span>
              $
              {productDetails
                ? Number(productDetails.product_price) *
                    orderDetails.products.quantity +
                  (productDetails.delivery_charges +
                    (orderDetails.products.quantity - 1) *
                      productDetails.increment)
                : 0}
            </span>
          </div>
        </div>
        <section className="w-full">
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              disabled={
                productDetails
                  ? !(
                      productDetails.delivery_charges &&
                      addressToBeShown.length > 0
                    )
                  : false
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
                    body: JSON.stringify({ orderDetails, isSingle: true }),
                  });

                  const orderData = await response.json();
                  if (!orderData.success) {
                    console.log(orderData.error);
                  }
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
                    setMessage({
                      success: true,
                      content: transaction,
                      error: null,
                    });
                    console.log(
                      "Capture result",
                      orderData,
                      JSON.stringify(orderData, null, 2)
                    );
                  }
                } catch (error) {
                  console.error(error);
                  setMessage({
                    success: false,
                    error: error,
                    content: "An error occurred while processing the payment",
                  });
                }
              }}
              onShippingChange={async (data, actions) => {
                return actions.resolve();
              }}
              onError={(error) => {
                console.error(error);
                setMessage({
                  success: false,
                  error: error,
                  content: "An error occurred while processing the payment",
                });
              }}
            />
          </PayPalScriptProvider>
          <Message res={message} />
        </section>
      </div>
    </>
  );
}
