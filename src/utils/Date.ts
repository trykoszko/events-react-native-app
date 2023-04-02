import dayjs from 'dayjs'
import 'dayjs/locale/pl'

export const timestampToDate = (timestamp: Date) => {
    dayjs.locale('pl')
    return dayjs(timestamp).format('DD MMMM YYYY, HH:mm')
}

export const timestampToDay = (timestamp: Date) => {
    dayjs.locale('pl')
    return dayjs(timestamp).format('DD MMMM YYYY')
}

export const timestampToTime = (timestamp: Date) => {
    dayjs.locale('pl')
    return dayjs(timestamp).format('HH:mm')
}

export const timeToDuration = (totalMinutes: number) => {
    const days = Math.floor(totalMinutes / (60 * 24))
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    let val = ''

    if (days > 0) {
        val += `${days} dni `
    }
    if (hours > 0) {
        val += `${hours} godzin(y) `
    }
    if (minutes > 0) {
        val += `${minutes} minut(y)`
    }

    return val
}
