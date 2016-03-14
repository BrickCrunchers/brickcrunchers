var app = angular.module( 'app', ['ui.router', 'ui.bootstrap'] );

app.config( function( $stateProvider, $urlRouterProvider ) {
    
  $urlRouterProvider.otherwise('/home');
    
  $stateProvider
        
    .state('home', {
      url: '/home',
      templateUrl: '../views/home.html'
    })

    // nested COMPANIES view
    
    .state('companies', {
      url: '/companies',
      views: {
        '': { 
          templateUrl: '../views/companies.html',
          controller: 'CompaniesController',
        },
        'companyView@companies': {
          templateUrl: '../views/company.html'
        }
      }    
    })


    // nested TASK views...

    .state('companies.resume', {
      templateUrl: '../views/task-resume.html'
    })

    .state('companies.cover-letter', {
      templateUrl: '../views/task-coverletter.html'
    })

    .state('companies.research', {
      templateUrl: '../views/task-research.html'
    })

    .state('companies.contacts', {
      templateUrl: '../views/task-contacts.html'
    })

    .state('companies.dates', {
      templateUrl: '../views/task-dates.html',
      controller: 'CalendarController'
    })
    
    
    //LOGIN page
    .state('login', {
      url: '/login',
      templateUrl: '../views/login.html',
      controller: 'AuthController',
      onEnter: ['$state', 'auth', function($state, auth) {
        if (auth.isLoggedIn()) {
          $state.go('companies');
        }
      }]
    })

    //REGISTER page
    .state('register', {
      url: '/register',
      templateUrl: '../views/register.html',
      controller: 'AuthController',
      onEnter: ['$state', 'auth', function($state, auth) {
        if (auth.isLoggedIn()) {
          $state.go('companies');
        }
      }]
    });
    
});