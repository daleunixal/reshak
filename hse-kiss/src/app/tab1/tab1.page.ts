import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../service/data-storage.service';
import { QuestionViewModel } from '../models/question.view-model';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { pairwise, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit{

  public currentQuestion: QuestionViewModel
  public form: FormArray;
  private _currentIndex = 0;
  public isFormSubmited: boolean = false
  public isLoading: boolean = false;
  public scoreString: string
  private _store: QuestionViewModel[]
  private _rightScore: number = 0;
  private _totalScore: number = 0;

  constructor(
    private _d: DataStorageService,
    private _fb: FormBuilder
  ) {}

  public ngOnInit() {
    this._store = this._d.getRawGoogle().sort(() => Math.random() - 0.5)
    this.currentQuestion = this._store[0];
    this.initializeForm()
  }

  public registerAnswer(){
    this.isFormSubmited = true;
    if(this.form.valid){
      this._rightScore++
    }
    this._totalScore++
    this.scoreString = `Правильно отвечено ${((this._rightScore/this._totalScore)*100).toFixed(1)}%.
     Решено заданий ${this._rightScore} из ${this._store.length}`
  }

  public shouldBe(val: boolean): ValidatorFn{
    return (control: AbstractControl): { [key: string]: any } | null => {
       return control.value === val? null: {wrongAnswer: control.value}
    }
  }

  public changeCheckboxStatus(index: number): void{
    const control: AbstractControl = this.form.get([index]);
    control.setValue(!control.value)
  }

  public toLocale(val: Event){
    const ev: CustomEvent<{value: number}> = val as CustomEvent<{value: number}>
    if(!this.currentQuestion.isPolyChoosable){
      this.form.controls.forEach(x => x.setValue(false, {emitEvent: false}))
      this.currentQuestion.answers.forEach(x => x.isChoosed = false)
    }
    this.currentQuestion.answers[ev.detail.value].isChoosed = true;
    this.form.get([ev.detail.value]).setValue(true)
  }

  public initializeForm(){
    this.form = this._fb.array([])
    this.currentQuestion.answers.forEach((q, i) => {
      this.form.setControl(i, this._fb.control(false, this.shouldBe(q.isRight)))
    })
  }


  public onNext(){
    this.form = null;
    this.isFormSubmited = false;
    this.currentQuestion = this._store[this._currentIndex + 1];
    this._currentIndex++;
    this.initializeForm();
  }
}
