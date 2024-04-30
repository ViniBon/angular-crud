export function checarValidadeData(dataString: string) {

    const parts = dataString.split('-');

    const dia = parseInt(parts[2], 10);
    const mes = parseInt(parts[1], 10) -1;
    const ano = parseInt(parts[0], 10);

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

