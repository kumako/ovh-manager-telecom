angular.module("managerApp").config(function ($stateProvider) {
    "use strict";

    $stateProvider.state("telecom.telephony.fax.password", {
        url: "/password",
        views: {
            "@telephonyView": {
                templateUrl: "app/telecom/telephony/fax/password/telecom-telephony-fax-password.html",
                noTranslations: true
            },
            "@faxPasswordView": {
                templateUrl: "app/telecom/telephony/service/fax/password/telecom-telephony-service-fax-password.html",
                controller: "TelecomTelephonyServiceFaxPasswordCtrl",
                controllerAs: "PasswordCtrl"
            }
        },
        translations: ["common"]
    });
});
