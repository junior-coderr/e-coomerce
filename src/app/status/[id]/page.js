"use client";
import Back from "@/app/profile/profile_components/button/back_btn";
import Link from "next/link";
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Box,
} from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import Image from "next/image";
export default function Status({ params }) {
  const steps = [
    {
      title: "Order Placed",
      description: "Money not debited",
      status: "complete",
    },
    { title: "Confirmed", description: "Date & Time", status: "failed" },
    { title: "Delivered", description: "Select Rooms" },
  ];

  // second failed
  const { activeStep } = useSteps({
    index: 2,
    count: steps.length,
  });
  return (
    <div className="relative w-full h-[100svh] ">
      <Back dest={"series"} />
      <h1 className=" text-4xl mt-1 font-semibold text-center">Order Status</h1>
      <br />
      <div className="max-w-[800px] mx-auto mt-8">
        {/* extra small  */}
        <Stepper
          index={activeStep}
          size="sm"
          orientation="horizontal"
          colorScheme="green"
          gap="3"
        >
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
                failed={<StepIcon />}
              >
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                  failed={<StepIcon />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                {/* <StepDescription>{step.description}</StepDescription> */}
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </div>

      <div className="max-w-[500px] mx-auto mt-4">
        {/* picture  */}
        <div className="mx-auto">
          <Image
            // random img from unsplash
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            width={500}
            height={500}
            className="mx-auto"
          />
        </div>
        {/* s */}
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Product Details
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <div>
                <div className="relative rounded-md">
                  <div className="rounded-md cursor-pointer flex gap-3 flex-wrap w-full">
                    <div className="w-[100%]  border-[1px] rounded-md border-[#EAEAF1] select-none p-3 max-w-[400px] mx-auto flex flex-col gap-[2px] text-[#53514D] text-lg font-medium cursor-default">
                      {/* name  */}
                      <h1 className="text-2xl font-semibold text-[#313131] ">
                        Name
                      </h1>
                      {/* color  */}

                      <div className="flex gap-2 mt-2">
                        <span className="">Color:</span>
                        Red
                      </div>
                      {/* size  */}
                      <div className="flex gap-2">
                        <span className="">Size:</span>
                        <span className="">M</span>
                      </div>
                      {/* Quantity  */}
                      <div className="flex gap-2">
                        <span className="">Quantity:</span>
                        <span className="">1</span>
                      </div>
                      {/* price  */}
                      <div className="flex gap-2">
                        <span className="">Price: $</span>
                        <span className="text-[var(--theme-color)]">
                          100.00
                        </span>
                      </div>
                      {/* shipping details  */}
                      <div className="flex justify-end text-sm pb-0 pt-2 flex-col font-semibold">
                        <p>
                          Estimated Delivery time:{" "}
                          <span className="text-[#53514D]">2-3 days</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
