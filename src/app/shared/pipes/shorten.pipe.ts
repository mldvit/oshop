import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'shorten'})
export class ShortenPipe implements PipeTransform {
  transform(value: string, length = 5): string {
    if (value.length <=5 ) return value;
    return value.substring(0, length) + ' ...';
  }
}
