'use strict';

var formValidation = require('base/components/formValidation');

module.exports = {
    submitAccount: function() {
        $('form.profile-form').submit(function(e) {
            var $form = $(this);
            e.preventDefault();
            var url = $form.attr('action');
            $form.spinner().start();
            $('form.profile-form').trigger('profile.submit', e);
            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: $form.serialize(),
                success: function(data) {
                    $form.spinner().stop();
                    if (!data.success) {
                        formValidation($form, data);

                    } else {
                        window.location.href = data.redirectUrl;
                    }
                },
                error: function(err) {
                    if (err.responseJSON.redirectUrl) {
                        window.location.href = err.responseJSON.redirectUrl;
                    }
                    $form.spinner().stop();
                }
            })
        })
    }
}