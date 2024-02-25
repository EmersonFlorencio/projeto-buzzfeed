import { Component, OnInit } from '@angular/core';
import quizz_question from '../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit {
  title: string = ""
  question: any
  questionSelected: any

  answers: string[] = []
  answerSelected: string = ""

  questionIndex: number = 0
  questionMaxIndex: number = 0

  finished: boolean = false

  constructor() { }

  ngOnInit(): void {
    if (quizz_question) {
      this.finished = false
      this.title = quizz_question.title

      this.question = quizz_question.questions
      this.questionSelected = this.question[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.question.length
    }
  }

  playerChoose(value: string) {
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep() {
    this.questionIndex += 1

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.question[this.questionIndex]
    } else {
      const finalAnswer: string = await this.checkResults(this.answers)
      this.finished = true
      this.answerSelected = quizz_question.results[finalAnswer as keyof typeof quizz_question.results]
    }
  }

  async checkResults(answers: string[]) {
    const result = answers.reduce((prev, curr, index, arr) => {
      if (
        arr.filter(item => item === prev).length >
        arr.filter(item => item === curr).length
      ) {
        return prev
      } else {
        return curr
      }
    })
    return result
  }
}
