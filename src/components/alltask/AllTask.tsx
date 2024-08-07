"use client";
import React, { useContext, useState } from "react";
import Cards from "../cards/Cards";
import { IoMdAddCircleOutline } from "react-icons/io";
import InputData from "../inputData/InputData";
import { ContextData } from "@/context/ContextProvider";

const AllTask: React.FC = () => {
  return (
    <>
        <Cards />
      <InputData />
    </>
  );
};

export default AllTask;
