import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { URL_LOGIN } from "./urls";

export const useLogin = () => {
  const [userLogin, setUserLogin] = useState({});

  const postFormData = async (formData) => {
    const response = await fetch(URL_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const userObj = {
      ...userLogin,
      status: response.status,
    };

    userObj.status = response.status;
    const body = await response.json();

    if (response.status === 200) {
      userObj.user = body;
    } else {
      userObj.message = body?.message;
    }
    setUserLogin(userObj);

    return response;
  };

  const { mutate: loginUser, isLoading, isError } = useMutation(postFormData);

  return { userLogin, loginUser };
};
