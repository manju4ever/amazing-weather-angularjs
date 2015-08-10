
(function() {
  
  angular.module('WeatherApp',[])
  
  .config(function() {
         
  })
  
  .controller('MainCtrl', MainCtrl);
   
  function MainCtrl($scope,$log,$http) {
   
    var vm = this;
    vm.ngVersion = angular.version.codeName;
    $scope.getWeather = function() {
      $http({
        method:'GET',
        url:'http://api.openweathermap.org/data/2.5/weather?q='+vm.searchCity+"&units=metric"
      })
      .success(function(response) {
        
       vm.weatherData = response;
          
      });
      
    }
    
    $scope.getPhotos = function() {
     
      $http({
        method:'GET',      
        url:"https://api.flickr.com/services/rest/?",
        params:{
            method:'flickr.photos.search',
            tags:vm.searchCity,
            accuracy:16,
            safety_level:2,
            api_key:'048a032f0808b480a4b219a53cfb88d3',
            per_page:48,
            format:'json',
            jsoncallback:'JSON_CALLBACK'            
        },
        method:'JSONP'
          
      })
      .success(function(response) {
                
          //console.log(JSON.stringify(response));
          
          if(angular.isDefined(response.photos)) {
          
           vm.image_list = getAllImageUrl(response.photos.photo);
              
          }
        
      });
      
    } //End of getPhotos
    
    
    function getAllImageUrl(photo_list) {
        
        var image_sources = [];
        
       // console.log(JSON.stringify(photo_list));
        
        angular.forEach(photo_list, function(value, key) {
           image_sources.push(
               {
                   id:key,
                   url:"https://farm"+value.farm
                   +".staticflickr.com/"+value.server
                   +"/"+value.id+"_"+value.secret+"_m.jpg"
               }
            );                        
        });
            
        return image_sources;
    } //End of getAllImageUrl
    
    
    
    
  }//End of MainCtrl
  
})();