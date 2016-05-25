angular.module('chatSearch.controllers', [])

.controller('AppCtrl', ['$scope', '$state', 'Auth', function($scope, $state, Auth) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
    
   Auth.$onAuth(function(authData){
        if(authData){
            console.log("User " + authData.uid + " is logged in with " + authData.provider);
            console.log(authData);
        }else{
            console.log("User is logged out");
            $state.go('login');
        }
  }); 
    
  $scope.logout = function(){
    Auth.$unauth();
    //$state.go('login');
  };

}])

.controller('HomeCtrl', [ '$scope', '$state', function($scope, $state){
    $scope.goToChat = function(){
       $state.go('chatBot'); 
    };
}])

.controller('LoginCtrl', ['$scope', 'Auth', '$ionicPopup', '$state', function($scope, Auth, $ionicPopup, $state) {
    
    
    $scope.doFacebookLogin = function(){
      Auth.$authWithOAuthPopup("facebook").then(function(authData){
          $state.go('app.home'); 
      }).catch(function(error){
          $ionicPopup.alert({
             title: "Error!",
             template: error.message
          });
      });
    };
          
    $scope.doLogin = function(email, password) {
        Auth.$authWithPassword({
            email: email,
            password: password
        }).then(function(authData){
            //console.log(authData);
            $state.go('app.home');
        }).catch(function(error){
           $ionicPopup.alert({
              title: "Error!",
              template: error.message
           });
        });
    };
    
    $scope.doRegister = function(email, password) {
        Auth.$createUser({
            email: email,
            password: password
        }).then(function(authData){
           // console.log(authData);
           $ionicPopup.alert({
              title: "Congratulations!",
              template: "You have successfully registered."
           }); 
        }).catch(function(error){
            $ionicPopup.alert({
              title: "Error!",
              template: error.message
           });
        });
    };
    
}])

.controller('ChatBotCtrl', ['$scope', '$ionicPlatform', '$timeout', 'Flickr', '$ionicModal', '$ionicScrollDelegate', '$ionicSlideBoxDelegate', '$ionicPopover', '$cordovaToast', 'ChatFactory', 'FavoriteFactory','$ionicPopup', '$state', 'Auth', function($scope, $ionicPlatform,$timeout, Flickr, $ionicModal, $ionicScrollDelegate, $ionicSlideBoxDelegate, $ionicPopover, $cordovaToast, ChatFactory, FavoriteFactory, $ionicPopup, $state, Auth){
    
    $scope.searchTerm = "";
    $scope.modalImages = [];
    $scope.chats = ChatFactory.getAllChats();
    var lastSearch = "";
    var currentChatId = 0;
    
    $scope.goToHome = function(){
        $state.go('app.home');
    };
    
    $scope.search = function(){
        if($scope.searchTerm != ""){
            if($scope.searchTerm.toLowerCase() == 'more' && lastSearch != ""){
                $scope.searchTerm = lastSearch;
            }

            // Creating & adding search card data in chats array
            ChatFactory.addSearchChat($scope.searchTerm);
            
            lastSearch = $scope.searchTerm;

            // Creating & adding images card data in chats array
            Flickr.searchPhotos($scope.searchTerm, 10).success(function(data){
                ChatFactory.addImagesChat(data);
                //  console.log("Data: " + JSON.stringify(data));
                }).error(function(error){
                    console.log(error);
            });
            
            $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom(true);
            $scope.searchTerm = "";
        }
    };
     
    $scope.zoomMin = 1;
    
    $scope.showImages = function(index, chatId){
        currentChatId = chatId;
        //console.log("cardId: " + chatId);
      $scope.modalImages = ChatFactory.getChatImages(chatId);
       //console.log("Modal Images: " + JSON.stringify($scope.modalImages));
      //console.log("Index: " + index);
      $scope.activeSlide = index;
      $scope.showModal('templates/galleryZoom.html');
    };
    
    $scope.showModal = function(templateUrl){
        $ionicModal.fromTemplateUrl(templateUrl, {
            scope: $scope
        }).then(function(modal){
           $scope.modal = modal;
           $scope.modal.show();
        });
    };
    
    $scope.closeModal = function(){
      $scope.modal.hide();
      $scope.modal.remove();
    };
    
    $scope.updateSlideStatus = function(slide){
      var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;
        
      if(zoomFactor == $scope.zoomMin){
        $ionicSlideBoxDelegate.enableSlide(true);  
      }else{
        $ionicSlideBoxDelegate.enableSlide(false);
      }    
    };
    
    
    /* $ionicPopover.fromTemplateUrl('templates/galleryZoomPopover.html', {
        scope: $scope
    }).then(function(popover){
        $scope.popover = popover;
    });
    
    $scope.openPopover = function($event){
      $scope.popover.show($event);
        $timeout(function(){
            $scope.popover.hide();
        }, 30000);
    }; */ // Bug: popover is displayed below modal after second try. (will check later)
    
    // Implement Remaining
    $scope.addFavorite = function(index, pic){
       // $scope.popover.hide();
        console.log(" Added Favorite");
        var slideBoxIndex = $ionicSlideBoxDelegate.$getByHandle('slideBoxScroll').currentIndex();
       // console.log("currentChatId: " + currentChatId + ", index: " + slideBoxIndex);
        FavoriteFactory.addToFavorites(currentChatId, slideBoxIndex);
        $ionicPopup.alert({
           title: "Added to your favorites!",
        });
        /*$ionicPlatform.ready(function(){
           $cordovaToast.showLongCenter("Added Favorite").then(
            function(){
               // Success
           },function(){
               // True
           }); 
        });*/ // Bug: Toast is displayed below modal after second try. (will check later)
    };
    
    // Implement Remaining
    $scope.addComment = function(){
       // $scope.popover.hide();
        console.log(" Added Comment");
        
        $scope.comments = {};
        
        $ionicPopup.show({
           template: '<input type="text" ng-model="comments.comment">',
           title: 'Enter Comment',
           scope: $scope,
           buttons: [
               { text: 'Cancel',
                 onTap: function(e){
                     $ionicPopup.alert({
                         title: "Added Nothing!" 
                     });
                  }
               },
               { 
                 text: '<b>Save</b>',
                 type: 'button-positive',
                 onTap: function(e){
                     if($scope.comments.comment){
                         $ionicPopup.alert({
                         title: "Added your Comment!"
                      });
                      console.log($scope.comments.comment);
                     }else{
                        $ionicPopup.alert({
                         title: "Added Nothing!" 
                        });
                         console.log($scope.comments.comment);
                     }
                  }
               } 
            ]
        }); 
        /* $ionicPlatform.ready(function(){
           $cordovaToast.showLongCenter("Added Comment").then(
            function(){
               // Success
           },function(){
               // True
           }); 
        }); */ // Bug: Toast is displayed below modal after second try. (will check later)
    };
     
    // Implement Remaining
    $scope.addTag = function(){
       // $scope.popover.hide();
        
        $scope.tags = {};
        
        $ionicPopup.show({
           template: '<input type="text" ng-model="tags.tag">',
           title: 'Enter Tag',
           scope: $scope,
           buttons: [
               { text: 'Cancel',
                 onTap: function(e){
                     $ionicPopup.alert({
                         title: "Added Nothing!" 
                     });
                  }
               },
               { 
                 text: '<b>Save</b>',
                 type: 'button-positive',
                 onTap: function(e){
                     if($scope.tags.tag){
                         $ionicPopup.alert({
                         title: "Added your Tag!"
                      });
                      console.log($scope.tags.tag);
                     }else{
                        $ionicPopup.alert({
                         title: "Added Nothing!" 
                        });
                        console.log($scope.tags.tag);
                     }
                  }
               } 
            ]
        });
       /* $ionicPlatform.ready(function(){
           $cordovaToast.showLongCenter("Added Tag").then(
            function(){
               // Success
           },function(){
               // True
           }); 
        }); */
    };
    
}])

.controller('FavoritesCtrl', ['$scope', 'FavoriteFactory', function($scope, FavoriteFactory) {
    $scope.favorites = FavoriteFactory.getFavorites();
}]);

