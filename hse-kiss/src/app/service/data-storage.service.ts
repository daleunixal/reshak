import { Injectable } from '@angular/core';
import { QuestionViewModel } from '../models/question.view-model';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private static globData: {question: string, answer: string, others: string}[] = [
    {
      "question": "Если в КИС перерабатывают функционал с учетом требований российского законодательства и системы расчетов и переводят на русский язык пользовательский интерфейс, систему помощи и документацию, то говорят, что выполняют?",
      "answer": "Локализацию КИС",
      "others": "Доработки системы по требованию заказчика! Обычный набор операций перед внедрением системы у заказчика"
    },
    {
      "question": "Что дорабатывают в КИС при лингвистической локализации?",
      "answer": "пользовательский интерфейс, систему помощи и документацию (перевод на русский язык)",
      "others": "используемую в системе терминологию! ничего не дорабатывают, так как в системе уже все есть"
    },
    {
      "question": "Что дорабатывают в КИС при функциональной локализации?",
      "answer": "учет российского законодательства и системы расчетов",
      "others": "Принятый в стране порядок ввода и обработки! Специфическое для данной страны цветовое решение интерфейса"
    },
    {
      "question": "Что разграничивают в КИС с помощью пароля?",
      "answer": "доступ к данным и реализуемым функциям управления",
      "others": "Вид меню и пользовательский интерфейс! Для всех пользователей предоставляются одинаковые возможности"
    },
    {
      "question": "Зачем нужны в КИС функции авторизации ввода и корректировки данных?",
      "answer": "При работе большого количества пользователей для отслеживания работы сотрудников",
      "others": "Чтобы занять место на диске! Чтобы система работала не слишком быстро"
    },
    {
      "question": "Зачем в КИС регистрируют время ввода и корректировки данных?",
      "answer": "При работе большого количества пользователей для отслеживания работы сотрудников",
      "others": "Для дальнейшего анализа данных! Таких функций нет в КИС"
    },
    {
      "question": "Что поступает на вход информационной системы, когда кассир магазина сканирует товар?",
      "answer": "Данные",
      "others": "Информация о товарах! На этом этапе ничего не вводится в системы"
    },
    {
      "question": "Что получают пользователи на выходе из Информационной системы после обработки данных?",
      "answer": "Информацию",
      "others": "Обработанные данные! Красивые графики и диаграммы"
    },
    {
      "question": "Что понимают под анализом исходных данных с целью преобразования их в форму, которая является более содержательной для людей?",
      "answer": "Обработка данных",
      "others": "Сортировка данных! Вывод на печать данных в определенном формате"
    },
    {
      "question": "Возможен ли автоматизированный ввод в информационную систему данных с бумажных носителей, заполненных вручную?",
      "answer": "Да, с помощью сканера",
      "others": "Нет, такое невозможно! Такое описано в романах"
    },
    {
      "question": "Возможно ли в КИС формирование и ведение учета одновременно по российским и международным стандартам?",
      "answer": "Да, возможно",
      "others": "Такой функционал никогда не требуется! Нет, невозможно"
    },
    {
      "question": "Возможно ли в КИС изменение организационного и функционального наполнения рабочего места пользователя без привлечения разработчика КИС?",
      "answer": "Да, возможно",
      "others": "В системе и так все хорошо сделано! Нет, это может сделать только разработчик"
    },
    {
      "question": "Как чаще всего консолидируют информацию для выполнения анализа финансово-экономических показателей?",
      "answer": "на уровне временных периодов",
      "others": "На уровне плана счетов! На уровне всей организации"
    },
    {
      "question": "Возможно ли получение достоверной информации в информационной системе при вводе в нее ошибочных данных?",
      "answer": "Нет, нельзя",
      "others": "Да, возможно! В такие системы невозможно никогда ввести недостоверные данные"
    },
    {
      "question": "Может ли КИС работать в организации одновременно с другими, ранее внедренными информационными системами?",
      "answer": "Да.",
      "others": "А зачем нужно ставить одновременно несколько систем! Нет"
    },
    {
      "question": "С какими подсистемами интегрируется подсистема БААН-сервис?",
      "answer": "БААН-Сбыт, снабжение и склады!\nБААН-Производство!\nБААН-Финансы",
      "others": "БААН-Проект! БААН-Транспорт"
    },]

  constructor(
  ) {
  }

  public getRawGoogle(): QuestionViewModel[]{
    return DataStorageService.globData.map((x): QuestionViewModel => {
      const rightAnswers: { text: string; isRight: boolean }[] = x.answer.replace('\n', '').split('!')
        .map((q :string): { text: string; isRight: boolean } => {
          return {
            text: q,
            isRight: true
          }
        })
      const polymorph: boolean = rightAnswers.length > 1;
      rightAnswers.push(...x.others.split('!').map((q: string): { text: string; isRight: boolean } => {
          return {
            text: q,
            isRight: false
          }
        }))

      return new QuestionViewModel(rightAnswers, x.question, polymorph);
    })
  }
}
