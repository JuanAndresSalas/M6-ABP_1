let preguntas = ["Fecha Inicio (dd/mm/yyyy):\n","Fecha término (dd/mm/yyyy):\n"];
let fechas = [];
let dias = [];
let horasLuVi = 0;
let horasSab = 0;
let descHoraLuVi = 0;
const valorHoraLV = 7100;
const valorHoraSabado = 12300;
let fechaInicio;
let fechaTermino;
let formatoPeso= new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' })

function preguntar(index){
    process.stdout.write(preguntas[index]);
}

function calcular(fechaInicio,fechaTermino){
    if(fechaInicio > fechaTermino){
        console.log("ERROR\nFecha de inicio no puede ser mayor a la fecha actual")
        process.exit()
    }else{
        let fechaActual = fechaInicio;

        while(fechaActual <= fechaTermino){
            if(fechaActual.getDay() != 0){
                dias.push(fechaActual.getDay());
            }
            fechaActual.setDate(fechaActual.getDate() + 1);
        }

        dias.forEach(dia => {
            if(dia == 1 || dia == 3 ||dia == 5){
                horasLuVi += 8
                descHoraLuVi++
            }else if(dia == 2 || dia == 4 ){
                horasLuVi += 9
                descHoraLuVi++
            }else{
                horasSab+=5
            }
        });
        dias = [];
    }
    
    
}

function resultados(){
    let subTotalLV = (horasLuVi - descHoraLuVi) * valorHoraLV;
    let subTotalSabado = horasSab * valorHoraSabado;
    console.log(`CANTIDAD HORAS LU-VI: ${horasLuVi}`);
    console.log(`VALOR HORA: ${formatoPeso.format(valorHoraLV)}`);
    console.log(`SUBTOTAL LU-VI: ${formatoPeso.format(subTotalLV)}\n`);
    console.log(`CANTIDAD HORAS SA: ${horasSab}`);
    console.log(`VALOR HORA: ${formatoPeso.format(valorHoraSabado)}`);
    console.log(`SUBTOTAL SA: ${formatoPeso.format(subTotalSabado)}\n`);
    console.log(`TOTAL: ${formatoPeso.format(subTotalLV)} + ${formatoPeso.format(subTotalSabado)} = ${formatoPeso.format(subTotalLV + subTotalSabado)}`)
}


function main(){
    preguntar(0)
    process.stdin.on("data", (data) =>{
        fechas.push(data.toString().trim());
        if(fechas.length < preguntas.length){ 
            preguntar(fechas.length);
        }else{
            fechas[0] = fechas[0].split("/");
            fechas[1] = fechas[1].split("/");
            fechaInicio = new Date(fechas[0][2],parseInt(fechas[0][1]) - 1,fechas[0][0]);
            fechaTermino = new Date(fechas[1][2],parseInt(fechas[1][1]) - 1,fechas[1][0]);
            calcular(fechaInicio,fechaTermino);
            resultados();
            process.exit();            
        }   
    });
};

main()