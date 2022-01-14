const getAllArticlesBtn = document.querySelector(".getAllArticles");
const delFrontAllArticlesBtn = document.querySelector(".delFrontAllArticles");
const submitBtn = document.querySelector(".submit");
const content = document.querySelector(".apps");
const form = document.querySelector("#form");

const url = 'http://localhost:5000';



const div = document.createElement('div');
div.classList.add('articles');

// let change = true;

function getAllArticles() {
    content.innerHTML = '';
    fetch(url+'/api/posts').then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (!content.hasChildNodes()) {
        for (const item of data) {
            let newDiv = div.cloneNode();
            newDiv.innerHTML = `<h2>${item.title} <a id='${item._id}' class="waves-effect waves-light btn delArticles" onclick="delArticles('${item._id}')">Х</a></h2><p>${item.content}</p><p>${item.author}</p>`;
            content.append(newDiv);
        }
        // change = false;
    }

      });

}

function delFrontAllArticles() {
    content.innerHTML = '';
}

async function delArticles(id) {
  console.log(id);
  const response = await fetch (url+`/api/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })

  if (!response.ok) {
  throw new Error (`Ошибка по адресу ${url+'/api/posts'}, статус ошибки ${response}`)
  } else {
    console.log("Запись удалена из базы данных!");
  }

  await getAllArticles();

  return await response.json();
  
}



getAllArticlesBtn.addEventListener('click', getAllArticles);
delFrontAllArticlesBtn.addEventListener('click', delFrontAllArticles);

form.addEventListener('submit', async function (e) {
  e.preventDefault();

    let json = {
        "author": form.author.value,
        "title": form.title.value,
        "content": form.content.value
     }

    alert('пробую отправить '+ JSON.stringify(json));

    const response = await fetch (url+'/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(json)
    })
  
    if (!response.ok) {
      throw new Error (`Ошибка по адресу ${url+'/api/posts'}, статус ошибки ${response}`)
    }

    // await getAllArticles();

    return await response.json();

  })
