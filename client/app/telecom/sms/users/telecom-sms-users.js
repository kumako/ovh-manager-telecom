angular.module("managerApp").config(($stateProvider) => {
    "use strict";
    $stateProvider.state("telecom.sms.users", {
        url: "/users",
        views: {
            smsInnerView: {
                templateUrl: "app/telecom/sms/users/telecom-sms-users.html",
                controller: "TelecomSmsUsersCtrl",
                controllerAs: "SmsUsersCtrl"
            }
        },
        translations: [
            "common",
            "telecom/sms/users"
        ]
    });
});
