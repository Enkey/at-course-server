(function () {
    'use strict';
    angular.module('app')
        .controller('postCategoryCtrl', postCategoryCtrl);


    postCategoryCtrl.$inject = ['$scope', 'postService', '$routeParams'];


    function postCategoryCtrl($scope, postService, $routeParams) {


        $scope.postsLoaded = function () {
            var container = $('#gallery');
            container.imagesLoaded(function () {
                container.masonry({         // НЕ находит масонри!
                    itemSelector: ".item-masonry",
                    percentPosition: true
                });

            })
        };

        $scope.showModalDialog = function (post) {
            $scope.post = post;
            showModalDialog();
        };

        $scope.hideModalDialog = function ($event, category) {
            hideModalDialog(function () {
                document.location.href = "/#post/category/" + category;
            });
            $event.preventDefault();
        };


        postService
            .getPostsByCategory($routeParams.category)
            .then(function (data) {
                if (data.data.length == 0) {
                    $scope.error = "No data";
                }
                $scope.posts = data.data;
            }).catch(function (err) {
            $scope.error = err;
        });
    }


})();