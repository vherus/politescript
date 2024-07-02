# Scratch pad for the language design

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