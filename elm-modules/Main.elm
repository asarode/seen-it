module Main exposing (..)

import Html exposing (Html, Attribute, button, div, text)
import Html.App
import Html.Attributes exposing (style)
import Keyboard exposing (KeyCode)

type Msg
  = KeyDown KeyCode

type alias Model = String

init : (Model, Cmd Msg)
init =
  (initModel, Cmd.none)

initModel : Model
initModel =
  "left : right"

viewStyle : Attribute Msg
viewStyle =
  style
    [ ("width", "200px")
    ]

view : a -> Html Msg
view model =
  div [ viewStyle ]
    [ text (toString model)
    ]

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    KeyDown keyCode ->
      let
        newModel =
          case keyCode of
            37 -> "LEFT : right"
            39 -> "left : RIGHT"
            _ -> initModel
      in
        (newModel, Cmd.none)

subscriptions : Model -> Sub Msg
subscriptions model =
  Keyboard.downs KeyDown

main : Program Never
main =
  Html.App.program
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }
