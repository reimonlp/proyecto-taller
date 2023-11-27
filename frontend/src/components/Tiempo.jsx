/* eslint-disable react/prop-types */
import { useMemo, useState } from 'react'
import moment from 'moment'

// Se configura moment para que muestre los tiempos en español
moment.locale('es')
moment.updateLocale('es', {
  calendar : {
      lastDay : '[ayer a las] LT', sameDay : '[hoy a las] LT', nextDay : '[mañana a las] LT', lastWeek : 'dddd [a las] LT', nextWeek : 'dddd [a las] LT', sameElse : 'L'
  },
  relativeTime : {
    future: "en %s", past: "hace %s", s: 'unos segundos', ss: '%d segundos', m: "un minuto", mm: "%d minutos", h: "una hora", hh: "%d horas", d: "un día", dd: "%d días", M: "un mes", MM: "%d meses", y: "un año", yy: "%d años"
  },
  weekdays : {
    standalone: [ "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado" ],
    format: [ "domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado" ],
    isFormat: /\[ ?[¿¡]?(?:[Dd]o|[Ll]u|[Mm]a|[Mm]i|[Jj]u|[Vv]i|[Ss]á)(?:bado|b|c|rc|n|[ñn]o)?(?:\.?|[¿¡]?[^\]]? ?\]?)/
  },
})

// Componente para mostrar el tiempo transcurrido
const Tiempo = ( {ts} ) => {
  const [timeDiff, setTimeDiff] = useState('')

  useMemo(() => {
    // Date y moment son librerías para trabajar con fechas
    // Date convierte el timestamp en una fecha
    // Moment permite mostrar el tiempo transcurrido de una fecha

    const theDate = new Date(ts)   // Obtiene la fecha del timestamp
    const mom = moment(theDate)    // Crea un objeto moment con la fecha

    // Actualiza el tiempo transcurrido cada minuto
    const interval = setInterval(() => {
      setTimeDiff(mom.fromNow())
    }, 60 * 1000)

    // Actualiza el tiempo transcurrido por primera vez
    setTimeDiff(mom.fromNow())

    // Elimina el intervalo cuando se desmonta el componente
    return () => clearInterval(interval)
  }, [ts])

  return (
    <span title={moment(new Date(ts)).calendar()}>{timeDiff}</span>
  )
}

export default Tiempo