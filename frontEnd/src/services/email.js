import emailjs from "emailjs-com";

export const sendEmailRegistro = (user) => {
  emailjs.init("DdPLC4KUfXkXuTd2p");
  const templateParams = {
    to_email: user?.email,
    from_name: "Fitgress",
    message: "",
    username: user?.username,
  };

  emailjs
    .send("service_h2e7eq2", "template_f4mtq6q", templateParams)
    .then((response) => {
      console.log("Correo enviado con éxito:", response);
    })
    .catch((error) => {
      console.error("Error al enviar el correo:", error);
    });
};

export const sendEmailEntrenoRealizado = (user) => {
  emailjs.init("DdPLC4KUfXkXuTd2p");
  var fechaActual = new Date();
  var dia = fechaActual.getDate();
  var mes = fechaActual.getMonth() + 1; // Los meses empiezan desde 0
  var anio = fechaActual.getFullYear();
  if (dia < 10) {
    dia = "0" + dia;
  }
  if (mes < 10) {
    mes = "0" + mes;
  }
  var fechaTexto = dia + "/" + mes + "/" + anio;

  const templateParams = {
    to_email: user?.email,
    from_name: "Fitgress",
    message: "",
    username: user?.username,
    date_texto: fechaTexto,
  };

  emailjs
    .send("service_h2e7eq2", "template_r697j4i", templateParams)
    .then((response) => {
      console.log("Correo enviado con éxito:", response);
    })
    .catch((error) => {
      console.error("Error al enviar el correo:", error);
    });
};

export const sendEmailRestaurarContrasena = (email, code) => {
  emailjs.init("lCUXgaDPv_UoyAl8k");
  const templateParams = {
    to_email: email,
    from_name: "Fitgress",
    code: code,
  };

  emailjs
    .send("service_bvzxwap", "template_inhlfsy", templateParams)
    .then((response) => {
      console.log("Correo enviado con éxito:", response);
    })
    .catch((error) => {
      console.error("Error al enviar el correo:", error);
    });
};
