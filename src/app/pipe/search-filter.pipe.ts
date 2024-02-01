import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
  standalone: true
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any[], args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter(user => JSON.stringify(user).toLowerCase().includes(args.toLowerCase()));
  }

}
