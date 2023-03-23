import dayjs from 'dayjs'

export const formatearFecha = ( stringFecha ) =>  dayjs( stringFecha ).locale("es").format("DD/MMMM/YYYY")

export const formatDate = (stringFecha) => dayjs(stringFecha).locale('es').format('DD/MM/YYYY HH:mm:ss');

