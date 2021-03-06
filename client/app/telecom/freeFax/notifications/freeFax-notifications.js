angular.module("managerApp").config(function ($stateProvider) {
    "use strict";
    $stateProvider.state("telecom.freefax.notifications", {
        url: "/notifications",
        views: {
            "faxView@telecom.freefax": {
                templateUrl: "app/telecom/freeFax/notifications/freeFax-notifications.html",
                controller: "FreeFaxNotificationsCtrl",
                controllerAs: "FreeFaxNotifications",
                noTranslations: true
            }
        },
        translations: ["common", "telecom/freeFax"]
    });
});
