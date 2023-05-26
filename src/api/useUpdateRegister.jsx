import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { URL_UPDATE } from "./urls";

export const useUpdateUser = () => {
  const [userUpdate, setUserUpdate] = useState({});

  const postFormData = async (formData) => {
    const response = await fetch(URL_UPDATE, {
      method: "PUT",
      body: formData,
    });
    const userObj = {
      ...userUpdate,
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
    setUserUpdate(userObj);
    localStorage.setItem("user", JSON.stringify(userObj));
    return response;
  };

  const { mutate: updateUser, isLoading, isError } = useMutation(postFormData);

  return { userUpdate, updateUser };
};
