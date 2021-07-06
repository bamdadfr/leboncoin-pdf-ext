/**
 * @function
 * @name UtilsGetDate
 * @description utils: get date function for consistent behavior
 * @returns {{date: string, time: string}} - current date & time
 */
export function UtilsGetDate () {

    const test = new Date ()
    const diff = -test.getTimezoneOffset () * 60 * 1000 // example UTC+2: returns -(-120)
    const now = new Date (Date.now () + diff)
    const iso = now.toISOString ()
    const date = iso.slice (0, 10)
    const time = iso.slice (11, 19)

    return {
        date,
        time,
    }

}