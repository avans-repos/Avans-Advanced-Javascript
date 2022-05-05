import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'basicFor',
})
export class BasicForPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  transform(value: number): number[] {
    const res = [];
    for (let i = 0; i < value; i += 1) {
      res.push(value);
    }
    return res;
  }
}
