module Main exposing (..)

import Html exposing (Html, Attribute, button, div, text)
import Html.Events exposing (onClick)
import Html.App
import Html.Attributes exposing (style)
import MainModel exposing (Model)
import LocalStorage exposing (setStorage, clearStorage)

type Msg
  = SaveToStorage
  | ClearStorage

init : (Model, Cmd Msg)
init =
  (initModel, Cmd.none)

initModel : Model
initModel = { dummy = "initial model" }

viewStyle : Attribute Msg
viewStyle =
  style
    [ ("width", "200px")
    ]

view : a -> Html Msg
view model =
  div [ viewStyle ]
    [ button [ onClick SaveToStorage ] [ text "Save to storage" ]
    , button [ onClick ClearStorage ] [ text "Clear storage" ]
    ]

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    SaveToStorage -> (model, setStorage model)
    ClearStorage -> (model, clearStorage ())

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none

main : Program Never
main =
  Html.App.program
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }
