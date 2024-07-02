# Scratch pad for the language design

I'm only doing this in typescript because I think it's funny and it's a learning experience. I might do it in Go as well.

```
wouldyoumind summing(int[] numbers) int {
  mayhap length(numbers) == 0 {
    apologies "the array seems to be empty" // throw an exception
  }
  ...
}

please {
  permit result = summing([1, 2, 3]) // mutable
  insist result = summing([]) // immutable
} pardon me (e Error) {
  farewell(1)
}
```