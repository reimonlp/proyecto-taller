import moment from 'moment'
import { useMemo, useState } from 'react'

moment.locale('es')
moment.updateLocale('es', {
  calendar : {
      lastDay : '[ayer a las] LT',
      sameDay : '[hoy a las] LT',
      nextDay : '[mañana a las] LT',
      lastWeek : 'dddd [a las] LT',
      nextWeek : 'dddd [a las] LT',
      sameElse : 'L'
  },
  relativeTime : {
    future: "en %s",
    past: "hace %s",
    s: 'unos segundos',
    ss: '%d segundos',
    m: "un minuto",
    mm: "%d minutos",
    h: "una hora",
    hh: "%d horas",
    d: "un día",
    dd: "%d días",
    M: "un mes",
    MM: "%d meses",
    y: "un año",
    yy: "%d años"
  },
  weekdays : {
    standalone: [
      "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
    ],
    format: [
      "domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"
    ],
    isFormat: /\[ ?[¿¡]?(?:[Dd]o|[Ll]u|[Mm]a|[Mm]i|[Jj]u|[Vv]i|[Ss]á)(?:bado|b|c|rc|n|[ñn]o)?(?:\.?|[¿¡]?[^\]]? ?\]?)/
  },
})

// eslint-disable-next-line react/prop-types
const Tiempo = ( {ts} ) => {
  const [timeDiff, setTimeDiff] = useState('')

  
  useMemo(() => {
    const theDate = new Date(ts)
    const mom = moment(theDate)
    const interval = setInterval(() => {
      setTimeDiff(mom.fromNow())
    }, 60000)

    setTimeDiff(mom.fromNow())

    return () => {
      clearInterval(interval)
    }
  }, [ts])

  return (
    <span title={moment(new Date(ts)).calendar()}>
      {timeDiff}
    </span>
  )
}

export default Tiempo