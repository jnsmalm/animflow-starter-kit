import { game, sprite, key, rotate } from "animflow"

game.init()

game.load(() => {
  let mario = sprite("mario")
  key("a").down(() => {
    rotate(mario).by(360).time(1).ease()
  })
})