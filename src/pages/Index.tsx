import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Scenario {
  id: number;
  title: string;
  description: string;
  icon: string;
  info: string;
  image: string;
  questions: Question[];
}

interface QuestionWithImage extends Question {
  image?: string;
}

interface ScenarioResult {
  scenarioId: number;
  score: number;
  total: number;
  completed: boolean;
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: 'Входной контроль сырья',
    description: 'Научитесь проверять качество поступающего сырья',
    icon: 'PackageCheck',
    image: 'https://cdn.poehali.dev/projects/deb7d4cd-bbe2-4cb2-86cd-078601893f75/files/cae66684-6e54-4aba-8f4d-a26af3662c85.jpg',
    info: 'Входной контроль — первый и важнейший этап обеспечения качества продукции. На этом этапе проверяется соответствие сырья установленным требованиям: органолептические показатели, документация, условия транспортировки и хранения. Правильный входной контроль предотвращает попадание некачественного сырья в производство.',
    questions: [
      {
        id: 1,
        question: 'Какой документ подтверждает качество поступившего сырья?',
        options: ['Накладная', 'Сертификат качества', 'Счет-фактура', 'Договор поставки'],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'Какая температура хранения требуется для охлажденного мяса?',
        options: ['-18°C', '0 до +4°C', '+8 до +12°C', '+15°C'],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'Что проверяется при органолептической оценке?',
        options: ['Цена продукта', 'Внешний вид, запах, текстура', 'Вес упаковки', 'Страна производства'],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'Какой срок годности имеет охлажденное молоко при +4°C?',
        options: ['1 день', '3-5 дней', '10 дней', '30 дней'],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'Что делать с партией сырья при обнаружении дефектов?',
        options: ['Принять со скидкой', 'Отправить на переработку', 'Забраковать и вернуть поставщику', 'Использовать частично'],
        correctAnswer: 2
      },
      {
        id: 6,
        question: 'Какой показатель pH характерен для свежего мяса?',
        options: ['pH 4.0-4.5', 'pH 5.5-6.2', 'pH 7.0-8.0', 'pH 9.0'],
        correctAnswer: 1
      },
      {
        id: 7,
        question: 'Что означает маркировка "Е" на упаковке?',
        options: ['Экологичный продукт', 'Европейский стандарт', 'Пищевая добавка', 'Срок годности'],
        correctAnswer: 2
      },
      {
        id: 8,
        question: 'Какая влажность допустима для сухих продуктов?',
        options: ['До 5%', 'До 14%', 'До 25%', 'До 50%'],
        correctAnswer: 1
      },
      {
        id: 9,
        question: 'Как часто проводится входной контроль?',
        options: ['Раз в неделю', 'Раз в месяц', 'При каждой поставке', 'По желанию'],
        correctAnswer: 2
      },
      {
        id: 10,
        question: 'Что проверяется в первую очередь при приемке?',
        options: ['Цена', 'Целостность упаковки и маркировка', 'Количество', 'Внешний вид поставщика'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 2,
    title: 'ХАССП: Критические точки',
    description: 'Освойте систему анализа рисков и контроля критических точек',
    icon: 'ShieldCheck',
    image: 'https://cdn.poehali.dev/projects/deb7d4cd-bbe2-4cb2-86cd-078601893f75/files/84d2dc56-fcbb-471f-b17b-1bfafb6cc9dd.jpg',
    info: 'ХАССП (HACCP) — международная система управления безопасностью пищевых продуктов. Она основана на выявлении критических контрольных точек (ККТ) в производственном процессе, где существует риск загрязнения продукции. Система включает 7 принципов: анализ опасностей, определение ККТ, установление критических пределов, мониторинг, корректирующие действия, верификацию и документирование.',
    questions: [
      {
        id: 1,
        question: 'Сколько принципов включает система ХАССП?',
        options: ['5 принципов', '7 принципов', '10 принципов', '12 принципов'],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'Что такое ККТ в системе ХАССП?',
        options: ['Контрольно-кассовая техника', 'Критическая контрольная точка', 'Качественный контроль технологии', 'Контроль качества товара'],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'Какая температура является критической при пастеризации молока?',
        options: ['+50°C', '+63°C', '+85°C', '+100°C'],
        correctAnswer: 2
      },
      {
        id: 4,
        question: 'Что является биологической опасностью?',
        options: ['Стекло в продукте', 'Бактерии и вирусы', 'Моющие средства', 'Металлические частицы'],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'Как часто проводится внутренний аудит ХАССП?',
        options: ['Ежедневно', 'Ежемесячно', 'Минимум раз в год', 'Раз в 5 лет'],
        correctAnswer: 2
      },
      {
        id: 6,
        question: 'Какое действие предпринимается при выходе за критические пределы?',
        options: ['Игнорировать', 'Корректирующие действия', 'Остановить производство на месяц', 'Снизить цену'],
        correctAnswer: 1
      },
      {
        id: 7,
        question: 'Что относится к физическим опасностям?',
        options: ['Плесень', 'Стекло, металл, камни', 'Кислота', 'Бактерии'],
        correctAnswer: 1
      },
      {
        id: 8,
        question: 'Какая документация обязательна для ХАССП?',
        options: ['Только приказы', 'План ХАССП и записи мониторинга', 'Личные заметки', 'Рекламные материалы'],
        correctAnswer: 1
      },
      {
        id: 9,
        question: 'Кто отвечает за внедрение ХАССП на предприятии?',
        options: ['Любой сотрудник', 'Рабочая группа ХАССП', 'Только директор', 'Поставщики'],
        correctAnswer: 1
      },
      {
        id: 10,
        question: 'Что такое верификация в ХАССП?',
        options: ['Проверка эффективности системы', 'Закупка сырья', 'Продажа продукции', 'Реклама'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 3,
    title: 'Микробиологический контроль',
    description: 'Изучите методы контроля микробиологической безопасности',
    icon: 'Microscope',
    image: 'https://cdn.poehali.dev/projects/deb7d4cd-bbe2-4cb2-86cd-078601893f75/files/0815ebab-80fc-45fa-b63d-c2d0bf2490f9.jpg',
    info: 'Микробиологический контроль — важнейший аспект обеспечения безопасности пищевых продуктов. Он включает выявление патогенных микроорганизмов (сальмонелла, листерия, кишечная палочка), контроль микробной обсемененности, санитарно-гигиенический контроль производства. Анализы проводятся на разных этапах: сырье, полуфабрикаты, готовая продукция, смывы с оборудования.',
    questions: [
      {
        id: 1,
        question: 'Какая бактерия является индикатором фекального загрязнения?',
        options: ['Стафилококк', 'Кишечная палочка (E.coli)', 'Плесень', 'Дрожжи'],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'При какой температуре погибает большинство бактерий?',
        options: ['+40°C', '+60°C', '+75°C и выше', '+100°C'],
        correctAnswer: 2
      },
      {
        id: 3,
        question: 'Что такое КМАФАнМ?',
        options: ['Название бактерии', 'Количество мезофильных аэробных микроорганизмов', 'Химический элемент', 'Тип упаковки'],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'Какой срок хранения смывов для анализа?',
        options: ['Не более 2 часов при +2-8°C', '24 часа при комнатной температуре', '7 дней', 'Неограниченно'],
        correctAnswer: 0
      },
      {
        id: 5,
        question: 'Сальмонелла наиболее опасна в каких продуктах?',
        options: ['Хлеб', 'Яйца и мясо птицы', 'Овощи', 'Крупы'],
        correctAnswer: 1
      },
      {
        id: 6,
        question: 'Что означает стерильность продукта?',
        options: ['Низкая цена', 'Полное отсутствие микроорганизмов', 'Красивая упаковка', 'Долгий срок годности'],
        correctAnswer: 1
      },
      {
        id: 7,
        question: 'Какой метод стерилизации используется для консервов?',
        options: ['Замораживание', 'Автоклавирование', 'Сушка', 'Охлаждение'],
        correctAnswer: 1
      },
      {
        id: 8,
        question: 'Как часто проводятся смывы с оборудования?',
        options: ['Раз в год', 'Ежедневно или по графику', 'Никогда', 'По желанию'],
        correctAnswer: 1
      },
      {
        id: 9,
        question: 'Что такое листериоз?',
        options: ['Метод очистки', 'Заболевание, вызванное бактерией Listeria', 'Тип упаковки', 'Химический процесс'],
        correctAnswer: 1
      },
      {
        id: 10,
        question: 'Какая среда способствует росту бактерий?',
        options: ['Сухая и холодная', 'Влажная и теплая', 'Кислая и холодная', 'Только воздух'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 4,
    title: 'Санитарная обработка',
    description: 'Правила санитарной обработки оборудования и помещений',
    icon: 'Sparkles',
    image: 'https://cdn.poehali.dev/projects/deb7d4cd-bbe2-4cb2-86cd-078601893f75/files/4446702a-f128-4e34-a591-9a38572e6c66.jpg',
    info: 'Санитарная обработка — комплекс мероприятий по поддержанию чистоты на производстве. Включает мойку и дезинфекцию оборудования, помещений, инвентаря. Правильная санитария предотвращает перекрестное загрязнение, рост микроорганизмов и обеспечивает безопасность продукции. Используются различные моющие и дезинфицирующие средства, соблюдаются температурные режимы и время экспозиции.',
    questions: [
      {
        id: 1,
        question: 'Какая последовательность санитарной обработки правильная?',
        options: ['Дезинфекция - мойка - ополаскивание', 'Мойка - ополаскивание - дезинфекция - ополаскивание', 'Только мойка', 'Только дезинфекция'],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'Какое средство используется для дезинфекции?',
        options: ['Вода', 'Хлорсодержащие препараты', 'Масло', 'Мыло'],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'Как часто моется оборудование в контакте с продуктами?',
        options: ['Раз в неделю', 'После каждой смены или по графику', 'Раз в месяц', 'Никогда'],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'Что такое время экспозиции дезинфектанта?',
        options: ['Время хранения средства', 'Время воздействия на поверхность', 'Срок годности', 'Температура средства'],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'Какая температура воды оптимальна для мойки?',
        options: ['+10°C', '+40-50°C', '+90°C', '0°C'],
        correctAnswer: 1
      },
      {
        id: 6,
        question: 'Что такое CIP-мойка?',
        options: ['Ручная мойка', 'Автоматическая безразборная мойка', 'Сухая очистка', 'Мойка водой'],
        correctAnswer: 1
      },
      {
        id: 7,
        question: 'Какие зоны различают по степени чистоты?',
        options: ['Только грязная', 'Грязная, чистая, стерильная', 'Только стерильная', 'Зон нет'],
        correctAnswer: 1
      },
      {
        id: 8,
        question: 'Можно ли использовать одну ветошь для разных зон?',
        options: ['Да, всегда', 'Нет, для каждой зоны своя', 'Иногда', 'Не имеет значения'],
        correctAnswer: 1
      },
      {
        id: 9,
        question: 'Что проверяется при контроле качества мойки?',
        options: ['Цвет оборудования', 'Отсутствие загрязнений и микроорганизмов', 'Вес оборудования', 'Стоимость'],
        correctAnswer: 1
      },
      {
        id: 10,
        question: 'Как хранятся моющие средства?',
        options: ['Рядом с продуктами', 'В отдельном помещении с маркировкой', 'Где угодно', 'На улице'],
        correctAnswer: 1
      }
    ]
  }
];

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'scenarios' | 'quiz' | 'certificate'>('home');
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [showInfo, setShowInfo] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState<ScenarioResult[]>([]);
  const [userName, setUserName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [timeLeft, setTimeLeft] = useState(7);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('completedScenarios');
    if (saved) {
      setCompletedScenarios(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (timerActive && timeLeft > 0 && selectedAnswer === null) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && selectedAnswer === null) {
      handleNextQuestion();
      setTimeLeft(7);
    }
  }, [timerActive, timeLeft, selectedAnswer]);

  const saveProgress = (scenarioId: number, score: number, total: number) => {
    const newResult: ScenarioResult = {
      scenarioId,
      score,
      total,
      completed: true
    };
    
    const updated = completedScenarios.filter(r => r.scenarioId !== scenarioId);
    updated.push(newResult);
    setCompletedScenarios(updated);
    localStorage.setItem('completedScenarios', JSON.stringify(updated));
  };

  const allScenariosCompleted = () => {
    return scenarios.every(scenario => 
      completedScenarios.some(r => r.scenarioId === scenario.id && r.completed)
    );
  };

  const getTotalScore = () => {
    return completedScenarios.reduce((sum, r) => sum + r.score, 0);
  };

  const getTotalQuestions = () => {
    return completedScenarios.reduce((sum, r) => sum + r.total, 0);
  };

  const handleStartLearning = () => {
    setCurrentView('scenarios');
  };

  const handleSelectScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setCurrentView('quiz');
    setShowInfo(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnsweredQuestions(0);
    setShowResult(false);
  };

  const handleStartQuiz = () => {
    setShowInfo(false);
    setTimerActive(true);
    setTimeLeft(7);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setTimerActive(false);
    
    if (selectedScenario) {
      const isCorrect = selectedScenario.questions[currentQuestionIndex].correctAnswer === answerIndex;
      if (isCorrect) {
        setScore(score + 1);
      }
      setAnsweredQuestions(answeredQuestions + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!selectedScenario) return;

    if (currentQuestionIndex < selectedScenario.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setTimeLeft(7);
      setTimerActive(true);
    } else {
      setShowResult(true);
      setTimerActive(false);
      saveProgress(selectedScenario.id, score, selectedScenario.questions.length);
    }
  };

  const handleBackToScenarios = () => {
    setCurrentView('scenarios');
    setSelectedScenario(null);
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnsweredQuestions(0);
    setShowResult(false);
    setShowInfo(true);
    setTimeLeft(7);
    setTimerActive(false);
  };

  const handleViewCertificate = () => {
    if (allScenariosCompleted()) {
      setShowNameInput(true);
    }
  };

  const handleGenerateCertificate = () => {
    if (userName.trim()) {
      setCurrentView('certificate');
      setShowNameInput(false);
    }
  };

  const progressPercentage = selectedScenario 
    ? (answeredQuestions / selectedScenario.questions.length) * 100 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {currentView === 'home' && (
        <div className="container mx-auto px-4 py-12 animate-fade-in">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 animate-scale-in">
                <Icon name="GraduationCap" size={20} />
                <span className="text-sm font-medium">Образовательная платформа</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                FoodQuality<span className="text-primary">Lab</span> Quest
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Образовательный симулятор по управлению качеством пищевой продукции для студентов и специалистов
              </p>
              
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
                onClick={handleStartLearning}
              >
                <Icon name="BookOpen" className="mr-2" size={24} />
                Начать обучение
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Users" className="text-primary" size={24} />
                  </div>
                  <CardTitle className="mb-3">Для студентов</CardTitle>
                  <CardDescription className="text-sm space-y-2">
                    <p className="font-medium text-gray-700">Почему это полезно:</p>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Практические навыки для трудоустройства</li>
                      <li>• Понимание реальных производственных процессов</li>
                      <li>• Сертификат после прохождения всех сценариев</li>
                      <li>• Подготовка к работе на предприятиях</li>
                    </ul>
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-secondary/50 transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Building2" className="text-secondary" size={24} />
                  </div>
                  <CardTitle className="mb-3">Для предприятий</CardTitle>
                  <CardDescription className="text-sm space-y-2">
                    <p className="font-medium text-gray-700">Почему это полезно:</p>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Обучение сотрудников без отрыва от производства</li>
                      <li>• Снижение рисков нарушений в контроле качества</li>
                      <li>• Аналитика по прогрессу команды</li>
                      <li>• Экономия на очном обучении</li>
                    </ul>
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-accent/50 transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Award" className="text-accent" size={24} />
                  </div>
                  <CardTitle className="mb-3">Для вузов</CardTitle>
                  <CardDescription className="text-sm space-y-2">
                    <p className="font-medium text-gray-700">Почему это полезно:</p>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Современный инструмент для образовательных программ</li>
                      <li>• Повышение практической подготовки студентов</li>
                      <li>• Интеграция с учебными планами</li>
                      <li>• Партнерство с технопарками</li>
                    </ul>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {completedScenarios.length > 0 && (
              <Card className="border-2 border-green-200 bg-green-50/50 mb-8">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Icon name="Trophy" className="text-green-600" size={24} />
                        Ваш прогресс
                      </CardTitle>
                      <CardDescription className="mt-2">
                        Пройдено сценариев: {completedScenarios.length} из {scenarios.length}
                      </CardDescription>
                    </div>
                    {allScenariosCompleted() && (
                      <Button 
                        onClick={handleViewCertificate}
                        className="bg-gradient-to-r from-primary to-secondary"
                      >
                        <Icon name="Award" className="mr-2" size={20} />
                        Получить сертификат
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress 
                    value={(completedScenarios.length / scenarios.length) * 100} 
                    className="h-3"
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {currentView === 'scenarios' && (
        <div className="container mx-auto px-4 py-12 animate-fade-in">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <Button variant="ghost" onClick={() => setCurrentView('home')}>
                <Icon name="ArrowLeft" className="mr-2" size={20} />
                На главную
              </Button>
            </div>

            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-bold text-gray-900">Сценарии обучения</h2>
              {allScenariosCompleted() && (
                <Badge className="bg-green-600 text-white px-4 py-2 text-sm">
                  <Icon name="CheckCircle2" className="mr-2" size={16} />
                  Все сценарии пройдены!
                </Badge>
              )}
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {scenarios.map((scenario, index) => {
                const completed = completedScenarios.find(r => r.scenarioId === scenario.id);
                return (
                  <Card 
                    key={scenario.id} 
                    className={`border-2 transition-all hover:shadow-lg cursor-pointer group ${
                      completed ? 'border-green-200 bg-green-50/30' : 'hover:border-primary/50'
                    }`}
                    onClick={() => handleSelectScenario(scenario)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {scenario.image && (
                      <div className="w-full h-48 overflow-hidden">
                        <img 
                          src={scenario.image} 
                          alt={scenario.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform relative">
                          <Icon name={scenario.icon as any} className="text-white" size={28} />
                          {completed && (
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                              <Icon name="Check" className="text-white" size={14} />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{scenario.title}</CardTitle>
                          <CardDescription className="text-base">
                            {scenario.description}
                          </CardDescription>
                          {completed && (
                            <div className="mt-2 text-sm text-green-700 font-medium">
                              Результат: {completed.score}/{completed.total}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="Timer" size={16} />
                          10 вопросов • 7 сек на ответ
                        </span>
                        <Icon name="ChevronRight" size={20} className="text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {currentView === 'quiz' && selectedScenario && (
        <div className="container mx-auto px-4 py-12 animate-fade-in">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <Button variant="ghost" onClick={handleBackToScenarios}>
                <Icon name="ArrowLeft" className="mr-2" size={20} />
                К сценариям
              </Button>
            </div>

            {showInfo ? (
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name={selectedScenario.icon as any} className="text-white" size={32} />
                    </div>
                    <div>
                      <CardTitle className="text-2xl mb-2">{selectedScenario.title}</CardTitle>
                      <CardDescription className="text-base">
                        {selectedScenario.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {selectedScenario.image && (
                    <div className="w-full h-80 rounded-lg overflow-hidden">
                      <img 
                        src={selectedScenario.image} 
                        alt={selectedScenario.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Icon name="BookOpen" size={20} className="text-primary" />
                      Информация для ознакомления
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedScenario.info}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                    <Icon name="Info" className="text-primary" size={24} />
                    <div className="text-sm text-gray-700">
                      <p className="font-medium">В этом сценарии вас ждет:</p>
                      <p>10 вопросов с таймером 7 секунд на каждый</p>
                    </div>
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full text-lg py-6"
                    onClick={handleStartQuiz}
                  >
                    <Icon name="Play" className="mr-2" size={24} />
                    Начать тестирование
                  </Button>
                </CardContent>
              </Card>
            ) : showResult ? (
              <Card className="border-2 animate-scale-in">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <Icon name="Trophy" className="text-white" size={40} />
                  </div>
                  <CardTitle className="text-3xl mb-2">Тест завершен!</CardTitle>
                  <CardDescription className="text-lg">
                    Ваш результат по сценарию "{selectedScenario.title}"
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-primary mb-2">
                      {score}/{selectedScenario.questions.length}
                    </div>
                    <p className="text-gray-600">правильных ответов</p>
                  </div>

                  <Progress value={(score / selectedScenario.questions.length) * 100} className="h-3" />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">{score}</div>
                      <div className="text-sm text-gray-600">Верно</div>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-red-600 mb-1">
                        {selectedScenario.questions.length - score}
                      </div>
                      <div className="text-sm text-gray-600">Ошибок</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={handleBackToScenarios}
                    >
                      Другие сценарии
                    </Button>
                    <Button 
                      className="flex-1"
                      onClick={handleRetakeQuiz}
                    >
                      <Icon name="RotateCcw" className="mr-2" size={20} />
                      Пройти снова
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="text-base px-4 py-2">
                    Вопрос {currentQuestionIndex + 1} из {selectedScenario.questions.length}
                  </Badge>
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold ${
                      timeLeft <= 3 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      <Icon name="Timer" size={20} />
                      <span className="text-lg">{timeLeft}с</span>
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                      Счет: {score}/{answeredQuestions}
                    </div>
                  </div>
                </div>

                <Progress value={progressPercentage} className="h-2" />

                {selectedScenario.image && (
                  <div className="w-full h-64 rounded-lg overflow-hidden">
                    <img 
                      src={selectedScenario.image} 
                      alt={selectedScenario.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <Card className="border-2 animate-scale-in">
                  <CardHeader>
                    <CardTitle className="text-xl leading-relaxed">
                      {selectedScenario.questions[currentQuestionIndex].question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedScenario.questions[currentQuestionIndex].options.map((option, index) => {
                      const isSelected = selectedAnswer === index;
                      const isCorrect = selectedScenario.questions[currentQuestionIndex].correctAnswer === index;
                      const showCorrect = selectedAnswer !== null && isCorrect;
                      const showWrong = selectedAnswer === index && !isCorrect;

                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          disabled={selectedAnswer !== null}
                          className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                            showCorrect
                              ? 'border-green-500 bg-green-50'
                              : showWrong
                              ? 'border-red-500 bg-red-50'
                              : isSelected
                              ? 'border-primary bg-primary/5'
                              : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{option}</span>
                            {showCorrect && (
                              <Icon name="CheckCircle2" className="text-green-600" size={24} />
                            )}
                            {showWrong && (
                              <Icon name="XCircle" className="text-red-600" size={24} />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </CardContent>
                </Card>

                {selectedAnswer !== null && (
                  <Button 
                    size="lg" 
                    className="w-full text-lg py-6 animate-fade-in"
                    onClick={handleNextQuestion}
                  >
                    {currentQuestionIndex < selectedScenario.questions.length - 1 ? (
                      <>
                        Следующий вопрос
                        <Icon name="ArrowRight" className="ml-2" size={20} />
                      </>
                    ) : (
                      <>
                        Завершить тест
                        <Icon name="Check" className="ml-2" size={20} />
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {currentView === 'certificate' && (
        <div className="container mx-auto px-4 py-12 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Button variant="ghost" onClick={() => setCurrentView('home')}>
                <Icon name="ArrowLeft" className="mr-2" size={20} />
                На главную
              </Button>
            </div>

            <Card className="border-4 border-primary/20 bg-gradient-to-br from-blue-50 to-purple-50 shadow-2xl print-certificate">
              <CardContent className="p-12">
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                      <Icon name="Award" className="text-white" size={48} />
                    </div>
                  </div>

                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Сертификат</h1>
                    <p className="text-lg text-gray-600">об успешном завершении обучения</p>
                  </div>

                  <div className="border-t-2 border-b-2 border-primary/20 py-8 my-8">
                    <p className="text-gray-700 mb-4">Настоящим подтверждается, что</p>
                    <h2 className="text-3xl font-bold text-primary mb-4">{userName}</h2>
                    <p className="text-gray-700 mb-2">успешно завершил(-а) обучение по программе</p>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                      "Управление качеством пищевой продукции"
                    </h3>
                    <p className="text-gray-600">в образовательной системе FoodQualityLab Quest</p>
                  </div>

                  <div className="grid grid-cols-3 gap-6 my-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">
                        {getTotalScore()}
                      </div>
                      <div className="text-sm text-gray-600">Правильных ответов</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-secondary mb-1">
                        {scenarios.length}
                      </div>
                      <div className="text-sm text-gray-600">Сценариев пройдено</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent mb-1">
                        {Math.round((getTotalScore() / getTotalQuestions()) * 100)}%
                      </div>
                      <div className="text-sm text-gray-600">Успеваемость</div>
                    </div>
                  </div>

                  <div className="space-y-4 text-left bg-white/70 p-6 rounded-lg">
                    <p className="font-semibold text-gray-900">Освоенные компетенции:</p>
                    <ul className="space-y-2 text-gray-700">
                      {scenarios.map(scenario => (
                        <li key={scenario.id} className="flex items-center gap-2">
                          <Icon name="CheckCircle2" className="text-green-600 flex-shrink-0" size={18} />
                          <span>{scenario.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-gray-300 flex items-center justify-between text-sm text-gray-600">
                    <div>
                      <p className="font-medium">Дата выдачи:</p>
                      <p>{new Date().toLocaleDateString('ru-RU', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Уникальный номер:</p>
                      <p className="font-mono">FQL-{Date.now().toString(36).toUpperCase()}</p>
                    </div>
                  </div>

                  <Button 
                    size="lg" 
                    className="mt-8"
                    onClick={() => window.print()}
                  >
                    <Icon name="Download" className="mr-2" size={20} />
                    Скачать сертификат
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {showNameInput && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <Card className="w-full max-w-md mx-4 animate-scale-in">
            <CardHeader>
              <CardTitle className="text-2xl">Получить сертификат</CardTitle>
              <CardDescription>
                Поздравляем! Вы прошли все сценарии обучения. Введите ваше имя для сертификата.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Ваше полное имя
                </label>
                <Input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Иванов Иван Иванович"
                  className="h-12 text-base"
                  autoFocus
                />
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowNameInput(false)}
                >
                  Отмена
                </Button>
                <Button 
                  className="flex-1"
                  onClick={handleGenerateCertificate}
                  disabled={!userName.trim()}
                >
                  <Icon name="Award" className="mr-2" size={20} />
                  Получить
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;