const { game, sprite, key, rotate } = VILLE

game.init()

game.load(() => {
  let mario = sprite("mario")
  key("a").down(() => {
    rotate(mario).by(360).time(1).ease()
  })
})