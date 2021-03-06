"use strict";

angular.module("PinterestApp")
.controller("ViewAllBoardsCtrl", function($scope, $location, AuthFactory, BoardFactory) {
  $scope.showAddBoard = false;
  $scope.uid = '';
  $scope.newBoard = {};

  const fireGettingAllBoards = uid => BoardFactory.getAllBoards(uid)
    .then(boardData => $scope.boards = boardData)
    .catch(err => $location.path('/login'));

  AuthFactory.getUser()
  .then(user => {
    $scope.uid = user.uid;
    fireGettingAllBoards($scope.uid);
  });

  $scope.delete = boardid => BoardFactory.deleteBoard(boardid)
    .then(() => fireGettingAllBoards($scope.uid));

  $scope.submitNewBoard = () => {
    $scope.newBoard.uid = $scope.uid;
    BoardFactory.addBoard($scope.newBoard)
    .then(() => fireGettingAllBoards($scope.uid))
    .then(() => {
      $scope.newBoard.title = '';
      $scope.show = false;
    });
  };

  $scope.updateBoardTitle = ({id, title}) => {
    BoardFactory.editBoard(id, {title})
    .then(() => fireGettingAllBoards($scope.uid));
  };
});
