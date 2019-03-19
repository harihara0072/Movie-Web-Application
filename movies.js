function initialize () {
  document.getElementById("output1").innerHTML = " ";
  document.getElementById("output").innerHTML = " ";
  }

function sendRequest () {
   initialize();
   var xhr = new XMLHttpRequest();
   var query = encodeURI(document.getElementById("form-input").value);
   xhr.open("GET", "proxy.php?method=/3/search/movie&query=" + query);
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
          var str = JSON.stringify(json,undefined,2);
          var len= json.results.length
          if(len == 0){
            document.getElementById("output1").innerHTML += "<h3 >" + "No results found" + "</h3>" ;
          }
          for (var i = 0; i <= len; i++) {
            var id = json.results[i]["id"];
            var year = json.results[i]["release_date"].split("-")
            if (year[0].length == 0){
              year[0] = " Year Unknown";
            } 
          document.getElementById("output1").innerHTML += "<li ><u><a onclick = information("+id+")><font color='blue'>" + json.results[i]["title"] +"-- " + year[0] + "</font></a></u></li>" ;
         }
          
       }
   };
   xhr.send(null);
}

function information(m_id) {
   document.getElementById("output").innerHTML = "<h1>"+ " " +"</h1>";
   var xhr_info = new XMLHttpRequest();
   xhr_info.open("GET", "proxy.php?method=/3/movie/" + m_id);
   xhr_info.setRequestHeader("Accept","application/json");
   xhr_info.onreadystatechange = function () {
       if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
          var str = JSON.stringify(json,undefined,2);
          var img = "http://image.tmdb.org/t/p/w185/" + json.poster_path;
          var title = json.original_title
          var genres_len = json.genres.length
          var overview = json.overview
          document.getElementById("output").innerHTML += "<b>Title: </b>" + title ;
          document.getElementById("output").innerHTML += "<h3>Poster: </h3><img src=" + img + " alt = 'No Poster found'></br>";
          document.getElementById("output").innerHTML +=  " <b>Genres: </b>" ; 
          if (genres_len == 0){
            document.getElementById("output").innerHTML +=  " " + " Genres Imformation Not available"+ "," ;
          }
          for(var i = 0; i < genres_len; i++){
           document.getElementById("output").innerHTML +=  " " + json.genres[i]["name"] + "," ;
          }
          if (overview.length == 0){
            document.getElementById("output").innerHTML +=  " </br><b>Overview: </b>" + "No overiew found" + "</br>"; 
          }
          else{
            document.getElementById("output").innerHTML +=  " </br><b>Overview: </b>" + overview + "</br>";
          }
           
          cast(m_id);
       }
   };
   xhr_info.send(null);
  }

  function cast(m_id){
    var xhr_cast = new XMLHttpRequest();
    xhr_cast.open("GET", "proxy.php?method=/3/movie/" + m_id + "/credits");
    xhr_cast.setRequestHeader("Accept","application/json");
    xhr_cast.onreadystatechange = function () {
       if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
          var str = JSON.stringify(json,undefined,2);
          var cast_len = json.cast.length;
          document.getElementById("output").innerHTML +=  " <b> Cast: </b> "; 
          if (cast_len == 0 ){
            document.getElementById("output").innerHTML +=  " No Cast information found ";
          }
          if (cast_len > 5 ){
            for(var i = 0; i < 5; i++){
              document.getElementById("output").innerHTML +=  json.cast[i]["name"] + ", "; 
            }
          }
          else{
            for(var j = 0 ; j < cast_len; j++){
              document.getElementById("output").innerHTML +=  json.cast[j]["name"] + ", "; 
            }
          }
      }
   };
   xhr_cast.send(null);
  }