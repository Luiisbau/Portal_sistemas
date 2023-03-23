
export const buscarRegistro = (val, update, state) => {
    let opciones = (state.value)
    //console.log('El state', state.value)
    if (val === '') {
        update(() => {
           return opciones = state.value

        })

        update(()=> {
            const needle = val.totoLowerCase()
            return opciones = state.value.filter( valor => //console.log(valor) )

            // options.value = empresas.value.filter(
            //     (v) => v.nombreEmpresa.toLowerCase().indexOf(needle) > -1
            //   );
        })
    }
    //console.log(val)

    //console.log(update)
}