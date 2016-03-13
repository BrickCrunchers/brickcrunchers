angular.module('app')
  .controller( 'CompaniesController', [ '$rootScope', '$scope', 'CompanyFactory', function( $rootScope, $scope, CompanyFactory ) {

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

    // first company selected by default, unless
    // new company has been added (select it)
    $scope.selectDefault = function( addedNewCompany ) {
      if ( addedNewCompany ) {
        $scope.selection = $scope.companies[ $scope.companies.length - 1 ];
      } else {
        $scope.selection = $scope.companies[0];
      }
    };


    $scope.addCompany = function(name) {

      if ( name === '') {
        return;
      }

      CompanyFactory.addCompany(name)
        .then( function (data) {
          $scope.name = '';
        })
        .catch( function(error) {
          console.error(error);
        });

      $scope.getAll( true );
    };


    $scope.getCompany = function(name) {
      // console.log(name);// -- it worked
      CompanyFactory.getCompany(name)
        .catch( function(error) {
          console.error(error);
        });

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

    $scope.appliedToCompany = function() {

    };
    
    
    $scope.getAll();

  }]);