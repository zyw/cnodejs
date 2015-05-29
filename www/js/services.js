/**
 * Created by Administrator on 2015/5/29.
 */
angular.module('starter.services', [])

.factory('Topics', function($rootScope,$http) {
    return {
        all: function() {
            $http.get("https://cnodejs.org/api/v1/topics").success(function(data){
                $rootScope.$broadcast('topics.success',data);
            });
        }
    };
})
.factory("Topic",function($rootScope,$http){
    return {
        topicById:function(topicId){
            $http.get("https://cnodejs.org/api/v1/topic/"+topicId).success(function(data){
                $rootScope.$broadcast('topic.success',data);
            });
        }
    }
});