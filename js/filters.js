angular.module('filters',[]).filter('done',function(){
    return function(arr,state){
        var newarr=[];
        angular.forEach(arr,function(o,i){
            if(o.done == state){
                newarr.push(o);
            }
        });
        return newarr;
    };
});