$(document).ready(function(){
/*
  Author: Jonathan Serafin
  Date: June 17th 2019
*/
  var radioGender = "male";
  var selectedNationality = "US";

  var url = "https://randomuser.me/api/?results=10&gender="+radioGender+"&nat="+selectedNationality;
  var p = "";

fetchInformation(url);

$("input[type='radio']").click(function(){

    $("#results").empty();
    radioGender = $("input[name='gender']:checked").val();
    url = "https://randomuser.me/api/?results=10&gender="+radioGender+"&nat="+selectedNationality;

    if(radioGender){
      fetchInformation(url);
    }
});

//Select addEventListener
$("#nationality").on("change",function(){
    $("#results").empty();
    selectedNationality = $("#nationality :selected").text();
    url = "https://randomuser.me/api/?results=10&gender="+radioGender+"&nat="+selectedNationality;

    fetchInformation(url);
});

  function fetchInformation(url){
    fetch(url)
    .then((response) => response.json())
    .then(function(data){

      data.results.forEach(person => {

        p = `<div class="well">
               <img src="${person.picture.thumbnail}" class="img-rounded" alt="Cinque Terre">
               <span style="margin-left:25px;">${person.name.first} ${person.name.last}</span>
               <span>(${person.nat})</span>
               </div><br>`;

        $("#results").append(p);

      });
      loadMore =`<button id="loadmore" class"btn btn-primary">Load more</button>`
      $("#results").append(loadMore);
      $("#loadmore").on("click",function(){
        fetchInformation(url);
        $(this).remove();
      });

    });
  }
});
