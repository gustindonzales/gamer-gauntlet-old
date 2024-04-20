import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'ordinal', standalone: true })
export class OrdinalPipe implements PipeTransform {
  transform(value: number) {
    const ones = +value % 10,
      tens = (+value % 100) - ones;
    return value + ['th', 'st', 'nd', 'rd'][tens === 10 || ones > 3 ? 0 : ones];
  }
}
