export function checarValidadeData(dataString: string) {

    const dia = parseInt(dataString.substring(0, 2));
    const mes = parseInt(dataString.substring(2, 4)) - 1;
    const ano = parseInt(dataString.substring(4));

    const data = new Date(ano, mes, dia);

    if (
        isNaN(data.getTime()) || 
        data.getFullYear() !== ano ||
        data.getMonth() !== mes ||
        data.getDate() !== dia ||
        data > new Date()
    ) {
        return false;
    }

    return true;
}

