angular.module("managerApp").controller("TelecomTelephonyServiceFaxCampaignsReadCtrl", function ($stateParams, $q, $uibModalInstance, Telephony, campaign, ToastError) {
    "use strict";

    var self = this;

    /*= ==============================
    =            HELPERS            =
    ===============================*/

    function fetchCampaignDetail (theCampaign) {
        return Telephony.Fax().Campaigns().Lexi().getDetail({
            billingAccount: $stateParams.billingAccount,
            serviceName: $stateParams.serviceName,
            id: theCampaign.id
        }).$promise;
    }

    /* -----  End of HELPERS  ------*/

    /*= ==============================
    =            ACTIONS            =
    ===============================*/

    self.close = function () {
        return $uibModalInstance.close(true);
    };

    /* -----  End of ACTIONS  ------*/

    /*= =====================================
    =            INITIALIZATION            =
    ======================================*/

    function init () {
        self.loading = {
            init: false
        };

        self.campaign = angular.copy(campaign);

        self.details = {
            todo: null,
            success: null,
            failed: null
        };

        self.list = {
            todo: true,
            success: true,
            failed: false
        };

        self.loading.init = true;
        return fetchCampaignDetail(campaign).then(function (details) {
            return _.assign(self.details, details);
        }).catch(function (err) {
            if (err.status === 400) {
                return $q.reject(err);
            }
            return new ToastError(err);
        }).finally(function () {
            self.loading.init = false;
        });
    }

    /* -----  End of INITIALIZATION  ------*/

    init();
});
