app.controller('profileController',['$http','$q','$scope','$stateParams','$upload','$window','statusFetch','authenticationService','getData',function($http,$q,$scope,$stateParams,$upload,$window,statusFetch,authenticationService,getData){
	var socket = io();
   $scope.postMsg = {
      msg : ''
   };
   $scope.uploadProgress = '';
   $scope.uploaded = false;
   $scope.savepath = '';

   $scope.data = new FormData();
   $scope.user = {};
   $scope.commentMsg = '';
   $scope.statuses = {};
   $scope.nextPage = 2;
   $scope.currentPage = 1;

   $scope.logout = function(){
   	authenticationService.logout().then(function(data){
				if(data){
					$window.location.href = '/';
				}
			});

   };

 
   $scope.post = function(){
    if($scope.uploaded){
      $http({
         url : 'user/post',
         method : 'post',
         data : {msg: $scope.postMsg.msg, attachment : $scope.savepath},
         headers : {'Content-Type':'application/json'}
      }).then(function(result,status,headers,config){
          $scope.postMsg = {};
         $scope.uploaded = false;
            var dataToPush = [];
          for(var i=0;i<result.data.length;i++){
            for(var j=0; j<result.data[i].length;j++){
              dataToPush.push(result.data[i][j]);
            }
          }
          $scope.statuses = dataToPush;
      },function(error){
         if(error)
          throw error;
      });
    }else{
      $http({
         url : 'user/post',
         method : 'post',
         data : {msg :$scope.postMsg.msg, page: $scope.currentPage, to: $stateParams.u},
         headers : {'Content-Type':'application/json'}
      }).then(function(result,status,headers,config){
         $scope.postMsg = {};
         $scope.uploaded = false;
            var dataToPush = [];
          for(var i=0;i<result.data.length;i++){
            for(var j=0; j<result.data[i].length;j++){
              dataToPush.push(result.data[i][j]);
            }
          }
          $scope.statuses = dataToPush;
      },function(error){
         if(error)
            throw error;
      });
    }
   }

   $scope.onFileSelect = function ($file) {
    $scope.ajaxVisible = true;
    $scope.uploadError = false;
    var photo = $file[0];
    $scope.upload = $upload.upload({
        url: '/user/post',
        file: photo,
        method: 'POST',
        transformRequest : angular.identity,
        headers : {'Content-Type': undefined}
    }).progress(function (evt) {
     $scope.uploadProgress = 'percent: ' + parseInt(100.0 * evt.loaded / evt.total);
        }).success(function (data, status, headers, config) {
         $scope.uploaded = true;
         $scope.savepath = data;
         console.log($scope.savepath);
         }).error(function (err) {
            if(err)
               throw err;
        });
};

  $scope.comment = function(id,msg){
    $http({
      method: 'post',
      url : '/api/comment',
      data : {postid : id, msg : msg, To : $stateParams.u, page: $scope.currentPage},
      headers : {'Content-Type':'application/json'}
    }).then(function(result){
         var dataToPush = [];
          for(var i=0;i<result.data.length;i++){
            for(var j=0; j<result.data[i].length;j++){
              dataToPush.push(result.data[i][j]);
            }
          }
          $scope.statuses = dataToPush;
    }, function(error){
      console.log(error);
    })
  };

  $scope.fetchStatuses = function(){
    return $scope.statuses = statusFetch.data;
  }();

   $scope.emit = function(){
      socket.emit('msg', 'new message');
   };

   $scope.user = getData.data;

   $scope.deletePost = function(id){
        $http({
          method: 'delete',
          url : '/api/post',
          data : {postid : id, account: $stateParams.u, page : $scope.currentPage},
          headers : {'Content-Type':'application/json'}
        })
        .then(function(result){
          var dataToPush = [];
          for(var i=0;i<result.data.length;i++){
            for(var j=0; j<result.data[i].length;j++){
              dataToPush.push(result.data[i][j]);
            }
          }
          $scope.statuses = dataToPush;
        },function(err){
          console.log(err);
        });
   };

   $scope.deleteComment = function(postid,commentid){
        $http({
          method : 'delete',
          url : '/api/comment',
          data : {id : commentid, postid : postid, account:$stateParams.u, page : $scope.currentPage},
          headers : {'Content-Type':'application/json'}
        })
        .then(function(result){
         var dataToPush = [];
          for(var i=0;i<result.data.length;i++){
            for(var j=0; j<result.data[i].length;j++){
              dataToPush.push(result.data[i][j]);
            }
          }
          $scope.statuses = dataToPush;
        },function(error){
          if(error)
            return console.log(error);
        });
   };

   $scope.fetchPage = function(){
      $http({
        method : 'post',
        url : '/api/status',
        data : {page:$scope.nextPage, user: $stateParams.u},
        headers : {'Content-Type':'application/json'}
      })
      .then(function(result){
        $scope.nextPage+=1;
        $scope.currentPage+=1;
        for(var i=0; i<result.data.length;i++){
          $scope.statuses.push(result.data[i]);
        }
      },function(err){
        if(err)
          console.log(err);
      })
   };

}]);