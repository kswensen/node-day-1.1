angular.module('books', [])
  .controller('booksCtrl', function($scope, booksService){

    getBooks();
    $scope.addBook=function(newBook) {
      booksService.addBook(newBook).then(()=>{
        getBooks();
      })
    }

    $scope.editBook = function(editBook){
      booksService.editBook(editBook).then(()=>{
        getBooks();
      });
    }

    $scope.deleteBook = function(deleteBook){
      booksService.deleteBook(deleteBook)
    }

    $scope.upvote = function(upvoteBook){
      booksService.upvoteBook(upvoteBook).then(()=>{
        upvoteBook.votes++;
      });
    }

    $scope.downvote = function(downvoteBook){
      booksService.downvoteBook(downvoteBook).then(()=>{
        downvoteBook.votes--;
      });
    }

    function getBooks(){
      booksService.getBooks().then((books)=>{
        $scope.books = books;
      })
    }
  })
  .service('booksService', function($http){
    this.getBooks = function(){
      return $http.get('/api/books').then((response)=>response.data);
    }
    this.addBook = function(newBook){
      return $http.post('/api/books', newBook).then((response)=>response.data);
    }
    this.editBook = function (editBook){
      return $http.edit(`/api/books/${editBook.id}`, editBook).then(response=>response.data);
    }
    this.deleteBook = function(deleteBook){
      return $http.delete(`/api/books/${deleteBook.id}`).then(response => response.data);
    }
    this.upvoteBook = function (upvoteBook){
      return $http.patch(`/api/books/${upvoteBook.id}/upvote`).then(response => response.data);
    }
    this.downvoteBook = function (downvoteBook){
      return $http.patch(`/api/books/${downvoteBook.id}/downvote`).then(response => response.data);
    }
  })
