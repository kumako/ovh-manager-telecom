angular.module("managerApp").controller("TelecomTelephonyLineManagementLanguageCtrl", function ($translate, $q, $stateParams, $timeout, Toast, Telephony, $filter) {
    "use strict";

    var self = this;

    this.loaders = {
        init: true,
        change: false
    };
    this.availableLanguages = [];
    this.language = null;
    this.changeSuccess = false;

    this.changeLanguage = function () {
        self.loaders.change = true;

        return Telephony.Line().Options().Lexi().update({
            billingAccount: $stateParams.billingAccount,
            serviceName: $stateParams.serviceName
        }, {
            language: self.language
        }).$promise.then(function () {
            self.changeSuccess = true;
            $timeout(function () {
                self.changeSuccess = false;
            }, 3000);
            Toast.success($translate.instant("telephony_line_language_ok_change"), { hideAfter: 3 });
        }).catch(function (err) {
            Toast.error($translate.instant("telephony_line_language_error_change"), err);
        }).finally(function () {
            self.loaders.change = false;
        });
    };

    /*= =====================================
    =            INITIALIZATION            =
    ======================================*/

    function init () {
        self.loaders.init = true;
        self.language = null;
        return Telephony.Lexi().schema().$promise.then(function (schema) {
            angular.forEach(schema.models["telephony.LineOptionLanguageEnum"].enum, function (language) {
                self.availableLanguages.push({
                    value: language,
                    label: $translate.instant("telephony_line_language_value_" + _.snakeCase(language))
                });
            });
            self.availableLanguages = $filter("orderBy")(self.availableLanguages, "label");
            return self.availableLanguages;
        }).then(function () {
            return Telephony.Line().Options().Lexi().get({
                billingAccount: $stateParams.billingAccount,
                serviceName: $stateParams.serviceName
            }).$promise.then(function (options) {
                var language = _.find(self.availableLanguages, { value: options.language });
                if (language) {
                    self.language = language.value;
                }
                return self.language;
            });
        }).catch(function () {
            Toast.error($translate.instant("telephony_line_language_error_init"));
        }).finally(function () {
            self.loaders.init = false;
        });
    }

    /* -----  End of INITIALIZATION  ------*/

    init();

});
