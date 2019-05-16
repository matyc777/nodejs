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
    axios.post('/signup', {
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

  function newOrder(){
    axios.post('/', {
      from: document.getElementById("sender_adress").innerText,
      to: document.getElementById("receiver_adress").innerText,
      weight: document.getElementById("weight").innerText,
      deadline: document.getElementById("deadline").innerText
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    if (this.status == 200){
      alert("Success!");
      document.getElementById("new_order").reset();
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