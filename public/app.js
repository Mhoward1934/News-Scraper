// Grab the articles as a json
$(".scrape-new").on("click", function () {
  
  $.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
     const newArticle = `<div data-id=${data[i]._id} class="articleDiv">
                            <h5>${data[i].title}</h5>
                            <a href=${data[i].link}><i class="fas fa-link fa-3x"></i></a>
                            <a><i class="far fa-save fa-3x"></i></a>
                            <a><i class="fas fa-pencil-alt fa-3x"></i></a>`;
     
      $("#articles").prepend(newArticle);
    }
  });
});

$(document).on("click", ".fa-save", function (){
  
  const parent = $(this).parents(".articleDiv")
  
  const articleObj = {
    
    id: parent.attr("data-id"),
    title: parent.text().trim(),
    link: parent.children("a").attr("href")
    
  };
  
  if("#articles" === {saved: true}) {

    $("#articles").appendTo("#savedArticles");
  }

})


// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the pencil tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

//attempted to add functionality to Scrape New Articles button, it is still manual via the browser.
// $(document).on("click", ".scrape-new", function(){
//   $.ajax({
//     method: "GET",
//     url: "/scrape",
//     data: {
//       title: $("#articles")
//     }
//   })
//   .then(function(data){
//     console.log(data);
//   })
// });

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
