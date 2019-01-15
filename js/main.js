//List for form submit
document.getElementById('myform').addEventListener('submit', saveBookmark)

//saving bookmark
function saveBookmark(e) {

    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if (!siteName || !siteUrl) {
        alert('Sorry, you can leave the form empty!');
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl,
    }

    //local storage test
    /* localStorage.setItem('test','hello world');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test')); */

    //saving the bookmarks in local storage
    if (localStorage.getItem('bookmarks') === null) {
        var bookmarks =[];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    
    //reseting the form
    document.getElementById('myform').reset();

    //re-fetchBoomarsk again
    fetchBookmarks();
    
    //prevents from from submitting
    e.preventDefault();
    
}


function deletBookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    

    for (var i = 0; i < bookmarks.length; i++) {
        if (url == bookmarks[i].url) {
            // removing from the array
            bookmarks.splice(i, 1);
            
            
        }
    }

    // set back the localStorage with the array without the link
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

    //re-fetchBoomarsk again
    fetchBookmarks();

}



//Getting the bookmarks from the localStorage
function fetchBookmarks() {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');


    // Build output
    bookmarksResults.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML +=   '<div class="card card-body card-fluid mb-4">'+
                                        '<h3>'+name+
                                        '<a class="btn btn-sm btn-light  ml-2"  target="_blank" href="'+url+'">Visit</a>'+
                                        '<a onClick="deletBookmark(\''+url+'\')" class="btn btn-sm btn-danger ml-2" href="#">Delete</a>'
                                        '</h3>'+
                                        '</div>';
  };



}