import { every } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

export class QuestionViewModel {
  public form: FormGroup

  public title: string;
  public answers: { text: string; isRight: boolean, isChoosed?: boolean }[];
  public isPolyChoosable: boolean;

  constructor(answers: { text: string; isRight: boolean, isChoosed?: boolean  }[], title: string, isPoly: boolean){
    this.answers = answers.sort(() => Math.random() - 0.5)
    this.title = title
    this.isPolyChoosable = isPoly
  }


  public isRightAnswers(indexes: number[]){
    if(!this.isPolyChoosable){
      return this.answers[indexes[0]].isRight;
    }
    const isAllIndexesRight = indexes.every((val) => this.answers[val].isRight)
    const isHaveOutOfIndexes = Array(this.answers.length)
      .fill(0)
      .map((x,i) => i)
      .filter((val) => !indexes.includes(val))
      .every((val) => !this.answers[val].isRight)

    return isAllIndexesRight && isHaveOutOfIndexes;
  }
}
