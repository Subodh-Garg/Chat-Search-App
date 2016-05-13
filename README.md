#Chat-Search-App
An hybrid chat mobile application to search photos using Flickr API.

##Synopsis
A full-fledged chat application that displays text and images as part of the chat interface.
Think of the following application : '*a user wishes to purchase an apparel item (a tshirt
or a dress), user texts to a bot application, and the application shows the user a set of 10 photos of 
that apparel fetched using Flickr API. The user can navigate through them and can text the bot to get 10 new photos*'.  

##App Structure/Usage
The app consists of following three Screens/Pages:  
1. Home/Login  
2. Chat Search  
3. My Favorites  

####App flow 
```Home/Login -> Chat Search -> Home -> My Favorites```

####App Usage
1. **Home/Login** 
 * Fill email and password text fields -> Register(if new user) -> Login (or you can directly login using already created user :  *email*: gargsubo@gmail.com, *password*: 1234 ).
 * Handles different error cases like email/password not provided, wrong email/password etc.
2. **Chat Search** 
 * Type only the name of apparel (eg. *shirt*) in the search textbox and press blue (submit) button. -> Displays both apparel and searched images (per search 10 images) in form of chat interface.
 * You can scroll through images by swiping left or right.
 * Tap on an image to view in full screen mode and display related options (Favorite, Comment, Tag).
 * You can still scroll through/zoom (by pinching) images and choose can select any of the above options.
3. **Favorites** 
 * Displays added favorite item's image and title.

##Built With
* **Frameworks** : *AngularJS*, *Ionic* and *Cordova*.
* **Firebase** : *BAAS* (backend as a service for user authentication).
* **Flickr API** : for search results.

##Prerequisities for running using Ionic
* First, install <a href="https://nodejs.org/en/">Node.js</a>
* Clone Project ```git clone https://github.com/Subodh-Garg/Chat-Search-App```
* ```cd Chat-Search-App\chatSearch```
* Run following commands in terminal    
```npm install -g ionic cordova```  
```ionic state restore ```  
```npm install```  

##Installation

####Run on device (*Android*)  
*NOTE* : App requires internet connection for Login and chat Search.

1. Install .apk file in your device.  
**File location** : '*Chat-Search-App/apk/android-debug.apk*' -> click '*View Raw*'

2. Run using *Ionic*.  
 * Connect your android device in Debug mode.
 * Open terminal(cmd prompt) at: '*Chat-Search-App\chatSearch*'
 * ```ionic run android```

####Run in Browser(shows both android and iOS)
 * Open terminal(cmd prompt) at: '*Chat-Search-App\chatSearch*'
 * ```ionic serve --lab```


##Supports
 * Android 4.1 and up.
 * Can support other platforms like: *iOS*, *Windows* etc. on addition of plaforms using *Ionic*.

##Known Issues / Features Remaining / Future Enhancements

#####Known Issues
 * Typing '*more*' in search field fetches old photos -> Need to fetch 10 new photos.
 * App requires login everytime a user wants to enter '*Chat Search*' screen -> Need to change authentication flow i.e. once authenticated should remain login and display '*logout*' option.
 * '*Chat Search*' screen does not automatically scroll down to bottom(properly) to display last entered item.

#####Features Remaining
 * '*Favorites*' option to store data permanently (locally on device or FireBase Cloud or Flickr API).
 * '*Comment*' and '*Tag*' Backend functionality (using Flickr API's and Node.js).
 * Outh Facebook login for user authentication -> using FireBase.
 
#####Enhancements
 * Display and handle '*No internet connections*' in case internet is disabled.
 * Display toast (*$cordovaToast*) messages instead of popovers (*$ionicPopover*) for (*Favorites,Comment,Tag*) options. -> Tried but requires a fix.
 * Update icon and splash screen.

##Author
 * Subodh Garg
 
##Acknowledgements
 * **Infilect Corp.** : Provided idea and detailed instructions for the App.
 * This project is started as the part of a coding assignment.
 * Any feedback would be truly appreciated :)

*NOTE* : This project is under development (started on *May 9, 2016*).
