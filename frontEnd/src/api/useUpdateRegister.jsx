import { useState, useEffect, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { URL_UPDATE } from "./urls";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";

export const useUpdateUser = () => {
  const navigate = useNavigate();
  const { setShowAlert, setAlertText, setAlertTypeSuccess } =
    useContext(AppContext);

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

      setAlertText("Perfil actualizado");
      setAlertTypeSuccess(true);
      setShowAlert(true);
    } else {
      userObj.message = body?.message;
    }

    delete userObj.confirmPassword;
    setUserUpdate(userObj);
    navigate("/perfil");
    localStorage.setItem("token", userObj.token);

    return response;
  };

  const { mutate: updateUser, isLoading, isError } = useMutation(postFormData);

  return { userUpdate, updateUser };
};
