# `@masaeedu/adt`

## Summary

A simple library for defining ADTs.

## Usage

```js
import { adt } from "@masaeedu/adt"

const Either = adt({ Left: ["a"], Right: ["b"] }) // This library only uses the type list for arity, type checking can be built on top
const { Left, Right } = Either

const map = f => Either.match({ Left, Right: x => Right(f(x)) })

const double = x => x * 2
map(double)(Left("Whoops!")) // => Left("Whoops!")
map(double)(Right(21)) // => Right(42)
```

## Properties

`X.match(X)(x) == x` for any ADT `X` and any value of that ADT `x`.

`adt(D).def == D` for any definition `D`.
