import {AbstractControl, ValidatorFn} from '@angular/forms'

export function diceRollValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const diceRolls = control.value?.split(/[()]+/).filter((e: string) => e);
    for (const diceRoll of diceRolls) {
      if(!diceRoll.match(/[\+\-]\d+|(\d+)?d(\d+)([\+\-]\d+)?/)) {
        return {wrongFormat: true};
      }
    }
    return null;
  }
}
