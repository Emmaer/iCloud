angular.module('ctrls',[]).controller('todolist',["$scope","$rootScope",function($scope,$rootScope){
    (function(key){
        var list=null;
        if(localStorage.getItem(key)==null){
            $scope.list=[{id:1,title:'新列表1',color:'#62DA37',list:[]}];
            localStorage.setItem(key,JSON.stringify($scope.list));
        }else{
            $scope.list=JSON.parse(localStorage.getItem(key));
        }
    })('todo');
    function save(){
        console.log($scope.list)
        localStorage.setItem('todo',JSON.stringify($scope.list));
    }
    $scope.colors=['#62DA37','#CC74E1','#1BAEF8','#F7CB00','#A68962','#FF2A6B','#FF7E00'];
    $rootScope.colorId =$scope.list.length%7-1;
    function getColorId(){
        $rootScope.colorId++;
        if($rootScope.colorId>=7){
            $rootScope.colorId=0;
        }
        return $rootScope.colorId;
    }

    $scope.getItem=function (id){
        angular.forEach($scope.list,function(o,i){
            if(o.id == id ){
                $scope.now=o;
                $scope.currentId=id;
                return false;
            }
        })
    };
    $scope.currentId=$scope.list[0].id;
    $scope.getItem($scope.currentId);

    //添加数据
    $scope.add=function(){
        var all = $scope.list;
        var o={};
        o.id=all[all.length-1].id+1;
        o.title='新列表'+ o.id;
        o.color=$scope.colors[getColorId()];
        o.list=[];
        $scope.list.push(o);
        save();
        $scope.currentId=o.id; //
        $scope.getItem($scope.currentId);
    };

    $scope.addList=function(){
        $scope.now.list.push({title:'',done:false});
        angular.forEach($scope.list,function(o,i){
            if(o.id == $scope.now.id){
                $scope.list[i] = $scope.now;
            }
        })
        save();
    };
    $scope.change=function(a){
        angular.forEach($scope.list,function(o,i){
            if(o.id == $scope.now.id){
                $scope.list[i] = $scope.now;
                save();
            }
        })
    };
}])