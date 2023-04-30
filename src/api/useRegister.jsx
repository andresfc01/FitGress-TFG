import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { URL_REGISTER } from "./urls";

export const useRegister = () => {
  const [userRegister, setUserRegister] = useState({});

  const postFormData = async (formData) => {
    console.log("DATOS : ", formData.get("image"));
    const response = await fetch(URL_REGISTER, {
      method: "POST",
      body: formData,
    });
    const userObj = {
      ...userRegister,
      status: response.status,
    };

    userObj.status = response.status;
    const body = await response.json();

    if (response.status === 200) {
      userObj.user = body;
    } else {
      userObj.message = body?.message;
    }

    delete userObj.confirmPassword;
    setUserRegister(userObj);
    return response;
  };

  const {
    mutate: registerUser,
    isLoading,
    isError,
  } = useMutation(postFormData);

  return { userRegister, registerUser };
};
