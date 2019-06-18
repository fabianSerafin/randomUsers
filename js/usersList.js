$(document).ready(function(){
  var options = {
    valueNames: ['name']
  };

  var url = "https://randomuser.me/api/?results=10";
  var p = "";

fetchInformation(url);


  $("ul.list").on("click","li", function(){
       var id = $(this).attr('id');
       var classes = $(this).attr("class");
       var user = $(this).attr("user");
       var email = $(this).attr("email");
       var address = $(this).attr("address");
       var imageLarge = $(this).attr("image");
       var imageMedium = $(this).attr("imageMedium");
       var cell = $(this).attr("cell");
       $("#imgUser").attr("src", imageMedium);
       $("#lblName").text(id+" "+classes);
       $("#lblUser").text(user);
       $("#lblAddress").text(address);
       $("#lblEmail").text(email);
       $("#lblCell").text(cell);
       $(".userProfile").css({"background-image": "url("+imageLarge+")"});
    });

  function fetchInformation(url){
    fetch(url)
    .then((response) => response.json())
    .then(function(data){

      data.results.forEach(person => {
        p = `
    <li id="${person.name.first}" class="${person.name.last} " email="${person.email}" email="${person.email}" image="${person.picture.large}" imageMedium="${person.picture.medium}" address="${person.location.street}" user="${person.login.username}" cell="${person.cell}">
        <img src="${person.picture.thumbnail}" class="img-rounded" alt="Cinque Terre">
        <span style="margin-left:25px;" class="name">${person.name.first} ${person.name.last}</span>
    </li><br>`;

        $(".list").append(p);
        var userList = new List('users', options);
      });
      loadMore =`<button id="loadmore" class="btn btn-outline-secondary float-right">Load more</button>`
      $("#results").append(loadMore);
      $("#loadmore").on("click",function(){
        fetchInformation(url);
        $(this).remove();
      });

    });
  }
});
