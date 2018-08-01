<!DOCTYPE html>
<html>
    <head>
        <title>Baixar Listas do Youtube</title>
        <script type="text/javascript" src="jquery.min.js"></script>
        <script type="text/javascript" src="js.js"></script>
        <link rel="stylesheet" type="text/css" href="css.css">
        <meta charset="utf-8">
    </head>
    <body>
        <table id='links' border="1">
            <thead>
                <tr>
                    <th>
                        Nº
                    </th>
                    <th>
                        Link
                    </th>
                    <th>
                        Estado
                    </th>
                    <th>
                        Falhas
                    </th>
                    <th>
                            Tempo
                    </th>
                    <th>
                        Ver Log
                    </th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>

        <div id="logPopup">
            <div class="panel-head">
                Logs do Download
                <span onclick='$("#logPopup").hide(500);' class='close-button'>X</span>
            </div>

            <textarea rows="10" cols="60" readonly="readonly"></textarea>
        </div>

    </body>
</html>
