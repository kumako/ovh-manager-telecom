angular.module("managerApp").config(function ($stateProvider) {
    "use strict";

    $stateProvider.state("telecom.telephony.alias.configuration.ovhPabx.sounds", {
        url: "/sounds",
        views: {
            "@aliasView": {
                templateUrl: "app/telecom/telephony/alias/configuration/ovhPabx/sounds/telecom-telephony-alias-configuration-ovhPabx-sounds.html",
                controller: "TelecomTelephonyAliasConfigurationOvhPabxSoundsCtrl",
                controllerAs: "$ctrl"
            }
        },
        translations: ["common", "telecom/telephony/alias/configuration/ovhPabx/sounds"]
    });
});
