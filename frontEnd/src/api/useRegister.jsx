import { useState, useEffect, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { URL_REGISTER } from "./urls";
import { AppContext } from "../App";

export const useRegister = () => {
  const { setShowAlert, setAlertText } = useContext(AppContext);
  const [userRegister, setUserRegister] = useState({});

  const postFormData = async (formData) => {
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
      setAlertText("Usuario registrado");
      setShowAlert(true);
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
