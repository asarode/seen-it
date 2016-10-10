port module LocalStorage exposing (..)

import MainModel exposing (Model)


port setStorage : Model -> Cmd msg

port clearStorage : () -> Cmd msg
