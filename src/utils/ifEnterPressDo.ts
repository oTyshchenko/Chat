export const ifEnterPressDo = (event: React.KeyboardEvent, func: () => void) => {
  if (event.keyCode === 13) {
    func()
  }
}