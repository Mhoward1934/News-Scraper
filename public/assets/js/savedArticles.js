$.getJSON("/articles/saved", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
     const newArticle = `<div data-id=${data[i]._id} class="articleDiv">
                            <h5>${data[i].title}</h5>
                            <a href=${data[i].link}><i class="fas fa-link fa-3x"></i></a>
                            <a><i class="far fa-save fa-3x"></i></a>
                            <a><i class="fas fa-pencil-alt fa-3x"></i></a>`;
     
      $("#savedArticles").prepend(newArticle);
    }
  });