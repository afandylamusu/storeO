;

var SportCenterCourt = (function ($, window, document, undefined) {

    var ctrStart = null, ctrEnd = null, ctrInvTypeCode = null, ctrDay = null, ctrMonth = null, ctrYear = null, urlCartAction = null;
    var productId = null; 

    smNetConsumer.init({
        publicKey: '934f584794be7037974abd433ddc3829',
        secretKey: 'ad11c01e0f3e6cb2ae3a4539a3558de7',
        //publicKey: '3694f413763e220ba0e87d62a34cc64f',
        //secretKey: '309f92910b9eaad3504f7b3bafacefe0',
        url: 'http://localhost:6109'
    });

    function GetApiResource(resource) {
        return "/api/v1"+ resource;
    }

    function callSMWapi(resourceUrl, method, data) {
        smNetConsumer.startRequest({
            resource: resourceUrl,
            method: method,
            content: data,
            beforeSend: BeforeSend,
            fail: Fail,
            done: Done
        });
    }

    function BeforeSend(jqXHR, settings) {
        //console.log('Request ajax settings: ' + JsonStringify(settings));
    }

    function formatTime(dt) {
        var date = new Date(dt.replace('T', ' '));
        return $.format.date(date, 'HH:mm');
    }

    function Done(data, textStatus, jqXHR) {
        console.log('Response OK:\r\n' + jqXHR.getAllResponseHeaders() + '\r\n' + JsonStringify(data));

        /// remove all childs
        $('div.spc-schedules').empty();

        if (!data[0])
            return;

        $.each(data[0].schedules, function (i, v) {
            
            var btn = jQuery('<div/>', {
                'data-id': v.id,
                'data-invtypecode': v.master_schedule_id + ":" + v.id + ":" + v.rate_id,
                'data-start': v.start,
                'data-end': v.end,
                'data-href': urlCartAction,
                'data-form-selector': '#product-details-form',
                'data-type': 'cart',
                'data-action': 'add',
                text: formatTime(v.start) + ' - ' + formatTime(v.end) + ' | ' + $.number(v.rate.amount, 2)
            });

            switch (parseInt(v.avail_status_code)) {
                case 1:
                    btn.addClass('btn btn-warning add-to-cart-button');
                    btn.attr("disabled", 'disabled');
                    break;
                case 2:
                case 3:
                    btn.addClass('btn btn-error add-to-cart-button');
                    btn.attr("disabled", 'disabled');
                    break;
                case 0:
                    btn.addClass('btn btn-success add-to-cart-button ajax-cart-link');
                    break;
            }              
            
            btn.appendTo('div.spc-schedules');
        });
    }

    function Fail(jqXHR, textStatus, errorThrown) {
        console.warn('Response failed (' + (errorThrown || '?') + '):\r\n' + jqXHR.getAllResponseHeaders() + '\r\n' + jqXHR.responseText);
    }

    function JsonStringify(obj) {
        return obj ? JSON.stringify(obj, undefined, 2) : null;
    }

    function createCommand(el) {
        if (!_.isElement(el)) {
            return null;
        }

        el = $(el);

        var cmd = {
            src: el,
            type: el.data("type") || "cart", // or "wishlist" or "compare",
            action: el.data("action") || "add", // or "remove" or "addfromwishlist"
            href: el.data("href") || el.attr("href"),
            data: undefined // wird weiter unten
        };

        if (el.data("form-selector")) {
            str = $(el.data("form-selector")).serialize();

            // HACK (MC)!
            // we changed the ModelType of the _AddToCart
            // from ...ProductModel.AddToCart to .ProductModel.
            // Therefore input names are not in the form anymore as the ShoppingCartController 
            // expects them. Hacking here ist much easier than refactoring the controller method.
            // But change this in future of couse.
            arr = str.split(".");
            if (arr.length == 3 && arr[1] == "AddToCart") {
                str = arr[0] + "." + arr[2];
            }

            cmd.data = str;
        }

        return cmd;
    }

    function reloadSchedules() {
        if (!ctrYear.val().trim() || !ctrMonth.val().trim() || !ctrDay.val().trim()) {
            return;
        }

        var bookingDate = ctrYear.val() + '-' + ctrMonth.val() + '-' + ctrDay.val();

        var d = {
            pid: productId,
            ci: bookingDate,
            co: bookingDate
        };

        callSMWapi(GetApiResource("/search"), "post", {
            check_in: d.ci,
            field_ids: [d.pid]
        });
    }

    EventBroker.subscribe("ajaxcart.item.adding", function (msg, data) {
        console.log(data);
        ctrInvTypeCode.val($(data.src["0"]).data("invtypecode"));
        console.log(ctrInvTypeCode.val());
        nData = createCommand(data.src["0"]);
        $.extend(data, nData);
        console.log(data.data);
    });

    // to refresh schedules after add product into cart
    EventBroker.subscribe("ajaxcart.complete", function (mst, data) {
        reloadSchedules();
    });

    return {
        refreshSchedules: function (pid, oDay, oMonth, oYear, oStart, oEnd, oInvTypeCode, urlAction) {
            productId = pid;
            ctrStart = oStart;
            ctrEnd = oEnd;
            ctrInvTypeCode = oInvTypeCode;
            ctrDay = oDay;
            ctrMonth = oMonth;
            ctrYear = oYear;
            urlCartAction = urlAction;

            reloadSchedules();
        },
    };

})(jQuery, this, document);