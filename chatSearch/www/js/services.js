

angular.module('chatSearch.services', [])

.factory('FireRef', function(){
    return new Firebase("https://subodh.firebaseio.com/");
})

.factory('Auth', ['FireRef', '$firebaseAuth', function(FireRef, $firebaseAuth){
    return $firebaseAuth(FireRef);
}])

.factory('Flickr', ['$http', function($http){
    var promise = {};
    
    promise.searchPhotos = function(searchTerm, photoCount){
      return $http({
                    method: 'GET',
                    url: "https://api.flickr.com/services/rest",
                    params: {
                        method: 'flickr.photos.search',
                        api_key: 'a071c71ecd2cec5e1f337a68db7bed7c',
                        text: searchTerm,
                        per_page: photoCount,
                        format: 'json',
                        nojsoncallback: 1
                    }
                })  
    };
    
    return promise;
}])

.factory('ChatFactory', function(){
    var chatFac = {};
    var chats = [];
    var cardCount = 0;
    
    chatFac.addSearchChat = function(text){
        chats.push({
            id: cardCount,
            type: "search",
            text: text
        });
        cardCount++;
    };
    
    chatFac.addImagesChat = function(data){
        chats.push({
            id: cardCount,
            type: "images",
            allImages: data
        });
        cardCount++;
    };
    
    chatFac.getAllChats = function(){
      return chats;  
    };
    
    chatFac.getChat = function(chatId){
      return chats[chatId]  
    };
    
    chatFac.getChatImages = function(chatId){
      return chats[chatId].allImages.photos.photo;  
    };
    
    chatFac.getChatPhoto = function(chatId, index){
        return chats[chatId].allImages.photos.photo[index];
    };
    
    return chatFac;
})

.factory('FavoriteFactory', ['ChatFactory', function(ChatFactory){
   var favFac = {};
   var favorites = [];
    
    favFac.addToFavorites = function(currentChatId, slideBoxIndex){
      console.log("CurrentChatId: " + currentChatId + ", slideBoxIndex: " + slideBoxIndex);
      favorites.push(ChatFactory.getChatPhoto(currentChatId, slideBoxIndex));
    
       /* for(var i = 0; i < favorites.length; i++){
            if(favorites.chatId == currentChatId && favorites.slideId == slideBoxIndex){
                return;
            }
        } */
        };
    
    favFac.getFavorites = function(){
        return favorites;
    }
    
   return favFac;
}])

;