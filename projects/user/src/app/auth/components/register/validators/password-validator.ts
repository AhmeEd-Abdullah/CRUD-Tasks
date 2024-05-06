import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validatePassword(
  control1: string,
  control2: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(control1);
    const confirmPassword = control.get(control2);
    if (
      password?.dirty &&
      confirmPassword?.dirty &&
      password.value !== confirmPassword.value
    ) {
      confirmPassword.setErrors({ wrongPassword: true });
      return { wrongPassword: true };
    }
    return null;
  };
}
