import { AfterViewInit, Component, ElementRef, OnDestroy, Renderer } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { EMAIL_NOT_FOUND_TYPE } from 'app/shared/constants/error.constants';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PasswordResetInitService } from './password-reset-init.service';

@Component({
  selector: 'jhi-password-reset-init',
  templateUrl: './password-reset-init.component.html',
  styleUrls: ['reset.scss']
})
export class PasswordResetInitComponent implements AfterViewInit, OnDestroy {
  error: string;
  errorEmailNotExists: string;
  success: string;
  resetRequestForm = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]]
  });
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private passwordResetInitService: PasswordResetInitService,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private fb: FormBuilder
  ) {}

  ngAfterViewInit() {
    this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#email'), 'focus', []);

    this.resetRequestForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.error = undefined;
      this.errorEmailNotExists = undefined;
      this.success = undefined;
    });
  }

  requestReset() {
    this.error = null;
    this.errorEmailNotExists = null;

    this.passwordResetInitService.save(this.resetRequestForm.get(['email']).value).subscribe(
      () => {
        this.success = 'OK';
      },
      response => {
        this.success = null;
        if (response.status === 400 && response.error.type === EMAIL_NOT_FOUND_TYPE) {
          this.errorEmailNotExists = 'ERROR';
        } else {
          this.error = 'ERROR';
        }
      }
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
