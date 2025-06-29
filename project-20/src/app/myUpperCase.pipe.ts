import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'upper',
    standalone:true
})
export class MyUppercasePipe implements PipeTransform{
    transform(value:string | number, extra: 'upper'| 'lower' = 'lower', ...args:any[]){
        if(extra == 'upper'){
            return  extra + '-' + value.toString().toUpperCase();
        }
        return  extra + '-' + value.toString().toLowerCase();
    }
}