import covid19Img from '@/assets/images/covid19.jpg'
import tempWeekImg from '@/assets/images/temperature-week.jpg'
import ukraine80Img from '@/assets/images/80perc-ukraine.jpg'
import olympicsBeachVolleyballImg from '@/assets/images/olympics-beach-volleyball.jpg'
import trumpSingleImg from '@/assets/images/trump-single.jpg'
import tenisPlayerImg from '@/assets/images/tenis-player.jpg'
import covidMedicineImg from '@/assets/images/covid-medicine.jpg'

// Тестові дані
export const menuCategories = [
    { id: 'news', labelKey: 'menu.news' },
    { id: 'sport', labelKey: 'menu.sport' },
    { id: 'finance', labelKey: 'menu.finance' },
    { id: 'showbiz', labelKey: 'menu.showbiz' },
    { id: 'lifestyle', labelKey: 'menu.lifestyle' },
    { id: 'it', labelKey: 'menu.it' },
    { id: 'auto', labelKey: 'menu.auto' }
]

export const topTags = [
    { id: 'covid19', label: 'COVID-19', alert: true },
    { id: 'elections2020', label: 'Виборы 2020', alert: true },
    { id: 'antimonopoly', label: 'Антимонопольный закон', alert: true },
    { id: 'euro2020', label: 'Евро 2020', alert: true },
    { id: 'antimonopoly2', label: 'Антимонопольный закон', alert: true }
]

export const mainHeroNews = {
    id: 1,
    title: 'Коронавірус у Києві: за добу діагноз підтвердили у 559 осіб, 23 пацієнти померли',
    description: 'За минулу добу коронавірус діагностували у 559 киян, 23 людини померли. Джерело: мер Києва Віталій Кличко під час онлайн пресконференції.',
    image: covid19Img
}

export const sideTopStories = [
    {
        id: 1,
        title: 'Під кінець робочого тижня температура поповзе вгору',
        image: tempWeekImg
    },
    {
        id: 2,
        title: 'Україна зібрала вже 80% врожаю зернових культур',
        image: ukraine80Img
    }
]

export const newsFeedList = [
    { time: '08:30', title: 'Україна зібрала вже 80% врожаю зернових культур', image: ukraine80Img },
    { time: '08:45', title: 'Росія заборонила співробітникам ФСБ мати дозвіл на проживання за кордоном', image: trumpSingleImg },
    { time: '09:30', title: 'Вибори-2020: ЦВК не попереджає, що підрахунок голосів буде тривалим', image: covidMedicineImg },
    { time: '10:20', title: 'У Білорусі почали відраховувати студентів за протести: з університету - 5 осіб', image: olympicsBeachVolleyballImg },
    { time: '10:20', title: 'Україна зібрала вже 80% врожаю зернових культур', image: tenisPlayerImg },
    { time: '10:20', title: 'Вибори-2020: ЦВК не попереджає, що підрахунок всіх голосів буде тривалим', image: tempWeekImg }
]
