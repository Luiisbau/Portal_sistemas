export const campoObligatorio = ( val ) => val && val.length > 0 || 'Este campo es obligatorio'

// :rules="[val => val && val.length > 0 || 'Debes ingresar un nombre de usuario']"

