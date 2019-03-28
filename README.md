# hn-stream

> coding typescript like java jdk8 (Optional | Stream | ...)

===============================

## Install
```bash
npm install hn-stream --save
```

## Optional

### get Optional

```typescript
    import {Optional} from 'hn-stream';
    
    const a = null;
    Optional.of(a); // throw error (ERROR Error: assert:optional:value can not be null)
    
    const b = null;
    Optional.ofNullable(b); // it works
```

### operate Optional
 ```typescript
    interface ClassA {
      chnName?: string;
    }

    interface ClassB {
      engName?: string;
    }

    Optional.ofNullable<ClassA>({chnName: 'Tom'})
      .map<ClassB>(item => {
        console.log(item.chnName);
        return {engName: item.chnName};
      })
      .map<string>(item => item.engName)
      .filter(item => item.length > 2)
      .ifPresent(item => console.log(item));

    Optional.ofNullable(null)
      .orElse({});

    Optional.ofNullable(null)
      .orElseGet(() => {
      });

    Optional.ofNullable(null)
      .orElseThrow((): never => {
        throw new Error();
      })
    ;
 ```  
 
 ## Stream
 
### get stream

```typescript
    import {Optional, Stream} from 'hn-stream';

    Stream.of([]);
    const s = new Stream([]);
```

### operate Stream

```typescript
    Stream.of<string>(['5', '6', '7', '1', '2'])
          .map(item => Number(item))
          .mapToNumber(item => item + 1)
          .sum();

    Stream.of<number[]>([
          [2, 3],
          [2, 3],
          [2, 3],
        ]).flatMap(array => Stream.of(array))
          .mapToNumber(item => item)
          .sum();
    
    Stream.of([1, 2, 3, 4])
          .anyMatch(item => item > 2);
    
    // ... you can try it with npm install
```   

## API Docs

### Optional

#### Methods:
- `static of<T>(value: T): Optional<T>`
- `static empty<R>(): Optional<R>`
- `static ofNullable<T>(value: T): Optional<T>`

- `filter(predicate: (value: T) => boolean): Optional<T> `
- `map<R>(fn: (value: T) => R): Optional<R> `
- `get(): T `
- `orElse(value: T): T `
- `orElseGet(supplier: () => T): T`
- `orElseThrow(supplier: () => void): T | void`
- `isPresent(): boolean`
- `ifPresent(consumer: (value: T) => void): void`

### Stream

#### Methods:
- `static of<T>(value: T[]): Stream<T>`

- `filter(predicate: (value: T) => boolean): Stream<T>`
- `map<R>(fn: (value: T, index?: number, array?: T[]) => R): Stream<R>`
- `flatMap<R>(fn: (value: T, index?: number, array?: T[]) => Stream<R>): Stream<R>`
- `mapToNumber(fn: (value: T) => number): NumberStream`
- `distinct(fn = (a, b) => a === b): Stream<T>`
- `limit(maxSize: number): Stream<T>`
- `skip(minSize: number): Stream<T>`
- `forEach(fn: (value: T, index?: number, array?: T[]) => void): void`
- `anyMatch(fn: (value: T, index?: number, array?: T[]) => boolean): boolean`
- `allMatch(fn: (value: T, index?: number, array?: T[]) => boolean): boolean`
- `noneMatch(fn: (value: T, index?: number, array?: T[]) => boolean): boolean`
- `toArray(): T[]`
- `reduce(fn: (previousValue: T, currentValue: T, currentIndex?: number, array?: T[]) => T, initValue?: T): Optional<T>`
- `collectToSet(): Set<T>`
- `findFirst(): Optional<T>`
- `findLast(): Optional<T>`
- `findAny(): Optional<T>`
- `min(fn = (a, b) => a > b): Optional<T>`
- `max(fn = (a, b) => a > b): Optional<T>`
- `sorted(fn = (a, b) => a > b): Stream<T>`
- `count(): number`



### NumberStream extends Stream<number>

#### Methods:
- `static from(start: number, end: number): NumberStream`
- `sum(): number`
- `average(): number`
- `summaryStatistics(): NumberSummaryStatistics`

