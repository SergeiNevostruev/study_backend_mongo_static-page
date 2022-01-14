const regBtn = document.querySelector(".regBtn");
const authBtn = document.querySelector(".authBtn");
// const submitBtn = document.querySelector(".submit");
// const content = document.querySelector(".apps");
const form = document.querySelector("#form-auth");

const url = 'http://localhost:5000';


regBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  console.log(event.target);

  let json = {
    email: form.email.value,
    password: form.password.value 
  };

  alert("пробую отправить " + JSON.stringify(json));

  const response = await fetch(url + "/api/reg", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(json),
  });

  if (!response.ok) {
    throw new Error(
      `Ошибка по адресу ${url + "/api/reg"}, статус ошибки ${response}`
    );
  }


  return await response.json();
});

authBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  console.log(event.target);

  let json = {
    email: form.email.value,
    password: form.password.value 
  };

  alert("пробую отправить " + JSON.stringify(json));

  const response = await fetch(url + "/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(json),
  });

  if (!response.ok) {
    throw new Error(
      `Ошибка по адресу ${url + "/api/reg"}, статус ошибки ${response}`
    );
  }

  // response.type = ''
  return await response.json();
});

