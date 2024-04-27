export function formatarData(dataString: string): string {
    if (dataString.length < 8) return '';

    const dataStringNumerica = dataString.replace(/\D/g, '');

    const dia = dataStringNumerica.substring(0, 2);
    const mes = dataStringNumerica.substring(2, 4);
    const ano = dataStringNumerica.substring(4, 8);

    return `${dia}/${mes}/${ano}`;
}