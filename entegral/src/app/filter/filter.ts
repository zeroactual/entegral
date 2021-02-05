import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs/operators';
import * as _ from 'lodash/fp';

@Pipe({
  name: 'Filter'
})
export class FilterPipe implements PipeTransform {

// value - array of products
// input - user input in search box
// when there is an input, filter & return all matches
// when there is no input, display all data
// filter() is a javascript method that returns a new array of all values that pass a test defined in the method. You can read more here
  transform(value: any, input: any): any {
    if(input){
      let newinput=!isNaN(input)? input.toString(): input.toString().toUpperCase();
      return value.filter(item=>{
        return this.lookForNestedObject(item,newinput);
      })
    }
    else{return value;}
  }

  lookForNestedObject(item,newSearchTerm){
    let origItem={...item};
    let that=this;
    let count=0;
    parseNestedObject(item);
    function parseNestedObject(item){
      for(let key in item){
        if(_.isPlainObject(item[key])){
          if(origItem[key]) { delete origItem[key]}
          parseNestedObject(item[key]);
        }
        else if(Array.isArray(item[key])){
          if(origItem[key]) { delete origItem[key]}
          parseNestedObject(item[key]);
        }
        else{
          count++;
          if(origItem[key]) { delete origItem[key]}
          origItem[key+count]=item[key];
        }}
    }
    return that.search(item,origItem,newSearchTerm);
  }
  search(item,origItem,newSearchTerm){
    let filteredList=[];
    let prop = "";
    for(let koy in origItem){prop=isNaN(origItem[koy]) ? origItem[koy].toString().toUpperCase() : origItem[koy].toString();if(prop.indexOf(newSearchTerm) > -1){
      filteredList.push(item);
      return filteredList;
    }}
  }
}
