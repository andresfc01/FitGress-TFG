import emailjs from "emailjs-com";

emailjs.init("DdPLC4KUfXkXuTd2p");

export const sendEmailRegistro = (user) => {
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
