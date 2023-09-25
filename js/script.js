//Declaro variables globales de productos
//PF PESOS
const mon_peso = 1;
const monto_pe_minimo = 1000;
const plazo_pe_minimo = 30;
const tasa_pe_30 = 180;
const tasa_pe_60 = 182;
const tasa_pe_90 = 184;

//PF DOLARES
const mon_dolar = 2;
const monto_do_minimo = 500;
const plazo_do_minimo = 30;
const tasa_do_30 = 2;
const tasa_do_60 = 2.1;
const tasa_do_90 = 2.2;

//Declaro variables globales varias
const salir = 0;
let saludo = ''
let moneda = -1;
let monto = 0;
let plazo = 0;
let tasa = 0;
let reinvertir = 0;
let continuar = true;
let monto_ok = false;
let plazo_ok = false;
let reinvertir_ok = false;
let resultado = '';
let int_a_cobrar = 0;
let saldo_a_cobrar = 0;
let txt_a_cobrar = '';

//Funcion para evaluar si el cliente
//ingreso un valor que supera el minimo
function supera_monto(monto_eval, moneda_eval) {
    switch (moneda_eval) {
        case 1:
            if (monto_pe_minimo <= monto_eval) {
                return true;
                break;
            } else {
                return false;
            }
        case 2:
            if (monto_do_minimo <= monto_eval) {
                return true;
                break;
            } else {
                return false;
            }
    }
}

//Función para obtener la tasa a aplicar
function obtengo_tasa() {
    if (moneda == mon_peso) {
        switch (true) {
            case plazo < 60:
                tasa = tasa_pe_30;
                break;
            case plazo < 90:
                tasa = tasa_pe_60;
                break;
            default:
                tasa = tasa_pe_90;
        }
    } else {
        switch (true) {
            case plazo < 60:
                tasa = tasa_do_30;
                break;
            case plazo < 90:
                tasa = tasa_do_60;
                break;
            default:
                tasa = tasa_do_90;
        }
    }
    console.log('Función obtengo_tasa');
    console.log('El PF tendra tasa = ' + tasa);
}

//Función que calcula los resultados
function calculo_pf() {
    let contador = 1;
    saldo_a_cobrar = monto;
    for (let i = reinvertir; i >= 0; i--) {
        txt_a_cobrar = txt_a_cobrar + 'El capital inicial al comenzar el Plazo Fijo ' + contador + ' es de ' + saldo_a_cobrar.toFixed(2) + ' \n';
        int_a_cobrar = ((saldo_a_cobrar * tasa / 100) / 365) * plazo;
        txt_a_cobrar = txt_a_cobrar + 'Los intereses al finalizar el Plazo Fijo ' + contador + ' seran de ' + int_a_cobrar.toFixed(2) + ' \n';
        saldo_a_cobrar = saldo_a_cobrar + int_a_cobrar;
        txt_a_cobrar = txt_a_cobrar + 'El saldo al finalizar el Plazo Fijo ' + contador + ' sera de ' + saldo_a_cobrar.toFixed(2) + ' \n\n';
        contador++;
    }
    alert(txt_a_cobrar);
}

//Saludo inicial
saludo = '¡Bienvenido al simulador de Plazos Fijos! \n';
saludo = saludo + 'Las condiciones son las siguientes: \n\n';
saludo = saludo + 'Plazo Fijo en Pesos: \n';
saludo = saludo + 'Monto mínimo: $ ' + monto_pe_minimo + ' \n';
saludo = saludo + 'Plazo: 30 días // TEA: ' + tasa_pe_30 + '% \n';
saludo = saludo + 'Plazo: 60 días // TEA: ' + tasa_pe_60 + '% \n';
saludo = saludo + 'Plazo: 90 días // TEA: ' + tasa_pe_90 + '% \n\n';
saludo = saludo + 'Plazo Fijo en Dólares: \n';
saludo = saludo + 'Monto mínimo: U$s ' + monto_do_minimo + ' \n';
saludo = saludo + 'Plazo: 30 días // TEA: ' + tasa_do_30 + '% \n';
saludo = saludo + 'Plazo: 60 días // TEA: ' + tasa_do_60 + '% \n';
saludo = saludo + 'Plazo: 90 días // TEA: ' + tasa_do_90 + '% \n\n';
saludo = saludo + 'En ambos productos puede reinvertir hasta 3 veces el capital y los intereses obtenidos.';
alert(saludo);

//Selección de moneda
while (moneda != mon_peso && moneda != mon_dolar && continuar == true) {
    resultado = prompt('Por favor, elegí con que moneda querés operar: \n1 - Pesos \n2 - Dólares \n0 - Salir');
    moneda = parseInt(resultado);
    if (resultado === null || moneda == salir) {
        //El usuario puso moneda 0 o presiono cancelar
        continuar = false;
    } else if (resultado == '') {
        //El usuario presiono aceptar sin ingresar un valor
        alert('¡Ingrese una opción!');
    } else if (moneda != mon_peso && moneda != mon_dolar && moneda != salir) {
        alert('¡Elegiste una opción inválida!');
    }
    console.log('Selección de moneda');
    console.log('El usuario ingresó resultado = ' + resultado);
    console.log('El usuario eligió moneda = ' + moneda);
}

//Ingreso de monto
while (monto_ok != true && continuar == true) {
    resultado = prompt('Por favor, ingresá el monto que deseas invertir o 0 para salir.');
    monto = parseFloat(resultado);
    if (resultado === null || monto == salir) {
        //El usuario puso monto 0 o presiono cancelar
        continuar = false;
    } else if (resultado == '') {
        //El usuario presiono aceptar sin ingresar un valor
        alert('¡Ingrese un monto!');
    } else if (Number.isNaN(monto)) {
        alert('¡El valor ingresado no es un monto!');
    } else if (monto < 0) {
        alert('¡El monto ingresado es negativo!');
    } else if (supera_monto(monto, moneda) == false) {
        alert('¡El monto ingresado no supera al mínimo!');
    } else {
        monto_ok = true;
    }
    console.log('Ingreso de monto');
    console.log('El usuario ingresó resultado = ' + resultado);
    console.log('El usuario ingresó monto = ' + monto);
}

//Ingreso de plazo
while (plazo_ok != true && continuar == true) {
    resultado = prompt('Por favor, ingresá el plazo de tu inversión o 0 para salir.');
    plazo = parseInt(resultado);
    if (resultado === null || plazo == salir) {
        //El usuario puso plazo 0 o presiono cancelar
        continuar = false;
    } else if (resultado == '') {
        //El usuario presiono aceptar sin ingresar un plazo
        alert('¡Ingrese un plazo!');
    } else if (Number.isNaN(plazo)) {
        alert('¡El valor ingresado no es un plazo!');
    } else if (plazo < 0) {
        alert('¡El plazo ingresado es negativo!');
    } else if (plazo < plazo_pe_minimo) {
        alert('¡El plazo ingresado no supera al mínimo de ' + plazo_pe_minimo + ' días!');
    } else {
        plazo_ok = true;
    }
    console.log('Ingreso de plazo');
    console.log('El usuario ingresó resultado = ' + resultado);
    console.log('El usuario ingresó plazo = ' + plazo);
}

//Ingreso de plazo de reinversión
while (reinvertir_ok != true && continuar == true) {
    resultado = prompt('Ingrese el número de veces que desea reinvertir su plazo fijo al vencimiento. \n Si no desea reinvertir ingrese 0.');
    reinvertir = parseInt(resultado);
    if (resultado === null) {
        //El usuario presiono cancelar
        continuar = false;
    } else if (resultado == '') {
        //El usuario presiono aceptar sin ingresar un plazo
        alert('¡Ingrese un número de reiversiones!');
    } else if (Number.isNaN(reinvertir)) {
        alert('¡El valor ingresado no es un plazo de reinversión!');
    } else if (reinvertir < 0) {
        alert('¡El valor ingresado es negativo!');
    } else if (reinvertir > 3) {
        alert('¡La cantidad de reinversiones supera el límite máximo de 3!');
    } else {
        reinvertir_ok = true;
    }
    console.log('Ingreso de plazo de reinversión');
    console.log('El usuario ingresó resultado = ' + resultado);
    console.log('El usuario ingresó reinvertir = ' + reinvertir);
}

if (continuar == true) {
    //Recupero tasa
    obtengo_tasa();
    //Inicio el cálculo final
    calculo_pf();
}

alert('Muchas gracias por su visita. Si desea volver a comenzar presione F5. ');
