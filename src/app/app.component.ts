import {Component} from '@angular/core';
import {Optional, Stream} from 'hn-stream';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    // const a = null;
    // Optional.of(a);

    const b = null;
    Optional.ofNullable(b);

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

    // Optional.ofNullable(null)
    //   .orElseThrow(() => {
    //     throw new Error();
    //   });

    Stream.of([]);
    const s = new Stream([]);

    const sum = Stream.of<string>(['5', '6', '7', '1', '2'])
      .map(item => Number(item))
      .mapToNumber(item => item + 1)
      .sum();

    const sum1 = Stream.of<number[]>([
      [2, 3],
      [2, 3],
      [2, 3],
    ]).flatMap(array => Stream.of(array))
      .mapToNumber(item => item)
      .sum();

    Stream.of([1, 2, 3, 4])
      .anyMatch(item => item > 2);
    console.log(sum1);

  }
}
