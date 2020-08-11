<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Office Manager 3</title>

        <link href="https://unpkg.com/primevue/resources/themes/nova/theme.css " rel="stylesheet">
        <link href="https://unpkg.com/primevue/resources/primevue.min.css " rel="stylesheet">
        <link href="https://unpkg.com/primeicons/primeicons.css " rel="stylesheet">
        
        <link rel="stylesheet" href="https://i.icomoon.io/public/temp/eeec4d6a18/UntitledProject/style.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    </head>
    <body style="font-size: 12px">

        <div id="app">
            <home-page></home-page>
        </div>

    <script src="https://unpkg.com/vue"></script>
    <script src="https://unpkg.com/primevue/components/calendar/calendar.umd.min.js"></script>
    <script src="https://kit.fontawesome.com/af7abe20c5.js" crossorigin="anonymous"></script>
    <script src="{{ asset( 'js/app.js' ) }}" ></script>
    </body>
</html>
