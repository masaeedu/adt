# `@masaeedu/adt`

## Summary

A simple library for defining ADTs.

## Usage

```js
import { adt } from "@masaeedu/adt"

const Either = adt({ Left: ["a"], Right: ["b"] })
const { Left, Right } = Either

const map = f => Either.match({ Left, Right: x => Right(f(x)) })

const double = x => x * 2
map(double)(Left("Whoops!")) // => Left("Whoops!")
map(double)(Right(21)) // => Right(42)
```

The type list is only used to inform arity of the constructor. Additional features like type checking or generic serialization can transparently be built on top by abstracting over the input definition (exposed as `adt(D).def == D`).

## Properties

`X.match(X)(x) == x` for any ADT `X` and any value of that ADT `x`.

`adt(D).def == D` for any definition `D`.
