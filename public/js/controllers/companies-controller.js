angular.module('app')
  .controller( 'CompaniesController', [ '$scope', '$timeout', 'CompanyFactory', function( $scope, $timeout, CompanyFactory ) {

    $scope.companies;
    $scope.selection;

    $scope.getAll = function( pendingAdd ) {

      CompanyFactory.getAll()
        .then( function(data) {
          //console.log(data);
          $scope.companies = data;
          $scope.selectDefault( pendingAdd );
        })
        .catch( function(error) {
          console.error(error);
        });
    };


    // set selected company (list item)
    $scope.select = function( company ) {
      $scope.selection = company;
    };

    // first company selected by default unless a new
    // company has just been added (then select that)
    $scope.selectDefault = function( addedNewCompany ) {
      if ( addedNewCompany ) {
        $scope.selection = $scope.companies[ $scope.companies.length - 1 ];
      } else {
        $scope.selection = $scope.companies[0];
      }
    };


    $scope.addCompany = function(name) {

      CompanyFactory.addCompany(name)
        .then( function (data) {
          $scope.name = '';
        })
        .catch( function(error) {
          console.error(error);
        });

      $scope.getAll( true );
    };


    $scope.deleteCompany = function(id) {

      if ( !confirm('Are you sure you want to delete this company?') ) {
        return;
      }
      //console.log(id);
      CompanyFactory.deleteCompany(id)
        .catch( function(error) {
          console.error(error);
        });
        
      $scope.getAll();
    };

    
    /******************************************
    // Research if this is still used anywhere
    ******************************************/
    $scope.getCompany = function(name) {
      // console.log(name);// -- it worked
      CompanyFactory.getCompany(name)
        .catch( function(error) {
          console.error(error);
        });

    };


    $scope.appliedToCompany = function() {

    };


    // HACK: forcing #defaultTask click event
    // inits nested view AND $scope.currentTask
    
    var selectDefaultTask = function () {
      $timeout( function() {
        var node = document.querySelector('#defaultTask');
        angular.element(node).triggerHandler('click');
      }, 100);
    };

    $scope.getAll();
    selectDefaultTask();

  }]);