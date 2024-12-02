interface Answer {
    text: string;
    correct: boolean; 
  }
  
  interface Question {
    text: string;
    options: Answer[];
  }

  interface Questionaire {
    id: number;
    title: string;
    questions: Question[];
  }
  
  class QuizController {
    private Questionaires: Questionaire[] = [];
    private currentId: number = 1;
  
    createQuiz(title: string, questions: Question[]): Questionaire{
      const newQuiz: Questionaire= {
        id: this.currentId,
        title,
        questions,
      };
      this.Questionaires.push(newQuiz);
      this.currentId++;
      return newQuiz;
    }
  
    getAllQuizzes(): Questionaire[] {
      return this.Questionaires;
    }
  
    getQuizById(id: number): Questionaire | undefined {
      return this.Questionaires.find(quiz => quiz.id === id);
    }
  
    updateQuiz(id: number, title: string, questions: Question[]): Questionaire | undefined {
      const quiz = this.getQuizById(id);
      if (quiz) {
        quiz.title = title;
        quiz.questions = questions;
        return quiz;
      }
      return undefined;
    }

    deleteQuiz(id: number): boolean {
      const index = this.Questionaires.findIndex(quiz => quiz.id === id);
      if (index !== -1) {
        this.Questionaires.splice(index, 1);
        return true;
      }
      return false;
    }
  }
  
  
