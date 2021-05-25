$(document).ready(function () {
    $('.filter [data-year]').on('click', function () {
        let val = ($(this).attr('data-stado') == 'on') ? 'off' : 'on';
        $(this).attr('data-stado', val);

        $('.card[data-year]').each(function () {
            let stado = $('.filter [data-year="' + $(this).data('year') + '"]').attr('data-stado');
            $(this).attr('data-stado-year', stado);
        });
        $(this).children('i').toggleClass('fa-check');
        $(this).children('i').toggleClass('fa-ban');

        if ($('.filter-remove[data-year="' + $(this).data('year') + '"]').length === 0) {
            $('.main-card.mb-3 .container').prepend(
                '<span class="mb-2 mr-2 badge badge-pill badge-secondary filter-remove" data-year="' + $(this).data('year') + '">' + $(this).data('year') + ' X </span>'
            );
        } else {
            $('.filter-remove[data-year="' + $(this).data('year') + '"]').remove();
        }
        showHide();
    });

    $('.filter [data-type]').on('click', function () {
        let val = ($(this).attr('data-stado') == 'on') ? 'off' : 'on';
        $(this).attr('data-stado', val);


        $('.card[data-type]').each(function () {
            let stado = $('.filter [data-type="' + $(this).data('type') + '"]').attr('data-stado');
            $(this).attr('data-stado', stado);
        });

        $(this).children('i').toggleClass('fa-check');
        $(this).children('i').toggleClass('fa-ban');

        if ($('.filter-remove[data-type="' + $(this).data('type') + '"]').length === 0) {
            $('.main-card.mb-3 .container').prepend(
                '<span class="mb-2 mr-2 badge badge-pill badge-secondary filter-remove" data-type="' + $(this).data('type') + '">' + $(this).data('type') + ' X </span>'
            );
        } else {
            $('.filter-remove[data-type="' + $(this).data('type') + '"]').remove();
        }
        showHide();
    });

    $('[data-target="#modal-avisos"]').on('click', function () {
        let href = $(this).attr('href');
        $.ajax({
            url: href
        }).done(function (response) {
            $('#modal-avisos .modal-content').html(response);
        });
    });

    $('[data-target="#modal-avisos"]').on('touch', function () {
        let href = $(this).attr('href');
        $.ajax({
            url: href
        }).done(function (response) {
            $('#modal-avisos .modal-content').html(response);
        });
    });

    $('[data-delete]').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/cuenta/ajax-delete',
            data: {'id': $(this).data('delete')},
        }).done(function (response) {
            $('#modal-delete .modal-content').html(response);
        });

        $(this).parent().parent().hide();
    });

    //TODO:revisar por que necesita el tiemout
    setTimeout(function () {
        $('#daterange').daterangepicker({
            "locale": {
                "format": "DD/MM/YYYY",
                "separator": " - ",
                "applyLabel": "Aceptar",
                "cancelLabel": "Cancelar",
                "fromLabel": "Desde",
                "toLabel": "Hasta",
                "customRangeLabel": "Custom",
                "weekLabel": "W",
                "daysOfWeek": [
                    "Do",
                    "Lu",
                    "Ma",
                    "Mi",
                    "Ju",
                    "Vi",
                    "Sa"
                ],
                "monthNames": [
                    "Enero",
                    "Febrero",
                    "Marzo",
                    "Abril",
                    "Mayo",
                    "Junio",
                    "Julio",
                    "Agosto",
                    "Septiembre",
                    "Octubre",
                    "Noviembre",
                    "Dicimbre"
                ],
                "firstDay": 1
            },
            startDate: new Date(),
            endDate: new Date()
        });
    }, 1000);
    setTimeout(function () {
        if ('1' !== Cookies.get('_vd_banner')) {
            $('.banner-fixed').fadeIn();
        }
    }, 1000);
    $('.banner-fixed .close').on('click', function () {
        $('.banner-fixed').fadeOut();
        Cookies.set('_vd_banner', 1, {expires: 1});
    });
});

$(document).on('click', '.filter-remove[data-year]', function () {
    $(this).remove();
    $('.card[data-year=' + $(this).data('year') + ']').fadeOut();
    $('.card[data-year="' + $(this).data('year') + '"]').attr('data-stado-year', 'off');
    $('.filter [data-year="' + $(this).data('year') + '"]').attr('data-stado-year', 'on');

    $('.filter [data-year=' + $(this).data('year') + ']').children('i').toggleClass('fa-check');
    $('.filter [data-year=' + $(this).data('year') + ']').children('i').toggleClass('fa-ban');

    showHide();
});

$(document).on('click', '.filter-remove[data-type]', function () {
    $(this).remove();
    $('.card[data-type=' + $(this).data('type') + ']').fadeOut();
    $('.card[data-type="' + $(this).data('type') + '"]').attr('data-stado', 'off');
    $('.filter [data-type="' + $(this).data('type') + '"]').attr('data-stado', 'on');

    $('.filter [data-type=' + $(this).data('type') + ']').children('i').toggleClass('fa-check');
    $('.filter [data-type=' + $(this).data('type') + ']').children('i').toggleClass('fa-ban');

    showHide();
});

$(document).on('click', '[data-target="#modal-compartir"]', function () {
    let href = $(this).attr('href');
    $.ajax({
        url: href
    }).done(function (response) {
        $('#modal-compartir .modal-content').html(response);
    });
});

$(document).on('click', '[data-target="#modal-incidencia"]', function (e) {
    e.preventDefault();
    // let href = $(this).attr('href');
    let href = '/modal-incidencia';
    $.ajax({
        url: href
    }).done(function (response) {
        $('#modal-incidencia .modal-content').html(response);
    });
});

$(document).on('click', '#f-filtro', function (e) {
    e.preventDefault();

    $.ajax({
        url: '/cuenta/ajax-solicitudes.php',
        type: "POST",
        data: $(this).serialize(),
    }).done(function (response) {
        $('.response.card-body').html(response);
    });
});

$(document).on('submit', '#modal-compartir form', function (e) {
    e.preventDefault();
    let url = $(this).attr('action');
    $.ajax({
        type: "POST",
        url: url,
        data: $(this).serialize(),
    }).done(function (response) {
        $('#modal-compartir #body-modal').html(response);
    });
});

$(document).on('submit', '#modal-incidencia form', function (e) {
    e.preventDefault();
    let url = $(this).attr('action');
    $.ajax({
        type: "POST",
        url: url,
        data: $(this).serialize(),
    }).done(function (response) {
        $('#modal-incidencia #body-modal').html(response);
    });
});

function showHide() {
    $('.card[data-year][data-stado="off"]').fadeOut();
    $('.card[data-year][data-stado-year="off"]').fadeOut();
    $('.card[data-year][data-stado="on"][data-stado-year="on"]').fadeIn();

    if ($('filter-remove').length === 0) {
        if ($('.card[data-year][data-stado="on"]').length === 0) {
            $('.card[data-year][data-stado="off"]').each(function () {
                $(this).attr('data-stado', 'on');
                showHide();
            });
        }
        if ($('.card[data-year][data-stado-year="on"]').length === 0) {
            $('.card[data-year][data-stado-year="off"]').each(function () {
                $(this).attr('data-stado-year', 'on');
                showHide();
            });
        }
    }
}

function search() {
    let input = document.getElementById('search');
    let filter = input.value.toUpperCase();
    let elements = $('.vertical-timeline-item.vertical-timeline-element.card');
    elements.each(function () {
        let txtValue = $(this).text();
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            $(this).fadeIn();
        } else {
            $(this).fadeOut();
        }
    });
}