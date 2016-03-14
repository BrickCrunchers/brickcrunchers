angular.module('app')
  .factory( 'CompanyFactory', ['$http', function($http) {

    var getAll = function() {

      return $http({
        method: 'GET',
        url: '/api/companies'
      })
      .then( function (resp) {
        return resp.data;
      })
      .catch( function(err) {
        console.log( 'CompanyFactory error:', err );
      });

    };

    
    var addCompany = function(name) {
      return $http({
        method: 'POST',
        url: '/api/companies',
        data: { name }
      });
    };


    var deleteCompany = function(id) {
      console.log('------factory id-----', id);
      return $http({
        method: 'DELETE',
        url: '/api/companies/' + id
      });
    };


    var getCompany = function(name) {
      return $http({
        method: 'GET',
        url: '/api/companies/' + name
      })
      .then( function (resp) {
      })
      .catch( function(err) {
        console.log( 'CompanyFactory error:', err );
      });
    };

    
    return {
      getAll: getAll,
      addCompany: addCompany,
      deleteCompany: deleteCompany,
      getCompany: getCompany
    };

  }]);