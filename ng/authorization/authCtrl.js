/*global angular*/
/*global console*/
angular.module('app')
.controller('AuthCtrl', [
   '$scope',
   '$state',
   'auth',
   function($scope, $state, auth) {
      $scope.login = function() {
         auth.login($scope.user)
             .error(function(error) { $scope.error = error; })
             .then(function() { $state.go('home'); });
      };

      $scope.registerUser = function() {
         auth.register($scope.user)
             .error(function(data) {
               console.log('Error occurred: ' + data.message);
               $scope.error = data;
               console.log($scope.error.message);
             })
             .then(function() { console.log('Going home'); $state.go('home'); });
      };

      $scope.validateForm = function() {
         return $scope.validateUsername() &&
                $scope.validatePassword() && 
                $scope.validateVerify();
      };
      
      $scope.validateUsername = function() {
         if (/\s/g.test($scope.user.username)) {
            $scope.usernameMessage = "Username cannot contain whitespace";
            return false;
         }
         else {
            $scope.usernameMessage = "";
         }

         return true;
      };

      $scope.validatePassword = function() {
         if (/\s/g.test($scope.user.password)) {
            $scope.passwordMessage = "Password cannot contain whitespace";
            return false;
         }
         else if ($scope.user.password.length === 0) {
            $scope.passwordMessage = "Required";
            return false;
         }
         else {
            $scope.passwordMessage = "";
         }

         var classcount = 0;
         if ($scope.user.password.match(/[A-Z]/)) { classcount += 1; }
         if ($scope.user.password.match(/[a-z]/)) { classcount += 1; }
         if ($scope.user.password.match(/\d+/)) { classcount += 1; }
         if ($scope.user.password.match(/[!,@,#,$,%,\^,&,*,?,_,~,-,(,)]/)) { classcount += 1; }

         if (classcount < 3) {
            $scope.passwordMessage = "Password must contain 3 character classes (uppercase, lowercase, digit, symbol)";
            return false;
         }

         $scope.validateVerify();

         return true;
      };

      $scope.validateVerify = function() {
         if ($scope.user.password !== $scope.user.verify) {
            $scope.verifyMessage = "Passwords don't match";
            return false;
         }
         else if ($scope.user.verify.length === 0) {
            $scope.verifymessage = "Required";
            return false;
         }
         else {
            $scope.verifyMessage = "";
         }

         return true;
      };
   }
]);