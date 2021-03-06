angular.module("managerApp").factory("PackXdslModemDhcpBdhcpObject", function (Xdsl, $translate, Toast, $q) {
    "use strict";

    var template = {
        MACAddress: "",
        name: "",
        IPAddress: ""
    };

    /**
     * Object constructor
     * @param {Object} data Data from APIv6
     */
    var PackXdslModemDhcpBdhcpObject = function (data) {
        _.extend(
            this,
            template,
            _.pick(
                data,
                Object.keys(template)
            )
        );
    };

    /**
     * Specify that the object has been read from the API
     */
    PackXdslModemDhcpBdhcpObject.prototype.inApi = function () {
        this.created = true;
    };

    /**
     * save a bdhcp
     * @param {String} serviceName Name of the Xdsl service
     * @param {String} lanName     Name of the Lan
     * @param {String} dhcpName    Name of the DHCP
     * @return {Promise}
     */
    PackXdslModemDhcpBdhcpObject.prototype.save = function (serviceName, lanName, dhcpName) {
        var self = this;
        this.busy = true;
        if (this.created) {
            return Xdsl.Modem().Lan().Dhcp().DHCPStaticAddress().Lexi().update(
                {
                    xdslId: serviceName,
                    lanName: lanName,
                    dhcpName: dhcpName,
                    MACAddress: this.MACAddress
                },
                _.pick(this.tempValue, _.without(Object.keys(template), "MACAddress"))
            ).$promise.then(function (data) {
                Toast.success($translate.instant("xdsl_modem_bdhcp_edit_success", { name: self.name }));
                _.extend(self, self.tempValue);
                self.toggleEdit(false);
                return data;
            }).catch(function (err) {
                Toast.error($translate.instant("xdsl_modem_bdhcp_edit_error", { name: self.name }) + "<em>" + err.data.message + "</em>");
                return $q.reject(err);
            }).finally(function () {
                self.busy = false;
            });
        }
        return Xdsl.Modem().Lan().Dhcp().DHCPStaticAddress().Lexi().post(
            {
                xdslId: serviceName,
                lanName: lanName,
                dhcpName: dhcpName
            },
            _.pick(this.tempValue, Object.keys(template))
        ).$promise.then(function (data) {
            Toast.success($translate.instant("xdsl_modem_bdhcp_add_success", { name: self.tempValue.name }));
            _.extend(self, self.tempValue);
            self.inApi();
            self.toggleEdit(false);
            return data;
        }).catch(function (err) {
            Toast.error($translate.instant("xdsl_modem_bdhcp_add_error", { name: self.tempValue.name }) + "<em>" + err.data.message + "</em>");
            return $q.reject(err);
        }).finally(function () {
            self.busy = false;
        });

    };

    /**
     * delete a bdhcp
     * @param {String} serviceName Name of the Xdsl service
     * @param {String} lanName     Name of the Lan
     * @param {String} dhcpName    Name of the DHCP
     * @return {Promise}
     */
    PackXdslModemDhcpBdhcpObject.prototype.remove = function (serviceName, lanName, dhcpName) {
        var self = this;
        this.busy = true;
        return Xdsl.Modem().Lan().Dhcp().DHCPStaticAddress().Lexi().delete(
            {
                xdslId: serviceName,
                lanName: lanName,
                dhcpName: dhcpName,
                MACAddress: this.MACAddress
            }
        ).$promise.then(function () {
            Toast.success($translate.instant("xdsl_modem_bdhcp_del_success", { name: self.name }));
            return self;
        }).catch(function (err) {
            return $q.reject($translate.inatant("xdsl_modem_bdhcp_del_error", { name: self.name }) + "<em>" + err.data.message + "</em>");
        }).finally(function () {
            self.busy = false;
        });
    };

    /**
     * Cancel edit mode
     */
    PackXdslModemDhcpBdhcpObject.prototype.cancel = function () {
        this.toggleEdit(false);
        return this.MACAddress;
    };

    /**
     * Enter Edit Mode
     */
    PackXdslModemDhcpBdhcpObject.prototype.edit = function () {
        this.tempValue = _.pick(this, Object.keys(template));
        this.toggleEdit(true);
    };

    /**
     * Toggle edit mode
     * @param {Boolean} state [Optional] if set, for the edit mode state
     * @return {Boolean} new edit mode state
     */
    PackXdslModemDhcpBdhcpObject.prototype.toggleEdit = function (state) {
        if (_.isBoolean(state)) {
            this.editMode = state;
        } else {
            this.editMode = !this.editMode;
        }
        return this.editMode;
    };

    return PackXdslModemDhcpBdhcpObject;

});
