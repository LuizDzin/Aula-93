firebaseConfig = {
    apiKey: "AIzaSyBvX8i8dbpCpCLtNjP_N64Pl6X0aJNulaY",
    authDomain: "aula-93-38904.firebaseapp.com",
    databaseURL: "https://aula-93-38904-default-rtdb.firebaseio.com",
    projectId: "aula-93-38904",
    storageBucket: "aula-93-38904.appspot.com",
    messagingSenderId: "674520410757",
    appId: "1:674520410757:web:8007e1e4a9de838e0217ec"
};

firebase.initializeApp(firebaseConfig);

  userName = localStorage.getItem("userName");  

document.getElementById("userName").innerHTML = "Bem-vindo(a) " + userName + "!";

function addRoom() {
room_name = document.getElementById("room_name").value;

firebase.database().ref("/").child(room_name).update({
  purpose : "adding room name"
});

localStorage.setItem("room_name", room_name);

window.location = "kwitterPage.html";
}

function getData() {  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
       roomNames = childKey;
       console.log("Nome da Sala - " + roomNames);
       row = "<div class='room_name' id=" + roomNames + " onclick='redirectToRoomName(this.id)' >#" + roomNames + "</div><hr>";
       document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitterRoom.html";
}

function logout() {
  localStorage.removeItem("userName");
  localStorage.removeItem("room_name");

  window.location = "index.html";
 }