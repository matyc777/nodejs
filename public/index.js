function auentification(){
  axios.post('/authentication', {
    Login: document.getElementById("login").innerText,
    Password: document.getElementById("password").innerText
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  
  if (this.status == 200) {
      //успешная авторизация
      loadForm('pages/' + document.getElementById('role').value + '.html')
    }
  }

  function registration(){
    axios.post('/registration', {
      Login: document.getElementById("login").innerText,
      Password: document.getElementById("password").innerText,
      Phone: document.getElementById("phone").innerText
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    if (this.status == 200) {
        //успешная регистрация
      }
    }

  function loadForm(file, insertionElementID) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        document.getElementById(insertionElementID).innerHTML = xhttp.responseText;
    }
    };
    xhttp.open("GET", file, true);
    xhttp.send();

    
  };