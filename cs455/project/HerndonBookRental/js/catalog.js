/**
 * @author Kassaw
 * @file catalog.js
 * cs445 final project
 */
"use strict";

(function() {
    // declare variables for page-contents
    let HOME_PAGE_CONTENT;
    let CATALOG_PAGE_INITIAL_CONTENT;

    initializePageContents();

    function initializePageContents() {
        HOME_PAGE_CONTENT = `
            <h4>Welcome to Herndon Books Rental Service<sup>&reg;</sup></h4>
            <hr/>
            <div style="font-size: 1em">
                <img src="book-banner.PNG" id = "book-banner"/><br/><br/>
                <p>We are a top-flight, fully-digitized library.
                    Find out more about us and
                    and learn how we can serve you with a widest variety of books and lots of other
                    digital content, all for your education as well as your entertainment.
                    You can also take a virtual tour,
                    of our world-class facilities and be amazed at all what we have in stock
                    for you, your family and friends.</p>

                <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy text
                    ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book. It has survived not
                    only five centuries.</p>

                <p>Already have access as a Member, Librarian or System Administrator? Then, simply Sign-In
                    to access the full range of services available to you, based on your role and access rights.</p>
            </div>            
        `;

        CATALOG_PAGE_INITIAL_CONTENT = `
            <div class="row" style="padding-bottom:1em;">
                <div class="col-md-4">
                    <span style="font-size: 2em; color: #32a5e7;">Books in our Collection</span>
                </div>
                <div class="col-md-4">
                    <span id="alertMessageBox" style="display:none;float:none;margin-left:0em;" class="alert alert-dismissible alert-success">
                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                        <strong>Book successfully deleted!</strong>
                    </span>
                </div>            
                <div class="col-md-4">
                    <span style="float:right;">
                        <a id ="addnewbook" class="btn btn-outline-success btn-lg" href="addNewBook.html">Add New Book</a>
                    </span>
                </div>
            </div>
            <!-- <p>&nbsp;</p> -->
            <div id="divBooksList" style="font-size: 1em">
                <table id="booksTable" class="table table-striped">
                    <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">ISBN</th>
                    <th scope="col">Book Title</th>
                    <th scope="col">Overdue Fee</th>
                    <th scope="col">Publisher</th>
                    <th scope="col">Date Published</th>
                    <th scope="col">&nbsp;</th>
                    <th scope="col">&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody id="tbody">
                    <tr><td style="text-align:center;" colspan="8">Loading...<br/>Please wait</td></tr>
                    </tbody>
                </table>
            </div>       
        `;
    }

    /**
     * Displays homepage
     * @returns {void}
     */
    function displayHomePage() {
        document.getElementById("pageContentOutlet").innerHTML = HOME_PAGE_CONTENT;
    }

    function displayCatalogPage() {
        document.getElementById("pageContentOutlet").innerHTML = CATALOG_PAGE_INITIAL_CONTENT;
        getBooks();
    }

    /**
     * loads list of books 
     * @returns {void}
     */
    function getBooks() {
        fetch("https://elibraryrestapi.herokuapp.com/elibrary/api/book/list")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject({ status: response.status, statusText: response.statusText });
                }
            })
            .then(books => {
                let content = "";
                books.forEach(function(book, i) {
                    content += `
                    <tr>
                    <th scope="row">${i+1}.</th>
                    <td>${book.isbn}</td>
                    <td>${book.title}</td>
                    <td> $${book.overdueFee}</td>
                    <td>${book.publisher}</td>
                    <td>${book.datePublished}</td>
            
                    </tr>
                `;
                });
                document.querySelector("#tbody").innerHTML = content;
            })
            .catch(err => {
                console.log("Error message:", err.statusText);
                const msg = "<tr><td colspan='8'><p style='color:#ff0000;'>We are sorry. The elibrary books data service is unavailable. Please try again later</p></td></tr>";
                document.getElementById("divBooksList").innerHTML = msg;
            });
    }

    const app = {
        pages: ["home", "catalog"],
        init: function() {
            document.querySelectorAll(".nav-link").forEach(navLink => {
                navLink.addEventListener("click", app.nav);
            });
            document.querySelectorAll(".navbar-brand").forEach(navBarBrand => {
                navBarBrand.addEventListener("click", app.nav);
            });
            history.replaceState({}, "Home", "#home");
            window.addEventListener("popstate", app.popState);
            displayHomePage();
        },
        nav: function(event) {
            event.preventDefault();
            let currPage = event.target.getAttribute("data-target");
            history.pushState({}, currPage, `#${currPage}`);
            if (currPage === "home") {
                displayHomePage();
            }

            if (currPage === "catalog") {
                displayCatalogPage();
            }
        },
        popState: function(event) {
            let pagename = location.hash.replace("#", "");
            if (pagename === "home") {
                displayHomePage();
            }

            if (pagename === "catalog") {
                displayCatalogPage();
            }
        }
    };


    function fetchAndDisplayBookData(bookId) {

        fetch('https://elibraryrestapi.herokuapp.com/elibrary/api/book/get/' + bookId)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject({ status: response.status, statusText: response.statusText });
                }
            })
            .then(book => {
                $("#txtBookId").val(book.bookId);
                $("#isbn").val(book.isbn);
                $("#title").val(book.title);
                $("#overdueFee").val(book.overdueFee.toFixed(2));
                $("#publisher").val(book.publisher);
                $("#datePublished").val(book.datePublished);
            })
            .catch(err => {
                console.log("Error message: ", err.statusText);

            });
    }

    document.addEventListener("DOMContentLoaded", app.init);

})();
