// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })
    .state('app.topiclists', {
      url: "/topiclists",
      views: {
        'menuContent': {
          templateUrl: "templates/topiclists.html",
          controller: 'TopiclistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: "/topiclists/:topicId",
    views: {
      'menuContent': {
        templateUrl: "templates/topic.html",
        controller: 'TopicCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/topiclists');
})
//去除html标签
.filter('to_trusted', [function() {
  return function (text) {
    var result = text.replace(/<[^>]+>/g,'');
    return result;
  };
}])
.filter('label_dis',function(){
  return function (topic) {
    if(topic.top){
      return '<span class="color-demo balanced-bg balanced-border">置顶</span>';
    }else if(topic.good){
      return '<span class="color-demo calm-bg calm-border">精华</span>';
    }else{
      var result = "";
      switch(topic.tab){
        case 'share':
          result = '<span class="color-demo positive-bg positive-border">分享</span>';
          break;
        case 'ask':
          result = '<span class="color-demo energized-bg energized-border">问答</span>';
          break;
        case 'job':
          result = '<span class="color-demo royal-bg royal-border">招聘</span>';
          break;
      }
      return result;
    }
  }
})
.filter('before_time',function(){
  return function(date){
    var now_time = new Date().getTime();

    var bf_time = new Date(date).getTime();

    var bt = now_time-bf_time;

    var s = bt/1000;
    if(s > 60){
      var m = s/60;
      if(m > 60){
        var h = m/60;
        if(h > 24){
          return ((h/24) + "").split('.')[0]+"天前";
        }else{
          return (h+"").split('.')[0]+"小时前";
        }
      }else{
        return (m+"").split('.')[0]+"分钟前";
      }
    }else{
      return (s+"").split('.')[0]+"秒前";
    }
  }
});
