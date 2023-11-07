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
    roomName = localStorage.getItem("room_name")

function getData() { firebase.database().ref("/"+roomName).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebaseMessageId = childKey;
         messageData = childData;

         console.log(firebaseMessageId);
         console.log(messageData);
         name = messageData["name"]
         message = messageData["message"]
         like = messageData["like"]
         nameWithTag = "<h4> " + name + "<img class='user_tick' src='tick.png'> </h4>";
         messageWithTag = "<h4 class='message_h4'> " + message + "</h4>";
         likeButton = "<button class='btn btn-warning' id="+ firebaseMessageId +" value="+ like +" onclick='updateLike(this.id)'>";
         spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

         row = nameWithTag + messageWithTag + likeButton + spanWithTag;
         document.getElementById("output").innerHTML += row;
      } });  }); }      
getData();

function logout() {
      localStorage.removeItem("userName");
      localStorage.removeItem("room_name");
    
      window.location = "index.html";
     }

     function send() {
msg = document.getElementById("msg").value;
firebase.database().ref(roomName).push({
      name:userName,
      message:msg,
      like:0
});

document.getElementById("msg").value = "";
     }

     function updateLike(messageId) {
console.log("botão like pressionado - " + messageId);
button_id = messageId;
likes = document.getElementById("button_id").value;
updateLikes = Number(likes) + 1;
console.log(updateLikes);

firebase.database().ref(roomName).child(messageId).update({
      like: updateLikes
});
     }