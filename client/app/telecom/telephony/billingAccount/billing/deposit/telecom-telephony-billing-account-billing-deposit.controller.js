angular.module("managerApp").controller("TelecomTelephonyBillingAccountBillingDepositCtrl", function ($filter, $q, $stateParams, $translate, Order, Telephony, ToastError) {
    "use strict";
    var self = this;

    self.loading = {
        init: true,
        submit: false,
        success: false
    };

    self.securityDepositAmounts = [];
    self.securityDepositAmount = null;
    self.contracts = [];
    self.contractsAccepted = false;
    self.futureDeposit = null;
    self.group = null;
    self.order = null;

    function init () {
        self.loading.init = true;

        $q.all({
            securityDepositAmounts: self.getSecurityDepositAmounts(),
            billingAccount: self.getBillingAccount()
        }).then(function (data) {
            self.securityDepositAmounts = data.securityDepositAmounts;
            self.group = data.billingAccount;
        })
            .catch(function (err) {
                return new ToastError(err);
            })
            .finally(function () {
                self.loading.init = false;
            });
    }

    self.orderSecurityDeposit = function () {
        self.loading.submit = true;

        return Order.Telephony().Lexi().orderSecurityDeposit({
            billingAccount: $stateParams.billingAccount
        }, {
            amount: self.securityDepositAmount.value
        }).$promise.then(function (data) {
            self.order = data;
            self.loading.success = true;
        })
            .catch(function (err) {
                return new ToastError(err);
            })
            .finally(function () {
                self.loading.submit = false;
            });
    };

    self.onChangeAmount = function () {
        self.futureDeposit = null;
        self.contracts = null;

        return Order.Telephony().Lexi().getSecurityDeposit({
            billingAccount: $stateParams.billingAccount,
            amount: self.securityDepositAmount.value
        }).$promise.then(function (data) {
            self.contracts = data.contracts;
            self.contractsAccepted = false;

            self.futureDeposit = {};
            self.futureDeposit.currencyCode = data.prices.withoutTax.currencyCode;
            self.futureDeposit.value = data.prices.withoutTax.value + self.group.securityDeposit.value;
            self.futureDeposit.text = [$filter("number")(self.futureDeposit.value, 2), self.futureDeposit.currencyCode === "EUR" ? "€" : self.futureDeposit.currencyCode].join(" ");
        })
            .catch(function (err) {
                return new ToastError(err);
            });
    };

    self.getSecurityDepositAmounts = function () {
        return Telephony.Lexi().getAmountSecurityDeposit({
            billingAccount: $stateParams.billingAccount
        }).$promise;
    };

    self.getBillingAccount = function () {
        return Telephony.Lexi().get({
            billingAccount: $stateParams.billingAccount
        }).$promise;
    };

    init();
}
);
